import axios from 'axios';

const BLD_API_BASE_URL = "http://localhost:8080/api/v1/Buildings";
const data = "[{id : 2, buildingAdress : 'Building adress 1', buildingZip : '22001', emailId: 'emailbld1'}, {id : 3, buildingAdress : 'Building2 adress 2', buildingZip : '2202', emailId :'emailbld2'}]";
//const res =()=>{data:data};
class BuildingService {
    

    getBuildings(){
        //const data =axios.get(BLD_API_BASE_URL);
        //return axios.get(BLD_API_BASE_URL);
        return   {data:data};
    
    }

    createBuilding(Building){
        return axios.post(BLD_API_BASE_URL, Building);
    }

    getBuildingById(BuildingId){
        return axios.get(BLD_API_BASE_URL + '/' + BuildingId);
    }

    updateBuilding(Building, BuildingId){
        return axios.put(BLD_API_BASE_URL + '/' + BuildingId, Building);
    }

    deleteBuilding(BuildingId){
        return axios.delete(BLD_API_BASE_URL + '/' + BuildingId);
    }
}

export default new BuildingService()