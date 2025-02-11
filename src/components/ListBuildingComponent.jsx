import React, { useState,useEffect } from 'react'
import BuildingService from '../services/BuildingService'
import {data} from '../data/data'
import UtilService from '../services/UtilService'
//import ConfirmationDialog from './ConfirmationDialog';
import ConfirmationDialog from './ConfirmationDialog';

const  ListBuildingComponent =(props) => {

const [buildings, setBuildings]=useState([]) ;
const [isDeleteDialogOpen, setDeleteDialogOpen]=useState(false) ;
const [itemToDeleteId, setItemToDeleteId]=useState(null) ;

  
    const  handleDeleteClick = (id) => {
        setItemToDeleteId(id);
        setDeleteDialogOpen(true);
      };
    
      const  handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setItemToDeleteId(null);
      };
   
      const  deleteBuilding=(id)=>{
        const buildingsUpd= buildings.filter(
            building => building.id !== id);
            setBuildings(buildingsUpd);
                
        }
      const   handleConfirmDelete = () => {
        const id=itemToDeleteId;
        setItemToDeleteId(id);

        deleteBuilding(id);
         // Perform delete operation using itemToDeleteId
        console.log(`Deleting item with ID: ${itemToDeleteId}`);
        setDeleteDialogOpen(false);
        setItemToDeleteId(null);
      };
   
   const viewBuilding=(id)=>{
        props.history.push( {
            pathname: `/view-building/${id}`,
            state: buildings
        }
        );

    }
    const editBuilding =(id)=>{
        props.history.push(
            {
            pathname:`/update-building/${id}`,
            state: buildings
        }


        );
    }

   const componentDidMount =()=>{
        let  prpstate  = props.location.state;
        console.log("prpstate=>"+JSON.stringify(prpstate));
       

        if (prpstate) {
        setBuildings(prpstate);        
        console.log("componentDidMount update=>"+JSON.stringify(prpstate))
        } else {
        console.log("componentDidMount data=>"+JSON.stringify(data));  
        setBuildings(data); ;
        console.log("componentDidMount buildings=>"+JSON.stringify(buildings));
        }
        
    }

    const addBuilding=()=>{
        //props.history.push('/add-building/_add');
        
        props.history.push(
            { pathname:'/add-building/_add',
            state: buildings
            }

        );
        
    }
      
   useEffect(componentDidMount,[]);
    return (
            <div>
                 <h2 className="text-center">Buildings List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={()=>addBuilding()}> Add Building</button>
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
                                    buildings.map(
                                        building => 
                                        <tr key = {building.id}>
                                             <td> { building.buildingAdress} </td>   
                                             <td> {building.buildingZip}</td>
                                             <td> {building.emailId}</td>
                                             <td>
                                                 <button onClick={ () => editBuilding(building.id)} className="btn btn-info">Update </button>
                                               
                                                 <button style={{marginLeft: "10px"}} onClick={ () => handleDeleteClick(building.id)} className="btn btn-danger">Delete </button>
                                                 
                                                 <button style={{marginLeft: "10px"}} onClick={ () => viewBuilding(building.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div>
                        <ConfirmationDialog
                                                    isOpen={isDeleteDialogOpen}
                                                    onCancel={()=>handleCancelDelete()}
                                                    onConfirm={()=>handleConfirmDelete(itemToDeleteId)}
                                                    message="Are you sure you want to delete this item?"
                        />   
                        <button onClick={ () => UtilService.exportToExcel(buildings,"buildings.xlx")} className="btn btn-info">Download Excel File </button>
                        </div>                     
                 </div>

            </div>
        )
    
    }
export default ListBuildingComponent