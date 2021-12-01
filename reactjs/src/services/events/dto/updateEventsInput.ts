import DateWeekModel from "../../../models/Event/dateWeekModel";

export default interface UpdateEventsInput {
    title: string;
    description: string;
    picture: string;
    evTypeID: string;
    id: number;
    dateWeek: DateWeekModel[];
    
}