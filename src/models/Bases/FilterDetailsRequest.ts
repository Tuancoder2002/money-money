import { FilterType } from "./FilterType";

export interface FilterDetailsRequest{
    attributeName : string,
    value: string,
    filterType: FilterType
}