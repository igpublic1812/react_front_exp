import React, { Component } from 'react'
import BuildingService from '../services/BuildingService'

class ListBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                buildings: []
        }
        this.addBuilding = this.addBuilding.bind(this);
        this.editBuilding = this.editBuilding.bind(this);
        this.deleteBuilding = this.deleteBuilding.bind(this);
        this.data=[{id : 2, buildingAdress : 'Building adress 1', buildingZip : '22001', emailId: 'emailbld1'}, {id : 3, buildingAdress : 'Building2 adress 2', buildingZip : '22002', emailId :'emailbld2'}];

    }

    deleteBuilding(id){
        /* 
        BuildingService.deleteBuilding(id).then( res => {
            this.setState({buildings: this.state.buildings.filter(
                building => building.id !== id)});
        });
        */
        {
            this.setState({buildings: this.state.buildings.filter(
                building => building.id !== id)});
        }    
    }
    viewBuilding(id){
        this.props.history.push( {
            pathname: `/view-building/${id}`,
            state: this.data
        }
        );

    }
    editBuilding(id){
        this.props.history.push(
            {
            pathname:`/update-building/${id}`,
            state: this.data
        }


        );
    }

    componentDidMount(){
        this.setState({ buildings: this.data});
       /*
        BuildingService.getBuildings().then((res) => {
            this.setState({ buildings: res.data});
            console.log(res) ;
        
        });
        */
    }

    addBuilding(){
        this.props.history.push('/add-building/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Buildings List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addBuilding}> Add Building</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Building Adress</th>
                                    <th> Building Zip</th>
                                    <th> Building Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.buildings.map(
                                        building => 
                                        <tr key = {building.id}>
                                             <td> { building.buildingAdress} </td>   
                                             <td> {building.buildingZip}</td>
                                             <td> {building.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editBuilding(building.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBuilding(building.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBuilding(building.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListBuildingComponent
