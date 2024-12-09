import { NotificationContainer } from 'react-notifications';
import React from 'react';

import 'react-notifications/lib/notifications.css';

import './App.scss';

import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Home />
      <NotificationContainer />
    </div>
  );
}

export default App;
