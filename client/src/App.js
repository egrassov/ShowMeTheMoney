import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ThreeScene from './components/ThreeScene';
import SideBar from './components/SideBar';
import CitybyHours from './components/Citybyhours';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar />
        <Switch>
          <Route exact path='/' component={ThreeScene}/>
          <Route exact path='/byhours' component={CitybyHours}/>
        </Switch>
      </div>
    );
  }
}

export default App;

