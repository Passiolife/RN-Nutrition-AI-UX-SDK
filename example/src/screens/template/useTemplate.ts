import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface feature {
  id: string;
  title: string;
}
[];

export interface Templates {
  sdk_name: string;
  description: string;
  id: string;
  image: ImageSourcePropType | undefined;
  feature?: feature[];
}

const nutrition_ai = require('../../../assets/image/nutrition-ai-cover.png');
const food_advisory = require('../../../assets/image/food-advisor-cover.png');
const gorocery = require('../../../assets/image/grocery-cover.png');
const engineering = require('../../../assets/image/engineering-cover.png');

const temp_data: Templates[] = [
  {
    sdk_name: 'NUTRITION AI SDK',
    description:
      'Ready-to-use, customizable UX\nmodules available with the SDK',
    id: '0',
    image: nutrition_ai,
    feature: [
      { id: '1', title: 'Real-Time Food Recognition' },
      { id: '2', title: 'Nutrition Facts Scanning' },
      { id: '3', title: 'Detection of Food Packaging' },
      { id: '4', title: 'Diet Specific Meal Plans' },
      { id: '5', title: 'Barcode Scanning' },
      { id: '6', title: 'Recipe Creation' },
    ],
  },
  {
    sdk_name: 'AI NUTRITION COACH',
    description:
      'Optimize health & wellness goals\nand provide personalized nutrition\nand fitness plans.',
    id: '1',
    image: food_advisory,
    feature: [
      { id: '1', title: 'Real-Time Food Recognition' },
      { id: '2', title: 'Nutrition Facts Scanning' },
      { id: '3', title: 'Detection of Food Packaging' },
      { id: '4', title: 'Diet Specific Meal Plans' },
      { id: '5', title: 'Barcode Scanning' },
      { id: '6', title: 'Recipe Creation' },
    ],
  },
  {
    sdk_name: 'AI GROCERY ADVISOR',
    description:
      'Promote healty foods and give\npersonalized shopping recommendations.',
    id: '2',
    image: gorocery,
    feature: [
      { id: '1', title: 'Real-Time Food Recognition' },
      { id: '2', title: 'Nutrition Facts Scanning' },
      { id: '3', title: 'Detection of Food Packaging' },
      { id: '4', title: 'Diet Specific Meal Plans' },
      { id: '5', title: 'Barcode Scanning' },
      { id: '6', title: 'Recipe Creation' },
    ],
  },
  {
    sdk_name: 'ENGINEERING AND UX',
    description: 'SDK engineering views and\nvarious UX examples.',
    id: '3',
    image: engineering,
    feature: [
      { id: '1', title: 'Real-Time Food Recognition' },
      { id: '2', title: 'Nutrition Facts Scanning' },
      { id: '3', title: 'Detection of Food Packaging' },
      { id: '4', title: 'Diet Specific Meal Plans' },
      { id: '5', title: 'Barcode Scanning' },
      { id: '6', title: 'Recipe Creation' },
    ],
  },
];

export const useTemplate = () => {
  const [data] = useState(temp_data);

  const onPressTemplate = (_item: Templates) => {};

  return {
    data,
    onPressTemplate,
  };
};
