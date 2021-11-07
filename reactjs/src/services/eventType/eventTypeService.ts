import http from "../httpService";
import { PagedEventTypeResultRequestDto } from './dto/pagedEventTypeResultRequestDto';
import { getAllEventTypeOutput } from './dto/getAllEventTypeOutput';
import { PagedResultDto } from '../dto/pagedResultDto';

class EventTypeService {

    public async getAll(pagedFilterAndSortedRequest: PagedEventTypeResultRequestDto): Promise<PagedResultDto<getAllEventTypeOutput>> {
        let result = await http.get('/api/services/app/EventType/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result;
      }
}

export default new EventTypeService();