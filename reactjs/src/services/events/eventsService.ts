import http from "../httpService";
import { PagedResultDto } from '../dto/pagedResultDto';
import { EntityDto } from '../dto/entityDto';
import CreateEventsInput from "./dto/createEventsInput";
import CreateEventsOutput from "./dto/createEventsOutput";
import GetEventsOutput from "./dto/getEventsOutput";
import { PagedEventsResultRequestDto } from "./dto/pagedEventsResultRequestDto";
import { GetAllEventsOutput } from "./dto/getAllEventsOutput";
import UpdateEventsInput from "./dto/updateEventsInput";
import { UpdateEventsOutput } from "./dto/updateEventsOutput";
import CreateDateWeekInput from "./dto/createDateWeekInput";
import CreateDateWeekOutput from "./dto/createDateWeekOutput";


class EventsService {

  public async create(createEvenTypeInput: CreateEventsInput): Promise<CreateEventsOutput> {
    let result = await http.post('/api/services/app/Events/Create', createEvenTypeInput);
    return result.data.result;    
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('/api/services/app/Events/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetEventsOutput> {
    let result = await http.get('/api/services/app/Events/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedEventsResultRequestDto): Promise<PagedResultDto<GetAllEventsOutput>> {
    let result = await http.get('/api/services/app/Events/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async update(updateEventsInput: UpdateEventsInput): Promise<UpdateEventsOutput> {
    let result = await http.put('/api/services/app/Events/Update', updateEventsInput);
    return result.data.result;
  }

  public async createDateWeek(createDateWeek: CreateDateWeekInput): Promise<CreateDateWeekOutput> {
    let result = await http.post('/api/services/app/DateWeek/Create', createDateWeek);
    return result.data.result;    
  }

}

export default new EventsService();