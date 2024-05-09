import React, { useContext } from 'react';
import type { AnalyticsService } from './AnalyticsService';
import type { NutritionDataService } from './NutritionDataService';

export interface Services {
  dataService: NutritionDataService;
  analyticsService: AnalyticsService;
}

const ServicesContext = React.createContext({} as Services);

export const useServices = () => useContext(ServicesContext);

interface ServicesProviderProps extends React.PropsWithChildren {
  services: Services;
}

export const ServicesProvider = ({
  services,
  children,
}: ServicesProviderProps) => (
  <ServicesContext.Provider value={services}>
    {children}
  </ServicesContext.Provider>
);

//https://blog.testdouble.com/posts/2021-03-19-react-context-for-dependency-injection-not-state/
