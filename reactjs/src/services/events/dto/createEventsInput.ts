//import DateWeekModel from "../../../models/Event/dateWeekModel";

import CreateDateWeekInput from "./createDateWeekInput";

export default class CreateEventsInput {
    title!: string;
    description!: string;
    picture!: string;
    evTypeID!: string;
    eventStart!: string;
    eventEnd!: string;
    dateWeeks!: CreateDateWeekInput[];
}