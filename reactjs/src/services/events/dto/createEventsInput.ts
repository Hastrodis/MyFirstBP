export default class CreateEventsInput {
    title!: string;
    description!: string;
    picture!: string;
    evTypeID!: string;
    eventStart!: string;
    eventEnd!: string;
    dateWeek!: number[];
}