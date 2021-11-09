import http from "../httpService";
import { PagedEventTypeResultRequestDto } from './dto/pagedEventTypeResultRequestDto';
import { getAllEventTypeOutput } from './dto/getAllEventTypeOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { EntityDto } from '../dto/entityDto';

class EventTypeService {

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('/api/services/app/EventType/Delete', { params: entityDto });
    return result.data;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedEventTypeResultRequestDto): Promise<PagedResultDto<getAllEventTypeOutput>> {
        let result = await http.get('/api/services/app/EventType/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result;
      }
}

export default new EventTypeService();