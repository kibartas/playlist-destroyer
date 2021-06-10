import { RouteComponentProps } from "@reach/router";
import { FC } from 'react';

const NotFound: FC<RouteComponentProps> = () => (
  <h1 data-testid="notFoundMessage">Page not found </h1>
);

export default NotFound;
