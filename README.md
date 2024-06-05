# React Native Nutrition UX

A white-labeled nutrition tracking module implemented in React Native.
This module is using Passio's Nutrition-AI SDK and enables full process of food tracking for users. 



## Installation

Step 1: Open terminal
```sh
git clone https://github.com/Passiolife/RN-Nutrition-AI-UX-SDK.git
```
Step 2: Change directory into terminal
```sh
cd RN-Nutrition-AI-UX-SDK
```
Step 3: Install node_modules
```sh
yarn
```
Now node modules downloaded. 

## Run Project in IOS

Step 1: Change directory to example 
```sh
cd example
```

Step 2: Add .env file at example directory (refer example.env)
```sh
ENV_PASSIO_KEY = "Put your passio license key here"
```

Step 3:
```sh
yarn ios
```
Now project run in IOS

NOTE: PLEASE RUN IOS PROJECT IN REAL DEVICE BECAUSE PASSIOSDK NOT SUPPORTED IN SIMULATOR


## Run Project in Android

Step 1: Change directory to example 
```sh
cd example
```

Step 2: Add .env file at example directory (refer example.env)
```sh
ENV_PASSIO_KEY = "Put your passio license key here"
```

Step 3:
```sh
yarn android  
```


### Documentation

Nutrition-UX SDK provides `NutritionDataService` and `AnalyticsService` into  ServicesProvider.

```
    const services: Services = {
        nutritionDataService,
        analyticsService,
    };
    
```

```
 <ServicesProvider services={services}>
            ......
        </ServicesProvider>
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



Now project run in Android


### A top-level directory layout

    .
    ├── example                 # Example application for the nutrition-ux lib                  
    ├── src                     # Source files (`lib` or `app`)
    ├── __test__                # Unit tests (alternatively `spec` or `tests`)
    ├── __mock__ 
    ├── yarn.lock               # main source of information about the current versions of dependencies in a project
    └── README.md
    
### Unit tests

Unit tests are usually placed into the `__test__ ` or, less commonly, into the `spec` or `tests` folder.
    
## Library structure
    
    .
    ├── ...
    ├── src                    
    │   ├── components           # Common components 
    │   ├── contexts             # All Context api's
    │   ├── screens              # All Screens
          ├── A
            ├── views            # Screen views added into here
            ├── A.Style.ts.      # Screen style mention here
            ├── AScreen.tsx.     # Screen
           
    │   ├── navigations          # All navigation and it's props
    │   ├── passio_sdk           # Configuration passio_sdk methods
    │   ├── utils                # All utility function and classes
    │   └── ...                  # etc.
    └── ...

## Our Recommended Environments

- Xcode - 12.5
- Android Studio - Bumblebee 2021.1.1


## Development

This module is designed as a library which can be integrated into a host application. The library source code is under the `/src` directory and there is an example application under the `/example` directory that can be used for running and testing the module.

The host application will inject various dependencies and configuration into the library through context providers. For example, branding choices like color palletes and dependencies like API clients should be injected by the host application.

## Testing

Creation of automated tests is required for all new features. This includes both functional tests such as those covering state management / reducers as well as snapshot tests for verifying that components render correctly.

We will configure Github actions to run these tests automatically prior to merging pull requests.

## Adding the library to your app

Step 1: Add `.npmrc` file at root level and paste below lines
```
//npm.pkg.github.com/:_authToken= "YOUR_GITHUB_ACCESS_TOKEN_HERE"
@passiolife:registry=https://npm.pkg.github.com
```

Step 2: 
```
yarn add @passiolife/nutrition-ai-ui-ux
or
yarn add @passiolife/nutrition-ai-ui-ux-0.1.0.tgz
```

Step 3: Add into ios `Podfile`
```
pod 'NutritionReport', git: 'https://github.com/Passiolife/Nutrition-Report-iOS.git', :tag => '1.0.2'
```

Step 4: Add below library 
```
yarn add @passiolife/react-native-passio-sdk @gregfrench/react-native-wheel-picker @react-native-community/datetimepicker @react-native-community/progress-bar-android @react-native-community/progress-view @react-native-community/slider @react-native-picker/picker @react-navigation/native lottie-ios lottie-react-native react-native-gesture-handler react-native-modal-datetime-picker react-native-pdf react-native-safe-area-context react-native-screens react-native-video react-navigation-stack rn-fetch-blob @react-native-async-storage/async-storage
```

IOS Permission 

```
 Privacy - Camera Usage Description
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
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const branding: Branding = {
    // you can change primary color form here
    primaryColor: '#286CE2',
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

If you're having trouble with a chart pod on iOS, update the specified section in the podfile.lock.

- Charts (3.6.0):
    - Charts/Core (= 3.6.0)
  - Charts/Core (3.6.0):

  