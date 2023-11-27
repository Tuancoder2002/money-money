import { FilterDetailsRequest } from "./FilterDetailsRequest";
import { FilterLogicalOperator } from "./FilterLogicalOperator";

export interface FilterRequest {
  logicalOperator: FilterLogicalOperator;
  details: FilterDetailsRequest[];
}
