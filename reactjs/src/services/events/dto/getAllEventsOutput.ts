import DateWeekModel from "../../../models/Event/dateWeekModel";

export interface GetAllEventsOutput {
    title: string;
    description: string;
    picture: string;
    evTypeID: string;
    id: number;
    dateWeek: DateWeekModel[];
}