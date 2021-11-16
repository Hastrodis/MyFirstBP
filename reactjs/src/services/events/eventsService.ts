import http from "../httpService";
import { PagedResultDto } from '../dto/pagedResultDto';
import { EntityDto } from '../dto/entityDto';
import CreateEventsInput from "./dto/createEventsInput";
import CreateEventsOutput from "./dto/createEventsOutput";
import GetEventsOutput from "./dto/getEventsOutput";
import { PagedEventsResultRequestDto } from "./dto/pagedEventsResultRequestDto";
import { GetAllEventsOutput } from "./dto/getAllEventsOutput";
import UpdateEventsInput from "./dto/UpdateEventsInput";
import { UpdateEventsOutput } from "./dto/UpdateEventsOutput";

class EventTypeService {

  public async create(createEvenTypeInput: CreateEventsInput): Promise<CreateEventsOutput> {
    let result = await http.post('/api/services/app/Event/Create', createEvenTypeInput);
    return result.data.result;    
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('/api/services/app/Event/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetEventsOutput> {
    let result = await http.get('api/services/app/EventType/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedEventsResultRequestDto): Promise<PagedResultDto<GetAllEventsOutput>> {
    let result = await http.get('/api/services/app/EventType/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async update(updateEventTypeInput: UpdateEventsInput): Promise<UpdateEventsOutput> {
    let result = await http.put('api/services/app/EventType/Update', updateEventTypeInput);
    return result.data.result;
  }
}

export default new EventTypeService();