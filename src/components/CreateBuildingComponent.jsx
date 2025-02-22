import React, { useState ,useEffect} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead';
import BuildingService from '../services/BuildingService';
import { v4 as uuidv4 } from 'uuid';
import validator from "validator";
import {options} from '../data/zip'

const CreateBuildingComponent =(props) => {
//props.match.params.id
    const [id,setId] =useState ("");
    const [ buildingAdress, setBuildingAdress]=useState ( '');
    const [ buildingZip,setBuildingZip]=useState ( '');
    const [ emailId, setEmailId]=useState ('');
    const [data,setData]=useState ([]);
    const [message,setMessage]=useState ("");
    const [bldmessage,setBldmessage]=useState ("");
        
    const validateEmail = () => {
        const email = emailId;
        const isEmailValid=validator.isEmail(email);
          if (isEmailValid) {
            setMessage('');
            return  true;
        } else {
            setMessage('Please, enter valid Email!');
          return  false;
        }
      };

    // step 3
const componentDidMount=()=>{
    console.log ("CreateBuildingComponent componentDidMount");
         const { state } = props.location;
        console.log (JSON.stringify(state));
    
        setData(state);
         console.log (JSON.stringify(state));
        
        // step 4
        
        
};

const isValidBld=() =>{
    const message=buildingAdress; 
    if (message !== undefined && message !== null && message==="") {
        setBldmessage("Please, enter Building Adress!")
        console.log(' variable is NOT undefined or null');
        return false;
    }
      else {
        setBldmessage("")
        return true;
      }
}


const saveOrUpdateBuilding = (e) => {
        e.preventDefault();
        let Building = {buildingAdress: buildingAdress, 
            buildingZip: buildingZip, emailId: emailId};
        console.log('Building => ' + JSON.stringify(Building));

        // step 5
        //if(id === '_add')
            {
            /*
            BuildingService.createBuilding(Building).then(res =>{
                props.history.push('/Buildings');
            });
            */
            let validEmail=validateEmail(e) 
            let validBld= isValidBld();

            if (validEmail && validBld) {
            console.log ("from state new list:"+JSON.stringify(addItem()));
            props.history.push({
                pathname:'/buildings',
                state: addItem()
            })
         };
        }
    }
    
    const  addItem = () => {
        //const items =state.data;
        //const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
        const newItem = { id: uuidv4(), buildingAdress: buildingAdress, 
            buildingZip: buildingZip, 
            emailId: emailId };
    
        // Update the state immutably using the spread operator
        let newList=[...data, newItem];
         console.log("new list:"+JSON.stringify(newList));

        setData({data:newList});
        return newList;
      };

      const changeBuildingAdressHandler= (event) => {
       // console.log( event.target.value);
        setBuildingAdress( event.target.value);
    }

    const changeZip= (event) => {
        setBuildingZip( event.target.value);
    }

    const changeEmailHandler= (event) => {
        setEmailId( event.target.value);
    }

    const cancel=()=>{
        props.history.push('/Buildings');
    }

    const getTitle=()=>{
        if(id === '_add'){
            return <h3 className="text-center">Add Building</h3>
        }else{
            return <h3 className="text-center">Update Building</h3>
        }
    }
    useEffect(componentDidMount,[]);

        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                 getTitle()   
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Building Adress: </label>
                                            <input placeholder="Building Adress" name="BuildingAdress" className="form-control" 
                                                value={buildingAdress} onChange={changeBuildingAdressHandler}/>
                                                <span
                                                                style={{
                                                                fontWeight: "bold",
                                                                color: "red"
                                                                }}
                                                            >
                                                    {bldmessage}
                                                </span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Zip Code: </label>
                                            <Typeahead
                                            options={options}
                                            placeholder="zip"
                                            selected={buildingZip}
                                            onChange={setBuildingZip}
                                            />                                     
                                        </div>
                                       
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control"  
                                                value={emailId} onChange={changeEmailHandler}/>
                                                 <span
                                                                style={{
                                                                fontWeight: "bold",
                                                                color: "red"
                                                                }}
                                                            >
                                                    {message}
                                                </span>
                                        </div>

                                        <button className="btn btn-success" onClick={saveOrUpdateBuilding}>Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }

export default CreateBuildingComponent
