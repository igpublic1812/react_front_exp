import React, { Component } from 'react'
import BuildingService from '../services/BuildingService';

class CreateBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            buildingAdress: '',
            buildingZip: '',
            emailId: ''
        }
        this.changeBuildingAdressHandler = this.changeBuildingAdressHandler.bind(this);
        this.changeZip = this.changeZip.bind(this);
        this.saveOrUpdateBuilding = this.saveOrUpdateBuilding.bind(this);
    }

    // step 3
    componentDidMount(){

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
    saveOrUpdateBuilding = (e) => {
        e.preventDefault();
        let Building = {buildingAdress: this.state.BuildingAdress, 
            buildingZip: this.state.buildingZip, emailId: this.state.emailId};
        console.log('Building => ' + JSON.stringify(Building));

        // step 5
        if(this.state.id === '_add'){
            BuildingService.createBuilding(Building).then(res =>{
                this.props.history.push('/Buildings');
            });
        }else{
            BuildingService.updateBuilding(Building, this.state.id).then( res => {
                this.props.history.push('/Buildings');
            });
        }
    }
    
    changeBuildingAdressHandler= (event) => {
        this.setState({BuildingAdress: event.target.value});
    }

    changeZip= (event) => {
        this.setState({lastName: event.target.value});
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
