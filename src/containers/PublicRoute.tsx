import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type Props = {
  component: any;
  authenticated: boolean;
} & RouteProps;

export const PublicRoute: React.FC<Props> = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Component {...props} /> : <Redirect to='/home' />
      }
    />
  );
};
