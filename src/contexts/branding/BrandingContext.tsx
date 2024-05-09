import React, { useContext } from 'react';
import type { Branding } from './Branding';

const BrandingContext = React.createContext({} as Branding);

export const useBranding = () => useContext(BrandingContext);

interface BrandingProviderProps extends React.PropsWithChildren {
  branding: Branding;
}

export const BrandingProvider = ({
  branding,
  children,
}: BrandingProviderProps) => (
  <BrandingContext.Provider value={branding}>
    {children}
  </BrandingContext.Provider>
);
