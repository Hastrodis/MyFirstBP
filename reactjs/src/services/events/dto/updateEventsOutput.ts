import DateWeekModel from "../../../models/Event/dateWeekModel";

export interface UpdateEventsOutput {
    title: string;
    description: string;
    picture: string;
    evTypeID: string;
    eventStart: string;
    eventEnd: string;
    id: number;
    dateWeeks: DateWeekModel[];
}