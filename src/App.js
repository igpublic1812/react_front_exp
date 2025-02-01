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

function App() {
  const AppBldContext = React.createContext();
  const data=[{id : 2, buildingAdress : 'Building adress 1', buildingZip : '22001', emailId: 'emailbld1'}, {id : 3, buildingAdress : 'Building2 adress 2', buildingZip : '22002', emailId :'emailbld2'}];
        
  return (
    <AppBldContext.Provider value={{ data }}>
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListBuildingComponent}></Route>
                          <Route path = "/buildings" component = {ListBuildingComponent}></Route>
                          <Route path = "/add-building/:id" component = {CreateBuildingComponent}></Route>
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
