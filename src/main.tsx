import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
      domain="dev-tolinfz7mhsgrar6.ca.auth0.com"
      clientId="OSNyftVG9CKEig4krBBdgx23HfTknQdj"
      authorizationParams={{redirect_uri: window.location.origin}}
    >
    <App />
  </Auth0Provider>
);
