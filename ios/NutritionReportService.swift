//
//  NutritionReportService.swift
//  react-native-nutrition-ux
//
//  Created by Parth Gohel on 30/09/21.
//

import NutritionReport

@objc(NutritionReportService)
class NutritionReportService: NSObject {

    @objc(generateNutritionPDF:withUserDetails:withDuration:withResolver:withRejecter:)
    func generateNutritionPDF(
        foodRecord: String,
        userDetails: String,
        duration: Float,
        resolve:@escaping RCTPromiseResolveBlock,
        reject:@escaping RCTPromiseRejectBlock
    ) -> Void {

        do {
            guard let reportDuration = ReportTimeDuration(rawValue: Int(duration)) else {
                throw CustomeError.unknownError("Error:duration not available")
            }

            let dayLogs = try retriveNutritionDayLogs(with: foodRecord,for: reportDuration)
            let patient = try retriveUserDetails(with: userDetails)
        
            DispatchQueue.main.async {
                let nutrition = NutritionReportData(
                    timeDuration: reportDuration,
                    userDetails: patient,
                    daylogs: dayLogs
                )
                let filePath = PDFManager.shared.generateNutritionReport(with: nutrition)
                resolve(filePath)
            }

        } catch let error1 as NSError {
            reject(error1.localizedDescription, error1.localizedDescription, Error.self as? Error)
        } catch {
            reject("", "error1.localizedDescription", Error.self as? Error)
            // Catch any other errors
        }
    }

    private func retriveNutritionDayLogs(
        with data: String,
        for duration: ReportTimeDuration
    ) throws -> [NutritionReport.DayLog] {

        do {

            let decoder = JSONDecoder()
            guard let jsonData = data.data(using: .utf8),
                  let foodRecords = try decoder.decode([FoodRecord]?.self, from: jsonData) else {
                throw CustomeError.unknownError("Can't convert json to model type")
            }

            let dayLogs = self.filterByDate(foodRecords: foodRecords)

            var nutritionDayLogs = dayLogs.map { (daylog) -> NutritionReport.DayLog in
                return daylog.convertToNutritionFoodRecordSDKModel()
            }

            let reportDates =  Date.dates(for: duration)


            _ = reportDates.map { (date)  in
                guard nutritionDayLogs.contains(where: {$0.date.dateFormatWithSuffix() == date.dateFormatWithSuffix()}) else {
                    nutritionDayLogs.append(DayLog(date: date, records: []))
                    return
                }
            }

            nutritionDayLogs = nutritionDayLogs.compactMap { (daylog) -> NutritionReport.DayLog? in
                guard reportDates.contains(where: {$0.dateFormatWithSuffix() == daylog.date.dateFormatWithSuffix()}) else {
                    return nil
                }
                return daylog
            }.sorted(by: {$0.date < $1.date})
            return nutritionDayLogs
        } catch let error {
            throw CustomeError.unknownError(error.localizedDescription)
        }
    }

    private func retriveUserDetails(with data: String) throws -> NutritionReport.UserProfile {

        do {
            let decoder = JSONDecoder()
            guard let jsonData = data.data(using: .utf8),
                  let userDetails = try decoder.decode(UserProfile?.self, from: jsonData) else {
                throw CustomeError.unknownError("Can't convert json to model type")
            }
            
            let userModel = NutritionReport.UserProfile(
                firstName: userDetails.firstName ?? "Unknown",
                lastName: userDetails.lastName ?? "Unknown",
                age: Int(userDetails.age ?? 0) ,
                weight: userDetails.weight,
                height: userDetails.height,
                units: UnitSelection.init(rawValue: userDetails.units)!,
                caloriesTarget: userDetails.caloriesTarget ?? 0,
                carbsPercent: userDetails.carbsPercentage ?? 0,
                proteinPercent: userDetails.proteinPercentage ?? 0,
                fatPercent: userDetails.fatPercentage ?? 0,
                gender: GenderSelection(rawValue: userDetails.gender) ?? .other
            )
            return userModel
        } catch let error {
            throw CustomeError.unknownError(error.localizedDescription)
        }
    }

    private func filterByDate(foodRecords: [FoodRecord]) -> [DayLogs] {

        var dayLogs: [DayLogs] = []
        let dateFormate = DateFormatter()
        dateFormate.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"

        _ = foodRecords.map { (record)  in

            let date = dateFormate.date(from: record.eventTimestamp)?.dateFormatWithSuffix()
            //check contain date other wise insert new entry
            guard dayLogs.contains(where: {$0.date.dateFormatWithSuffix() == date}) else {
                dayLogs.append(DayLogs(date: dateFormate.date(from:(record.eventTimestamp)) ?? Date(), records: [record]))
                return
            }
            guard let index = dayLogs.firstIndex(where: {$0.date.dateFormatWithSuffix() == date}) else {
                return
            }
            dayLogs[index].records.append(record)
        }
        return dayLogs
    }
}
