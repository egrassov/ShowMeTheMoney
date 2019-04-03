import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './App.css';
import HomeScene from './components/HomeScene';
import SideBar from './components/SideBar';
import CitybyHours from './components/Citybyhours';
import GraphRelations from './components/GraphRelations';
import MultiSeriesAreaChart from './components/Multi Series Area Chart';
import GraphTimes from './components/GraphTimes';



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
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={{ enter: 3000, exit: 3000 }} classNames={'test'}>
            <Switch location={location}>
              <Route exact path='/timings' render={() => <div><GraphTimes/></div>}/>
              {/* <Route exact path='/timings' render={() => <div><MultiSeriesAreaChart/></div>}/> */}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }


export default withRouter(App);






