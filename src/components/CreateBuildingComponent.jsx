import React, { Component } from 'react'
import BuildingService from '../services/BuildingService';
import { v4 as uuidv4 } from 'uuid';
import validator from "validator";

class CreateBuildingComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            // step 2
            id: this.props.match.params.id,
            buildingAdress: '',
            buildingZip: '',
            emailId: '',
             data:[],
             message:"",
             bldmessage:""

        }
        this.changeBuildingAdressHandler = this.changeBuildingAdressHandler.bind(this);
        this.changeZip = this.changeZip.bind(this);
        this.saveOrUpdateBuilding = this.saveOrUpdateBuilding.bind(this);
        this.addItem=this.addItem.bind(this);
        this.validateEmail=this.validateEmail.bind(this); 
        this.isValidBld=this.isValidBld.bind(this)
    }
    validateEmail = () => {
        const email = this.state.emailId;
        const isEmailValid=validator.isEmail(email);
          if (isEmailValid) {
            this.setState({...this.state, message : ''});
            return  true;
        } else {
            this.setState({...this.state, message : 'Please, enter valid Email!'});
          return  false;
        }
       


      };

    // step 3
    componentDidMount(){
        const { state } = this.props.location;
        this.setState(
            {               data:state
            });
         console.log (JSON.stringify(state));

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            BuildingService.getBuildingById(this.state.id).then( (res) =>{
                let Building = res.data;
                this.setState({buildingAdress: Building.buildingAdress,
                    zip: Building.buildingZip,
                    emailId : Building.emailId
                });
            });
        }        
    }

isValidBld=() =>{
    const message=this.state.buildingAdress; 
    if (message !== undefined && message !== null && message==="") {
        this.setState({bldmessage:"Please, enter Building Adress!"})
        console.log(' variable is NOT undefined or null');
        return false;
    }
      else {
        this.setState({bldmessage:""})
        return true;
      }
}


    saveOrUpdateBuilding = (e) => {
        e.preventDefault();
        let Building = {buildingAdress: this.state.BuildingAdress, 
            buildingZip: this.state.buildingZip, emailId: this.state.emailId};
        console.log('Building => ' + JSON.stringify(Building));

        // step 5
        if(this.state.id === '_add'){
            /*
            BuildingService.createBuilding(Building).then(res =>{
                this.props.history.push('/Buildings');
            });
            */
            ;
            if (this.validateEmail(e) && this.isValidBld()) {
            console.log ("from state new list:"+JSON.stringify(this.addItem()));
            this.props.history.push({
                pathname:'/buildings',
                state: this.addItem()
            })
         }
            
            
        
            ;
        }else{
            BuildingService.updateBuilding(Building, this.state.id).then( res => {
                this.props.history.push('/Buildings');
            });
        }
    }
    
    addItem = () => {
        //const items =this.state.data;
        //const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
        
        const newItem = { id: uuidv4(), buildingAdress: this.state.buildingAdress, 
            buildingZip: this.state.buildingZip, 
            emailId: this.state.emailId };
    
        // Update the state immutably using the spread operator
        let newList=[...this.state.data, newItem];
         console.log("new list:"+JSON.stringify(newList));

        this.setState({data:newList});
        return newList;
      };

    changeBuildingAdressHandler= (event) => {
       // console.log( event.target.value);
        this.setState({buildingAdress: event.target.value});
    }

    changeZip= (event) => {
        this.setState({buildingZip: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/Buildings');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Building</h3>
        }else{
            return <h3 className="text-center">Update Building</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Building Adress: </label>
                                            <input placeholder="Building Adress" name="BuildingAdress" className="form-control" 
                                                value={this.state.buildingAdress} onChange={this.changeBuildingAdressHandler}/>
                                                <span
                                                                style={{
                                                                fontWeight: "bold",
                                                                color: "red"
                                                                }}
                                                            >
                                                    {this.state.bldmessage}
                                                </span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Zip Code: </label>
                                            <input placeholder="Building Zip Code" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeZip}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control"  
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                                 <span
                                                                style={{
                                                                fontWeight: "bold",
                                                                color: "red"
                                                                }}
                                                            >
                                                    {this.state.message}
                                                </span>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateBuilding}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateBuildingComponent
