import type { Services } from 'react-native-nutrition-ux';
import { analyticsService } from './AnalyticsService';
import dataService from './DataService';

const services: Services = {
  dataService,
  analyticsService,
};

export default services;
