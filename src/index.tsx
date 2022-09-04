import { StrictMode } from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './App';
import { AuthProvider } from './common/context/AuthProvider';
import { SafeRequestProvider } from './common/context/SafeRequestProvider';
import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <AuthProvider>
      <SafeRequestProvider>
        <App />
      </SafeRequestProvider>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
