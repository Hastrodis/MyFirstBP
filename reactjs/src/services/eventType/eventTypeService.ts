import http from "../httpService";

class EventTypeService {
    public async getAllEventType(){
        let result = await http.get('api/services/app/EventType/GetAll')
        return result.data
    }
}

export default new EventTypeService();