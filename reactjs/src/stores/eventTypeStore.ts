import { action, observable } from 'mobx';


import { PagedResultDto } from '../services/dto/pagedResultDto';
import { getAllEventTypeOutput } from '../services/eventType/dto/getAllEventTypeOutput';
import { PagedEventTypeResultRequestDto } from '../services/eventType/dto/pagedEventTypeResultRequestDto';
import eventTypeService from '../services/eventType/eventTypeService';
import { EntityDto } from '../services/dto/entityDto';

class EventTypeStore {
    @observable eventType!: PagedResultDto<getAllEventTypeOutput>

    @action
    async delete(entityDto: EntityDto) {
        await eventTypeService.delete(entityDto);
        this.eventType.items = this.eventType.items.filter((x: getAllEventTypeOutput) => x.id !== entityDto.id);
    }

    @action
    async getAll(pagedFilterAndSortedRequest: PagedEventTypeResultRequestDto) {
        let result = await eventTypeService.getAll(pagedFilterAndSortedRequest);
        this.eventType = result;
    }
}

export default EventTypeStore;