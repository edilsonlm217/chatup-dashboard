import React, { Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Router from './Router';

import Spinner from '../shared/Spinner';

const RegisterScreen = lazy(() => import('../app/pages/RegisterScreen'));
const PlansScreen = lazy(() => import('../app/pages/PlansScreen'));
const AuthScreen = lazy(() => import('../app/pages/AuthScreen'));
const SessionScreen = lazy(() => import('../app/pages/SessionScreen'));
const MessageCustomizationScreen = lazy(() => import('../app/pages/MessageCustomizationScreen'));
const AttendantScreen = lazy(() => import('../app/pages/AttendantScreen'));
const InvoicesScreen = lazy(() => import('../app/pages/InvoicesScreen'));
const QrCodeScreen = lazy(() => import('../app/pages/QrCodeScreen'));
const ErrorScreen = lazy(() => import('../app/pages/QrCodeScreen/ErrorScreen'));

const AddressScreen = lazy(() => import('../app/pages/PaymentFlow/AddressScreen'));
const PaymentScreen = lazy(() => import('../app/pages/PaymentFlow/PaymentScreen'));

export default function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
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
        <Router path="/register" component={RegisterScreen} noStyle />

        <Router path="/plans" component={PlansScreen} isPrivate isFullPageLayout />
        <Router path="/payment/2" component={AddressScreen} noStyle />
        <Router path="/payment/3" component={PaymentScreen} noStyle />

        {/* Rotas do contexto de QR Code */}
        <Router path="/scan/:qrCode" component={QrCodeScreen} isPrivate noStyle />
        <Router path="/error" component={ErrorScreen} isPrivate noStyle />

        <Redirect to="/login" />
      </Switch>
    </Suspense>
  );
}