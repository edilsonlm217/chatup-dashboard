import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';

export default function Route({
  noStyle = false,
  isPrivate = false,
  isFullPageLayout = false,
  component: Component, ...rest
}) {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        if (noStyle) {
          return <Component />
        }

        if (isPrivate === !!user) {
          return (
            <div className="container-scroller">
              {isFullPageLayout === true && <Sidebar />}

              <div className="container-fluid page-body-wrapper">
                {isFullPageLayout === true && <Navbar />}

                <div className="main-panel">
                  <div className="content-wrapper">
                    <Component />
                  </div>

                  {isFullPageLayout === true && <Footer />}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="container-scroller">
            {isFullPageLayout === true && <Sidebar />}

            <div className="container-fluid page-body-wrapper">
              {isFullPageLayout === true && <Navbar />}

              <div className="main-panel">
                <div className="content-wrapper">
                  <Redirect to={isPrivate ? '/login' : '/session'} />
                </div>

                {isFullPageLayout === true && <Footer />}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
