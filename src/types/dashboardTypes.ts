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

export interface DashboardDataResponseItem extends Metric {
  value: number;
}

export interface DashboardDataRequest {
  metricIds: Metric["id"][];
  restaurantId: number;
  dateStart: string; // ISOString
  dateEnd: string; // ISOString
}

// Наследует id и name из Metric, добавляет value
export interface DashboardDataResponse extends Metric {
  value: number;
}
