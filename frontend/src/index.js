import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import { store } from './redux/store';  // Import your Redux store
import { BrowserRouter } from 'react-router-dom';

// Create a root and use the Provider to pass the store to your components
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
