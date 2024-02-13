import {NavigationContainerRef} from '@react-navigation/native';
import React, {createRef} from 'react';

import {ParamList} from '@utils/routes';
import {PublicRoutes} from './public.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}

export const navigationRef = createRef<NavigationContainerRef<ParamList>>();

const Routes = () => {
  return <PublicRoutes />;
};

export default Routes;
