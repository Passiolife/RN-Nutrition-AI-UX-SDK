//
//  NutritionReportModel.swift
//  react-native-nutrition-ux
//
//  Created by Parth Gohel on 01/10/21.
//

import Foundation
import NutritionReport

class DayLogs: Decodable {

    var date: Date
    var records: [FoodRecord]

    init(
        date: Date,
        records:[FoodRecord]
    ) {
        self.date = date
        self.records = records
    }

    func convertToNutritionFoodRecordSDKModel() -> NutritionReport.DayLog {
        let foodRecord = self.records.map { (foodRecord) -> NutritionReport.FoodRecord in
            foodRecord.convertToNutritionSDKModel()
        }
        return NutritionReport.DayLog(date: self.date, records: foodRecord)
    }
}

struct FoodRecord: Decodable {

    let eventTimestamp: String
    let servingUnits: [ServingUnit]?
    let entityType: String?
    let selectedQuantity: Double?
    let meal: String
    let passioID: String
    let foodItems: [FoodItem]
    let uuid, name, selectedUnit: String

    func convertToNutritionSDKModel() -> NutritionReport.FoodRecord {
        let ingredient = self.convertToIngredientSDKModel()
        return NutritionReport.FoodRecord.init(
            name: self.name,
            uuid: self.uuid,
            createdAt: Date(),
            selectedUnit: self.selectedUnit,
			selectedQuantity: self.selectedQuantity ?? 0.0,
            ingredients: ingredient,
            mealLabel: MealLabel(rawValue: meal.capitalized)
        )
    }

    func convertToIngredientSDKModel() -> [NutritionReport.FoodItem] {
        return self.foodItems.map { (foodItem)  in
            foodItem.convertToIngredientSDKModel()
        }
    }
}

// MARK: - FoodItem
struct FoodItem: Decodable {

    let name: String?
    let parents: [Parent]?
    let entityType: String?
    let servingUnits: [ServingUnit]?
    let selectedUnit: String?
    let passioID: String?
    let selectedQuantity: Double?
    let computedWeight: ComputedWeight?
    let nutrients: [Nutrient]
    let barcode: String?
  
    func convertToIngredientSDKModel() -> NutritionReport.FoodItem {

        var caloies: Double = 0.0
        var carbs: Double = 0.0
        var fat: Double = 0.0
        var protein: Double = 0.0

        _ = self.nutrients.map { (nutrient)  in
            switch nutrient.id {
            case "calories" :
                caloies = nutrient.amount
            case "carbs" :
                carbs = nutrient.amount
            case "protein" :
                protein = nutrient.amount
            case "fat" :
                fat = nutrient.amount
            default : break
            }
        }

        return NutritionReport.FoodItem(
            totalCalories: caloies,
            totalCarbs: carbs,
            totalFat: fat,
            totalProteins: protein
        )
    }

}

// MARK: - Parent
struct Parent: Decodable {
    let name, passioID: String
}

// MARK: - ComputedWeight
struct ComputedWeight: Decodable {
    let unit: String
    let value: Double
}

// MARK: - Nutrient
struct Nutrient: Decodable {
    let id: String
    let amount: Double
    let unit: String
}

// MARK: - ServingUnit
struct ServingUnit: Decodable {
    let mass: Double
    let unit: String
}

// MARK: - Sibling
struct Sibling: Decodable {
    let passioID, name: String
    let quantity: Int?
    let unitName: String?
}


enum CustomeError: Error {
    case unknownError(String)
}

extension Date {

    func dateFormatWithSuffix() -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "EEEE, MMMM d'\(self.daySuffix())'"
        return dateFormatter.string(from: self)
    }

    func daySuffix() -> String {
        let calendar = Calendar.current
        let components = calendar.dateComponents([.day], from: self)
        let dayOfMonth = components.day
        switch dayOfMonth {
        case 1, 21, 31:
            return "st"
        case 2, 22:
            return "nd"
        case 3, 23:
            return "rd"
        default:
            return "th"
        }
    }

    static func dates(from fromDate: Date, to toDate: Date) -> [Date] {
        var dates: [Date] = []
        var date = fromDate

        while date <= toDate {
            dates.append(date)
            guard let newDate = Calendar.current.date(byAdding: .day, value: 1, to: date) else { break }
            date = newDate
        }
        return dates
    }

    static func dates(for report: NutritionReport.ReportTimeDuration) -> [Date] {
        Date.dates(from: report.duration.endDate, to: report.duration.startDate)
    }
}

struct UserProfile: Decodable {
    var firstName: String?
    var lastName: String?
    var age: Int?
    let caloriesTarget, carbsPercentage, proteinPercentage, fatPercentage: Int?
    let units, gender: String
    let height: Double
    let weight: Double
}
