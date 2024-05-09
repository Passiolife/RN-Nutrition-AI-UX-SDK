package com.reactnativenutritionux

import com.passio.nutritionreportrenderer.Utils.Companion.getDateFormateGMTToLocal
import com.passio.nutritionreportrenderer.Utils.Companion.getJsonArrayToModel
import com.passio.nutritionreportrenderer.nutritionreportdata.DayLogs
import com.passio.nutritionreportrenderer.nutritionreportdata.FoodItem
import com.passio.nutritionreportrenderer.nutritionreportdata.FoodRecords

object Converter {

    fun convertFoodLogDayLog(foodRecord: String): ArrayList<DayLogs> {
        val list = getJsonArrayToModel<ArrayList<FoodLog>>(foodRecord)
        val foodRecordList = ArrayList<FoodRecords>();
        list.forEach { nutritionReportDataItem ->
            foodRecordList.add(FoodRecords(createdAt = nutritionReportDataItem.eventTimestamp,
                selectedUnit = nutritionReportDataItem.selectedUnit,
                selectedQuantity = nutritionReportDataItem.selectedQuantity,
                name = nutritionReportDataItem.name,
                ingredients = convertFoodItems(nutritionReportDataItem),
                uuid = nutritionReportDataItem.uuid,
                mealLabel = nutritionReportDataItem.meal))
        }

        return convertFoodDayLogs(foodRecordList);
    }

    private fun convertFoodDayLogs(foodRecords: ArrayList<FoodRecords>): ArrayList<DayLogs> {
        val list = ArrayList<DayLogs>()
        val filterlist = foodRecords.distinctBy {
            getDateFormateGMTToLocal(it.createdAt,
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                "dd-MM")
        }
        filterlist.forEach { data ->
            val filterlist = foodRecords.filter { foodRecord ->
                getDateFormateGMTToLocal(foodRecord.createdAt,
                    "yyyy-MM-dd'T'HH:mm:ss'Z'",
                    "dd-MM") == getDateFormateGMTToLocal(data.createdAt,
                    "yyyy-MM-dd'T'HH:mm:ss'Z'",
                    "dd-MM")
            }
            list.add(DayLogs(data.createdAt, filterlist))
        }
        return list
    }

    private fun convertFoodItems(foodLog: FoodLog): ArrayList<FoodItem> {
        val foodItems = ArrayList<FoodItem>();
        foodLog.foodItems?.forEach {

            var totalCarbs: Double = 0.0;
            var totalFat: Double = 0.0;
            var totalCalories: Double = 0.0;
            var totalProteins: Double = 0.0;

            it?.nutrients?.forEach { nutrientsItem ->
                val amount = nutrientsItem?.amount ?: 0.0
                if (nutrientsItem != null) {
                    when (nutrientsItem.id) {
                        "carbs" -> {
                            totalCarbs += amount;
                        }
                        "fat" -> {
                            totalFat += amount;
                        }
                        "calories" -> {
                            totalCalories += amount;
                        }
                        "protein" -> {
                            totalProteins += amount;
                        }
                    }
                }
            }
            foodItems.add(FoodItem(totalCarbs = totalCarbs,
                totalFat = totalFat,
                totalCalories = totalCalories,
                totalProteins = totalProteins))
        }
        return foodItems;
    }
}



