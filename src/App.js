import React from 'react';
import './css/app.css';
import Sidebar from './components/Sidebar';
import routes from './routes'
import {BrowserRouter as Router } from "react-router-dom";

function Name(props){
  return (
    <>
      <p className="text-red-500 p-10">
        Hey, {props.name}!
      </p>
    </>
  );
}

function App() {

  return (
    <Router>
      <div className="antialiased">
        <Sidebar routes={routes} />
      </div>
    </Router>
  );
}



export default App;
