import DateWeekModel from "./dateWeekModel";

class EventsModel {
    title!: string;
    description!: string;
    picture!: string;
    evTypeID!: string;
    id!: number;
    dateWeek: DateWeekModel[] = [];
}

export default EventsModel;