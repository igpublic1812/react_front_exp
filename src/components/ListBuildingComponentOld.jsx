import React, { Component } from 'react'
import BuildingService from '../services/BuildingService'
import {data} from '../data/data'
import UtilService from '../services/UtilService'
//import ConfirmationDialog from './ConfirmationDialog';
import ConfirmationDialog from './ConfirmationDialog';

class ListBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                buildings: [],
                isDeleteDialogOpen:true,
                itemToDeleteId:null
        }
        this.addBuilding = this.addBuilding.bind(this);
        this.editBuilding = this.editBuilding.bind(this);
        this.deleteBuilding = this.deleteBuilding.bind(this);
        this.data=(data);

        this.handleDeleteClick  = this.handleDeleteClick.bind(this); 
        this.handleCancelDelete= this.handleCancelDelete.bind(this);
        this.handleConfirmDelete=this.handleConfirmDelete.bind(this); 
    }
  
     handleDeleteClick = (id) => {
        this.state.itemToDeleteId=id;
        this.state.isDeleteDialogOpen=true;
      };
    
      handleCancelDelete = () => {
        this.state.isDeleteDialogOpen=false;
        this.state.itemToDeleteId=null;
      };
    
       handleConfirmDelete = () => {
         // Perform delete operation using itemToDeleteId
        console.log(`Deleting item with ID: ${this.state.itemToDeleteId}`);
        this.state.isDeleteDialogOpen=false;
        this.state.itemToDeleteId=null;
      };
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
            state: this.state.buildings
        }


        );
    }

    componentDidMount(){
        this.setState({ buildings: this.data});
        const { state } = this.props.location;

        if (state) {
        this.setState({ buildings: state});
        //this.setState({ data: state});
        }
        console.log("componentDidMount data=>"+JSON.stringify(this.state.data));
        console.log("componentDidMount buildings=>"+JSON.stringify(this.state.buildings))
        /*
        BuildingService.getBuildings().then((res) => {
            this.setState({ buildings: res.data});
            console.log(res) ;
        
        });
        */
    }

    addBuilding(){
        //this.props.history.push('/add-building/_add');
        this.props.history.push(
            { pathname:'/add-building/_add',
            state: this.data
            }

        );
        
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
                        <div>
                        <ConfirmationDialog
                                                    isOpen={false}
                                                    onCancel={()=>this.handleCancelDelete()}
                                                    onConfirm={()=>this.handleConfirmDelete(this.state.itemToDeleteId)}
                                                    message="Are you sure you want to delete this item?"
                        />   
                        <button onClick={ () => UtilService.exportToExcel(this.state.buildings,"buildings.xlx")} className="btn btn-info">Download Excel File </button>
                        </div>                     
                 </div>

            </div>
        )
    }
}

export default ListBuildingComponentOld