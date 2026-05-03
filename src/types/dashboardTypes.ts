export interface Restaurant {
  city: string;
  pointNumber: number;
  id: number;
}

export interface GetQueryParams {
  search?: string;
}

export interface Metric {
  id: string;
  name: string;
}

export interface DashboardDataRequest {
  metricIds: Metric["id"][];
  restaurantId: number;
  dateStart: string; // ISOString
  dateEnd: string; // ISOString
}

export interface DashboardDataResponse {
  name: string;
  value: number;
}
