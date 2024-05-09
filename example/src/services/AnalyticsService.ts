import type { AnalyticsService } from 'react-native-nutrition-ux';

export const analyticsService: AnalyticsService = {
  logEvent(event: string) {
    console.log(`Analytics: ${event}`); // eslint-disable-line no-console
  },
};
