package com.reactnativenutritionux

import FoodItem
import com.passio.nutritionreportrenderer.nutritionreportdata.MealLabel

data class FoodLog(
  val eventTimestamp: String,
  val selectedQuantity: Float,
  val selectedUnit: String,
  val name: String,
  val uuid: String,
  val meal: MealLabel,
  val foodItems: List<FoodItem>
)
