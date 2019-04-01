import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './App.css';
import HomeScene from './components/HomeScene';
import SideBar from './components/SideBar';
import CitybyHours from './components/Citybyhours';
import About from './components/About';
import GraphRelations from './components/GraphRelations';

function App({location}) {

    return (
      <div className="App">
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={{ enter: 3000, exit: 3000 }} classNames={'fade'}>
            <Switch location={location}>
              <Route exact path='/' render={() => <div><HomeScene/><SideBar/></div>} />
              <Route exact path='/byhours' render={() => <div><SideBar/><CitybyHours/></div>} />
              <Route exact path='/about' component={About}/>
              <Route exact path='/graph' component={GraphRelations}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }


export default withRouter(App);






