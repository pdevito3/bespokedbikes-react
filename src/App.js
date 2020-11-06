import React from 'react';
import './css/app.css';
import Sidebar from './components/Sidebar';
import routes from './routes'
import {BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query-devtools'

function App() {

  return (
    <>
      <Router>
        <div className="font-sans antialiased">
          <Sidebar routes={routes} />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
