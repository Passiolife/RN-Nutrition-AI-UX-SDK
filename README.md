# React Native Nutrition UX


## Installation

Step 1: Create an .npmrc file in the root of your project with the following lines replacing GITHUB_ACCESS_TOKEN with the token you've created.
```sh
//npm.pkg.github.com/:_authToken=GITHUB_ACCESS_TOKEN
@passiolife:registry=https://npm.pkg.github.com
```

Step 2: Open terminal
```sh
yarn add @passiolife/nutrition-ai-ui-ux
```

Step 3: add react-native.config.js at root
```sh
module.exports = {
  dependencies: {
    'lottie-react-native': {},
    'lottie-ios': {},
    '@react-native-community/slider': {},
    '@passiolife/nutritionai-react-native-sdk-v3': {},
    '@react-native-community/datetimepicker': {},
    'react-native-reanimated': {},
    'react-native-gesture-handler': {},
    'luxon': {},
    'react-native-safe-area-context': {},
    'react-native-linear-gradient': {},
    'react-native-svg': {},
    'react-native-sqlite-storage': {},
    '@react-native-voice/voice': {},
    '@notifee/react-native': {},
    '@react-native-async-storage/async-storage': {},
  },
};
```

Step 4: require  @react-native-async-storage/async-storage
```sh
yarn add  @react-native-async-storage/async-storage
```


Step 5: require  add react-native-screens
```sh
yarn add react-native-screens
```

Step 6: For Android, add this implementation line to the dependencies section on app/build.gradle file.
```sh
dependencies {
    // Add this line below for Passio SDK library
    implementation files("$rootDir/../node_modules/@passiolife/nutritionai-react-native-sdk-v3/android/libs/passiolib-release.aar")
    ...
}
```



## Usage example


IOS Permission 

```
 Privacy - NSCameraUsageDescription
 Privacy - NSSpeechRecognitionUsageDescription
 Privacy - NSMicrophoneUsageDescription
```

Android Permission

```
<uses-permission android:name="android.permission.CAMERA" />
```

In Application

``` JS
import React from 'react';
import {
  AnalyticsService,
  Branding,
  BrandingProvider,
  FavoriteFoodItem,
  FoodLog,
  NutritionDataService,
  NutritionNavigator,
  NutritionProfile,
  Recipe,
  Services,
  ServicesProvider,
} from '@passiolife/nutrition-ai-ui-ux';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  const branding: Branding = {
    // you can change primary color form here
  primaryColor: 'rgba(79, 70, 229, 1)',
  backgroundColor: 'rgba(249, 250, 251, 1)',
  black: 'rgba(0, 0, 0, 1)',
  border: 'rgba(229, 231, 235, 1)',
  calories: 'rgba(245, 158, 11, 1)',
  carbs: 'rgba(14, 165, 233, 1)',
  error: 'rgba(239, 68, 68, 1)',
  fat: 'rgba(139, 92, 246, 1)',
  font: 'Passio-Regular',
  gray300: 'rgba(209, 213, 219, 1)',
  gray500: 'rgba(107, 114, 128, 1)',
  indigo50: 'rgba(238, 242, 255, 1)',
  proteins: 'rgba(16, 185, 129, 1)',
  purple: 'rgba(79, 70, 229, 1)',
  searchBody: 'rgba(242, 245, 251, 1)',
  secondaryText: 'rgba(107, 114, 128, 1)',
  text: 'rgba(17, 24, 39, 1)',
  white: 'white',
  };
  

  // Nutrition UX Callback functions.
  const dataService: NutritionDataService = {
    getPatientProfile: () => {
      return null;
    },
    // Getting save food log callback here so you can saved food log.
    async saveFoodLog(foodLog: FoodLog): Promise<void> {
    return null;
    },
    // Getting get foodlog's callback here so you can pass stored/saved food log's from here.
    getFoodLogs: function (): Promise<FoodLog[]> {
    return null;
    },
    // Getting delete foodlog's callback here so you can delete food log's from here.
    async deleteFoodLog(uuid: string): Promise<void> {
       return null;
    },
    // Getting delete recipe callback here so you can delete recipe and update  from here.
    async deleteRecipe(uuid: string): Promise<void> {
    return null;
    },
     // Getting delete favorite food item callBack here
     async deleteFavoriteFoodItem(uuid: string): Promise<void> {
       return null;
    },
     // Getting meal logs callBack here so you can pass your saved food log's from here.
     async getMealLogs(startDate: Date, endDate: Date): Promise<FoodLog[]> {
      return null;
    },
      // Getting save favorite food item callBack here
      async saveFavoriteFoodItem(
      favoriteFoodItem: FavoriteFoodItem
    ): Promise<void> {
      return null;
    },
      // Getting favorite food item callBack here so you can pass your saved favorite food log's from here.
      getFavoriteFoodItems: function (): Promise<FavoriteFoodItem[]> {
       return null;
    },
    // Getting save nutrition profile call back here so you can store saved nutrition profile form here.
    saveNutritionProfile: (nutritionProfile): Promise<void> => {
      return null
    },
    // Getting save recipe call back here so you can store your recipe from here.
    async saveRecipe(recipe: Recipe): Promise<void> {
      return null;
    },
    // Getting get recipes call back here so you can pass your saved recipe from here.
     getRecipes: function (): Promise<Recipe[]> {
      return null;
    },
    // Getting nutrition profile call back here so you can pass your saved nutrition profile here.
    getNutritionProfile: (): Promise<NutritionProfile | undefined> => {
      return null;
    },
  };

   const analyticsService: AnalyticsService = {
    logEvent(event: string) {
      console.log(`Analytics: ${event}`); // eslint-disable-line no-console
    },
  };
  
  const services: Services = {
    dataService,
    analyticsService,
  };

  // using our navigation container
  
  return (
    <ServicesProvider services={services}>
      <BrandingProvider branding={branding}>
        <NavigationContainer>
          <NutritionNavigator />
        </NavigationContainer>
      </BrandingProvider>
    </ServicesProvider>
  );
}

```



