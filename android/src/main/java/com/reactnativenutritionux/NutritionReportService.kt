package com.reactnativenutritionux

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.passio.nutritionreportrenderer.PDFManager
import com.passio.nutritionreportrenderer.Utils.Companion.getJsonObjectToModel
import com.passio.nutritionreportrenderer.nutritionreportdata.DayLogs
import com.passio.nutritionreporttest.models.Profile
import java.lang.Exception
import java.util.ArrayList

class NutritionReportService(var reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "NutritionReportService"
  }


  @ReactMethod
  fun generateNutritionPDF(
    foodRecord: String,
    userDetails: String,
    duration: Int,
    promise: Promise
  ) {

    val profile: Profile = getJsonObjectToModel<Profile>(userDetails)
    val listOfDayLog: ArrayList<DayLogs> = Converter.convertFoodLogDayLog(foodRecord)
    try{
      val location = PDFManager(reactContext).exportPDF(daylogs = listOfDayLog,
        profile = profile,
        timeDuration = duration.toInt())
      promise.resolve(location)
    }catch (e:Exception){
      promise.reject(e)
    }
  }

}
