import { action, observable } from 'mobx';


import { PagedResultDto } from '../services/dto/pagedResultDto';
import { getAllEventTypeOutput } from '../services/eventType/dto/getAllEventTypeOutput';
import { PagedEventTypeResultRequestDto } from '../services/eventType/dto/pagedEventTypeResultRequestDto';
import eventTypeService from '../services/eventType/eventTypeService';

class EventTypeStore {
    @observable eventType!: PagedResultDto<getAllEventTypeOutput>

    @action
    async getAll(pagedFilterAndSortedRequest: PagedEventTypeResultRequestDto) {
        let result = await eventTypeService.getAll(pagedFilterAndSortedRequest);
        this.eventType = result;
    }
}

export default EventTypeStore;