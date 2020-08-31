import React, { useState } from 'react';
import './css/app.css';
import Sidebar from './components/Sidebar';

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
    <div className="antialiased">
      <Sidebar content={<Name name="Paul"/>} />
    </div>
  );
}


export default App;
