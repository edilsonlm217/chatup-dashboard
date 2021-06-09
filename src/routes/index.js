import React, { Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Router from './Router';

import Spinner from '../shared/Spinner';

const RegisterScreen = lazy(() => import('../app/pages/RegisterScreen'));
const HomeScreen = lazy(() => import('../app/pages/HomeScreen'));
const AuthScreen = lazy(() => import('../app/pages/AuthScreen'));
const SessionScreen = lazy(() => import('../app/pages/SessionScreen'));
const MessageCustomizationScreen = lazy(() => import('../app/pages/MessageCustomizationScreen'));
const AttendantScreen = lazy(() => import('../app/pages/AttendantScreen'));
const InvoicesScreen = lazy(() => import('../app/pages/InvoicesScreen'));
const QrCodeScreen = lazy(() => import('../app/pages/QrCodeScreen'));
const ErrorScreen = lazy(() => import('../app/pages/QrCodeScreen/ErrorScreen'));

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

        <Router
          exact
          isPrivate
          isFullPageLayout
          path="/session"
          component={SessionScreen}
        />

        <Router
          exact
          isPrivate
          isFullPageLayout
          path="/attendants"
          component={AttendantScreen}
        />

        <Router
          exact
          isPrivate
          isFullPageLayout
          path="/invoices"
          component={InvoicesScreen}
        />

        <Router
          exact
          isPrivate
          isFullPageLayout
          path="/messages"
          component={MessageCustomizationScreen}
        />

        <Router path="/login" component={AuthScreen} />
        <Router path="/register" component={RegisterScreen} />

        {/* Rotas do contexto de QR Code */}
        <Router path="/scan" component={QrCodeScreen} isPrivate noStyle />
        <Router path="/error" component={ErrorScreen} isPrivate noStyle />

        <Redirect to="/login" />
      </Switch>
    </Suspense>
  );
}