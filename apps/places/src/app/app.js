// import NxWelcome from './nx-welcome';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from '../app/layout';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import Header from '../app/layout/Header'
import { PersistGate } from 'redux-persist/integration/react';

import { Route, Routes, Link } from 'react-router-dom';

const RootNavigation = () => {
  return (
    <Layout />
  );
}

export function App() {
 
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RootNavigation />
      </PersistGate>
    </Provider>
  )

};


export default App;
