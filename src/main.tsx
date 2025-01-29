import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth--react'
import { App } from './App';

createRoot(document.getElementById('root'))
.render(
  <Auth0Provider
    domain="dev-vy3km5o5m55x4h6u.ca.auth0.com"
    clientId="ygKkocSObMZMAIyoBsorMRx8CVHptNae"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);
