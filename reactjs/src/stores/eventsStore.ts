import { action, observable } from 'mobx';


import { PagedResultDto } from '../services/dto/pagedResultDto';
import { EntityDto } from '../services/dto/entityDto';
import eventsService from '../services/events/eventsService';
import UpdateEventsInput from '../services/events/dto/updateEventsInput';
import CreateEventsInput from '../services/events/dto/createEventsInput';
import EventsModel from '../models/Event/eventsModel';
import { GetAllEventsOutput } from '../services/events/dto/getAllEventsOutput';
import GetEventsOutput from '../services/events/dto/getEventsOutput';
import { PagedEventsResultRequestDto } from '../services/events/dto/pagedEventsResultRequestDto';


class EventsStore {
    @observable events!: PagedResultDto<GetEventsOutput>;
    @observable eventsModel: EventsModel = new EventsModel();

    @action
    async create(createEventsInput: CreateEventsInput) {
        await eventsService.create(createEventsInput);
    }

    @action
    async createEvents() {
        this.eventsModel = {
            id: 0,
            title: '',
            description: '',
            picture: '',
            evTypeID: '',
        }
    }
    
    @action 
    async update(updateEventsInput: UpdateEventsInput) {
        await eventsService.update(updateEventsInput);
        this.events.items
          .filter((x: GetAllEventsOutput) => x.id === updateEventsInput.id)
          .map((x: GetAllEventsOutput) => {
            return (x = updateEventsInput);
          });
      }


    @action
    async get(entityDto: EntityDto) {
      let result = await eventsService.get(entityDto);
      this.eventsModel = result;
    }

    @action
    async delete(entityDto: EntityDto) {
        await eventsService.delete(entityDto);
        this.events.items = this.events.items.filter((x: GetAllEventsOutput) => x.id !== entityDto.id);
    }

    @action
    async getAll(pagedFilterAndSortedRequest: PagedEventsResultRequestDto) {
        let result = await eventsService.getAll(pagedFilterAndSortedRequest);
        this.events = result;
    }
}

export default EventsStore;