import { action, observable } from 'mobx';


import { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetAllEventTypeOutput } from '../services/eventType/dto/getAllEventTypeOutput';
import { PagedEventTypeResultRequestDto } from '../services/eventType/dto/pagedEventTypeResultRequestDto';
import eventTypeService from '../services/eventType/eventTypeService';
import { EntityDto } from '../services/dto/entityDto';
import EventTypeModel from '../models/Event/eventTypeModel';
import CreateEventTypeInput from '../services/eventType/dto/createEventTypeInput';
import UpdateEventTypeInput from '../services/eventType/dto/updateEventTypeInput';

class EventTypeStore {
    @observable eventType!: PagedResultDto<GetAllEventTypeOutput>;
    @observable eventTypeModel: EventTypeModel = new EventTypeModel();
        @observable allEventType: GetAllEventTypeOutput[] = [];

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
        await eventTypeService.update(updateEventTypeInput);
        this.eventType.items
          .filter((x: GetAllEventTypeOutput) => x.id === updateEventTypeInput.id)
          .map((x: GetAllEventTypeOutput) => {
            return (x = updateEventTypeInput);
          });
      }
    
      @action
      async getAllEventType() {
          var result = await eventTypeService.getAllEventType();
          this.allEventType = result;
      }    

    @action
    async get(entityDto: EntityDto) {
      let result = await eventTypeService.get(entityDto);
      this.eventTypeModel = result;
    }

    @action
    async delete(entityDto: EntityDto) {
        await eventTypeService.delete(entityDto);
        this.eventType.items = this.eventType.items.filter((x: GetAllEventTypeOutput) => x.id !== entityDto.id);
    }

    @action
    async getAll(pagedFilterAndSortedRequest: PagedEventTypeResultRequestDto) {
        let result = await eventTypeService.getAll(pagedFilterAndSortedRequest);
        this.eventType = result;
    }
}

export default EventTypeStore;