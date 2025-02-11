import React, {  useContext } from 'react';

import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListBuildingComponent from './components/ListBuildingComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBuildingComponent from './components/CreateBuildingComponent';
import UpdateBuildingComponent from './components/UpdateBuildingComponent';
import ViewBuildingComponent from './components/ViewBuildingComponent';
import {data} from './data/data.js'
function App() {
  const AppBldContext = React.createContext();
  const state = {
                buildings: {data},
                showConfirmation :false,
                dltId:''
            }      
  return (
    <AppBldContext.Provider value={{ data }}>
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListBuildingComponent}></Route>
                          <Route path = "/buildings" component = {ListBuildingComponent}></Route>
                          
                          <Route path = "/add-building/:id" component = {CreateBuildingComponent} state={state}></Route>

                          <Route path = "/view-building/:id" component = {ViewBuildingComponent}></Route>
                          <Route path = "/update-building/:id" component = {UpdateBuildingComponent}></Route> 
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    </AppBldContext.Provider>
  );
}

export default App;
