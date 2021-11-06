import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedEventTypeResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
