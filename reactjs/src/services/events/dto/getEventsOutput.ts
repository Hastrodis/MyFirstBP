import DateWeekModel from "../../../models/Event/dateWeekModel";

export default class GetEventsOutput {
    title!: string;
    description!: string;
    picture!: string;
    evTypeID!: string;
    id!: number;
    eventStart!: string;
    eventEnd!: string;
    dateWeek!: DateWeekModel[];
}