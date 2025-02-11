import React, { Component } from 'react'
import BuildingService from '../services/BuildingService'

class ViewBuildingComponent extends Component {
    constructor(props) {
        super(props)
         
        this.state = {
            id: this.props.match.params.id,
            building: {id : 0, buildingAdress : '', buildingZip : '', emailId: ''},
            data:[]
      
            //data:[{id : 2, buildingAdress : 'Building adress 1', buildingZip : '22001', emailId: 'emailbld1'}, {id : 3, buildingAdress : 'Building2 adress 2', buildingZip : '22002', emailId :'emailbld2'}]
       
        }
        
    }
    cancel(){
       

        this.props.history.push({
            pathname:'/buildings',
            state: this.state.data 
        })

    }
    componentDidMount(){
        /*
        BuildingService.getBuildingById(this.state.id).then( res => {
            this.setState({building: res.data});
        })
        */
        const { state } = this.props.location;
        console.log("state");
        console.log(state);
   
        const editBld=state.find(obj => obj.id+"" === this.state.id);
        //const editBld=this.state.data.find(obj => obj.id+"" === this.state.id);
        console.log(editBld);
        this.setState({building :editBld,data:state});
             

    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Building Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Building Adress: </label>
                            <div> { this.state.building.buildingAdress }</div>
                        </div>
                        <div className = "row">
                            <label> Building  Zip: </label>
                            <div> { this.state.building.buildingZip }</div>
                        </div>
                        <div className = "row">
                            <label> Building Email ID: </label>
                            <div> { this.state.building.emailId }</div>
                        </div>
                    </div>

                </div>
                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                             
            </div>
        )
    }
}

export default ViewBuildingComponent
