// @ts-nocheck
import React from 'react';
import renderer from 'react-test-renderer';
import {
  BrandingProvider,
  ProgressLoadingView,
  ServicesProvider,
} from 'react-native-nutrition-ux';
import { mockBranding, mockServices } from '../../provider/MockProviders';
describe('PassioSDKLoadingView', () => {
  it('renders correctly', async () => {
    jest.fn();
    const tree = renderer.create(
      <ServicesProvider services={mockServices}>
        <BrandingProvider branding={mockBranding}>
          <ProgressLoadingView />
        </BrandingProvider>
      </ServicesProvider>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
