import { action, observable } from 'mobx';


import { PagedResultDto } from '../services/dto/pagedResultDto';
import { getAllEventTypeOutput } from '../services/eventType/dto/getAllEventTypeOutput';
import { PagedEventTypeResultRequestDto } from '../services/eventType/dto/pagedEventTypeResultRequestDto';
import eventTypeService from '../services/eventType/eventTypeService';
import { EntityDto } from '../services/dto/entityDto';
import EventTypeModel from '../models/Event/eventTypeModel';
import CreateEventTypeInput from '../services/eventType/dto/createEventTypeInput';
import UpdateEventTypeInput from '../services/eventType/dto/updateEventTypeInput';

class EventTypeStore {
    @observable eventType!: PagedResultDto<getAllEventTypeOutput>;
    @observable eventTypeModel: EventTypeModel = new EventTypeModel();

    @action
    async create(createEventTypeInput: CreateEventTypeInput) {
        await eventTypeService.create(createEventTypeInput);
    }

    @action
    async createEventType() {
        this.eventTypeModel = {
            id: 0,
            typeName: '',
        }
    }
    
    @action 
    async update(updateEventTypeInput: UpdateEventTypeInput) {
        let result = await eventTypeService.update(updateEventTypeInput);

        this.eventType.items = this.eventType.items.map((x: getAllEventTypeOutput) => {
            if (x.id = updateEventTypeInput.id) x= result;
            return x;
        });
    }

    @action
    async get(entityDto: EntityDto) {
      let result = await eventTypeService.get(entityDto);
      this.eventTypeModel = result;
    }

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