import { action, observable } from 'mobx';


import { PagedResultDto } from '../services/dto/pagedResultDto';
import { EntityDto } from '../services/dto/entityDto';
import eventsService from '../services/events/eventsService';
import eventTypeService from '../services/eventType/eventTypeService';
import UpdateEventsInput from '../services/events/dto/updateEventsInput';
import CreateEventsInput from '../services/events/dto/createEventsInput';
import EventsModel from '../models/Event/eventsModel';
import { GetAllEventsOutput } from '../services/events/dto/getAllEventsOutput';
import GetEventsOutput from '../services/events/dto/getEventsOutput';
import { PagedEventsResultRequestDto } from '../services/events/dto/pagedEventsResultRequestDto';
import { GetAllEventTypeOutput } from '../services/eventType/dto/getAllEventTypeOutput';
import { GetAllDateWeek } from '../services/events/dto/getAllDateWeek';
import DateWeekModel from '../models/Event/dateWeekModel';
//import NormalizeValueDateWeek from '../services/events/dto/normalizeValueDateWeek';


class EventsStore {
    @observable events!: PagedResultDto<GetEventsOutput>;
    @observable eventsModel: EventsModel = new EventsModel();
    @observable dateWeekModel: DateWeekModel = new DateWeekModel();
    @observable eventEdit: GetAllEventsOutput[] = [];
    @observable allEventType: GetAllEventTypeOutput[] = [];
    @observable allDateWeek: GetAllDateWeek[] = [];
    //@observable normalizedName: NormalizeValueDateWeek[] = [];

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
            eventStart: '',
            eventEnd: '',
            evTypeID: '',
            dateWeeks: [ {id: 0, weekName: 0, eventId: 0}]
        }
    }
    
    @action
    async createDateWeek() {
        this.dateWeekModel = {
            id: 0,
            eventId: 0,
            weekName: 0,
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
    async getAllEventType() {
        var result = await eventTypeService.getAllEventType();
        this.allEventType = result;
    }

    @action
    async getEventEdit() {
        var result = await eventsService.getEventEdit();
        this.eventEdit = result;
    }

    @action
    async getAll(pagedFilterAndSortedRequest: PagedEventsResultRequestDto) {
        let result = await eventsService.getAll(pagedFilterAndSortedRequest);
        this.events = result;
    }
}

export default EventsStore;