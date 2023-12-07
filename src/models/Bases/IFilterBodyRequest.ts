import { FilterRequest } from "./FilterRequest";
import { SortDescriptor } from "./SortDescriptor";

export interface IFilterBodyRequest {
  searchValue?: string;
  pagination?: IPagination;
  filter?: FilterRequest;
  orders?: SortDescriptor[];
}
export interface IPagination {
  totalRow?: number;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
}
