import React, { Component } from 'react';

import './App.css';
import ThreeScene from './components/ThreeScene';
import SideBar from './components/SideBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar />
        <ThreeScene/>
      </div>
    );
  }
}

export default App;
