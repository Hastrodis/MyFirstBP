import DateWeekModel from "../../../models/Event/dateWeekModel";

export default interface CreateEventsOutput {
    title: string;
    description: string;
    picture: string;
    evTypeID: string;
    id: number;
    eventStart: string;
    eventEnd: string;
    dateWeeks: DateWeekModel[];
}