#### NutritionDataService callback functions: 

| Callback     |  Argument     | Return       | Description    |                                                                                                                           
| ------------------------ | ---------- | ------------------------------------------------------------------| -----------------------------------------------|
| saveNutritionProfile   | NutritionProfile | void |  This function provides you `NutritionProfile` object for save nutrition profile|
| saveFoodLog            | FoodLog | void |  This function provide you  `FoodLog` for save food log|
| saveFavoriteFoodItem   | FavoriteFoodItem | void |  This function provides you  `FavoriteFoodItem` object for save favortie food item|
| saveRecipe             | Recipe | void |  This function provides you `Recipe` object for save recipe |
| deleteRecipe           | uuID | void |  This function provide you delete recipe  `uuid` for delete recipe|
| deleteFoodLog          | uuID  | void |  This function provide you delete foodLog `uuid` for delete food log|
| getNutritionProfile    | - | NutritionProfile or undefined | You have to provide `NutritionProfile or undefined` to this funciton |
| getFoodLogs            | - | FoodLog |  You have to provide `FoodLog` to this funciton |
| getFavoriteFoodItems   | - | FavoriteFoodItem[]  | You have to provide `FavoriteFoodItem[]` to this funciton |
| getMealLogs            | startDate: Date, endDate: Date| FoodLog[]| You have to provide `FoodLog[]` between this start data and end date  to this funciton|
| getPatientProfile      | void | PatientProfile | You have to provide `PatientProfile` to this funciton|
| getRecipes             | void | Recipe[] | You have to provide `Recipe[]` to this funciton|

  #### AnalyticsService callback functions: 

| Callback     |  Argument     | Return       | Description    |                                                                                                                           
| ------------------------ | ---------- | ------------------------------------------------------------------| -----------------------------------------------|
| logEvent   | event | void |  This function provides you log Event's of nutrtion-sdk|


Nutrition-UX SDK also provide  Branding into BrandingProvider.

```
     const branding: Branding = {
        primaryColor: '#286CE2',
    };

    
```

```
 <BrandingProvider branding={branding}>
            ......
        </BrandingProvider>
```

 #### branding  functions: 

| function     |   Description    |                                                                                                                           
| ------------------------ |----- |
| primaryColor   | You have to provide primary color code here.|



## Contributing

To begin development, clone the project and check out the develop branch.

Create a new branch from develop for your assigned ticket with the format `feature/my-ticket-#5` where `my-ticket` is a few words describing the feature and `#5` is the Github issue number. Please make sure you have moved the ticket to the "In Progress" column in Github.

As you develop your feature, run the example app to test and debug your code.

Once your work is complete, verify that you have met all acceptance criteria on the ticket and have sufficient tests to cover the behavior. Then you may create a pull request back to the develop branch which will be reviewed and subsequently approved and merged.


### ⚠️ Issue

If your project not runnable in IOS then follow below steps

- removed podfile.lock
- remove pods
- remove node_modules in example
- remove node_modules in root 
- remove derived data
- remove library cache 
- restart system
- yarn at root
- open xcode