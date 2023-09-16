export interface IFilterBodyRequest {
  searchValue?: string;
  pagination?: IPagination;
}
export interface IPagination {
  totalRow?: number;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
}
