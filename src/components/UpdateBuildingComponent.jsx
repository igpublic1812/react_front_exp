import React, { Component } from 'react'
import BuildingService from '../services/BuildingService'


class UpdateBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            buildingAdress: '',
            buildingZip: '',
            emailId: '',
            //data:[{id : 2, buildingAdress : 'Building adress 1', buildingZip : '22001', emailId: 'emailbld1'}, {id : 3, buildingAdress : 'Building2 adress 2', buildingZip : '22002', emailId :'emailbld2'}]
            data:[]
     
        }
        this.changeBuildingAdressHandler = this.changeBuildingAdressHandler.bind(this);
        this.changeBuildinZipHandler = this.changeBuildinZipHandler.bind(this);
        this.updateBuilding = this.updateBuilding.bind(this);
    }

    componentDidMount(){
        /*
        BuildingService.getBuildingById(this.state.id).then( (res) =>{
            let building = res.data;
            this.setState({buildingAdress: building.buildingAdress,
                lastName: building.buildingZip,
                emailId : building.emailId
            });
        });
        */

        const { state } = this.props.location;

        let building=state.find(obj => obj.id+"" === this.state.id);
        console.log(building);
            console.log("state=");            
            console.log(state);            
            
        this.setState(
            {buildingAdress: building.buildingAdress,
                buildingZip: building.buildingZip,
                emailId : building.emailId,
                data:state
            });     
            
            
    }

    updateBuilding = (e) => {
        e.preventDefault();
        let building = {buildingAdress: this.state.buildingAdress, buildingZip: this.state.buildingZip, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(building));
        console.log('id => ' + JSON.stringify(this.state.id));
        /*
        BuildingService.updateBuilding(building, this.state.id).then( res => {
            this.props.history.push('/buildings');
        });
        */
    }
    
    changeBuildingAdressHandler= (event) => {
        this.setState({buildingAdress: event.target.value});
    }

    changeBuildinZipHandler= (event) => {
        this.setState({buildingZip: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/buildings');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Building</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="Building Adress" name="buildingAdress" className="form-control" 
                                                value={this.state.buildingAdress} onChange={this.changeBuildingAdressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Building Zip" name="buildingZip" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeBuildinZipHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateBuilding}>Save</button>
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

export default UpdateBuildingComponent
