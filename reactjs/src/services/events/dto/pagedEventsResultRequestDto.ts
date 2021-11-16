import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedEventsResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
