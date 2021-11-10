import http from "../httpService";
import { PagedEventTypeResultRequestDto } from './dto/pagedEventTypeResultRequestDto';
import { getAllEventTypeOutput } from './dto/getAllEventTypeOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { EntityDto } from '../dto/entityDto';
import CreateEventTypeInput from "./dto/createEventTypeInput";
import CreateEventTypeOutput from "./dto/createEventTypeOutput";
import UpdateEventTypeInput from "./dto/updateEventTypeInput";
import { UpdateEventTypeOutput } from "./dto/updateEventTypeOutput";
import GetEventTypeOutput from "./dto/getEventTypeOutput";

class EventTypeService {

  public async create(createEvenTypeInput: CreateEventTypeInput): Promise<CreateEventTypeOutput> {
    let result = await http.post('/api/services/app/EventType/Create', CreateEventTypeInput);
    return result.data.result;    
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('/api/services/app/EventType/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetEventTypeOutput> {
    let result = await http.get('api/services/app/Tenant/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedEventTypeResultRequestDto): Promise<PagedResultDto<getAllEventTypeOutput>> {
    let result = await http.get('/api/services/app/EventType/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async update(updateEventTypeInput: UpdateEventTypeInput): Promise<UpdateEventTypeOutput> {
    let result = await http.put('api/services/app/Tenant/Update', updateEventTypeInput);
    return result.data.result;
  }
}

export default new EventTypeService();