import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './App.css';
import HomeScene from './components/HomeScene';
import SideBar from './components/SideBar';
import CitybyHours from './components/Citybyhours';
import GraphRelations from './components/GraphRelations';

function App({location}) {

    return (
      <div className="App">
        <SideBar/>
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={{ enter: 3000, exit: 3000 }} classNames={'fade'}>
            <Switch location={location}>
              <Route exact path='/' render={() => <div><HomeScene/></div>} />
              <Route exact path='/byhours' render={() => <div><CitybyHours/></div>} />
              <Route exact path='/relations' render={() => <div><GraphRelations/></div>}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }


export default withRouter(App);






