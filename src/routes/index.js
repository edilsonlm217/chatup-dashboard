import React, { Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Router from './Router';

import Spinner from '../shared/Spinner';

// const Error404 = lazy(() => import('../error-pages/Error404'));
// const Error500 = lazy(() => import('../error-pages/Error500'));

const RegisterScreen = lazy(() => import('../app/pages/RegisterScreen'));
const HomeScreen = lazy(() => import('../app/pages/HomeScreen'));
const AuthScreen = lazy(() => import('../app/pages/AuthScreen'));

export default function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Router
          exact
          isPrivate
          isFullPageLayout
          path="/home"
          component={HomeScreen}
        />

        <Router path="/login" component={AuthScreen} />
        <Router path="/register" component={RegisterScreen} />

        {/* <Router path="/404" component={Error404} />
        <Router path="/500" component={Error500} /> */}

        <Redirect to="/login" />
      </Switch>
    </Suspense>
  );
}