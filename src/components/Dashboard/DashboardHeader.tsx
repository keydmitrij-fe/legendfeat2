import { DatePicker, DatePickerProps, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { use, useEffect, useState } from "react";
import { fetchMetrics, fetchRestaurants } from "./mocks";
import { useQuery } from "@tanstack/react-query";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

const DashboardHeader: React.FC = () => {
  const [restaurantSelectValue, setRestaurantSelectValue] =
    useState<string>("");

  const [dateRange, setDateRange] = useState<[string, string] | undefined>(
    undefined,
  );

  const { RangePicker } = DatePicker;

  const [selectedMetricsIds, setSelectedMetricsIds] = useState<number[]>([]);

  const { data: restaurantList, isLoading: restaurantListIsLoading } = useQuery(
    {
      queryKey: ["restaurantList", restaurantSelectValue],
      queryFn: () => fetchRestaurants({ search: restaurantSelectValue }),
      staleTime: 300000,
    },
  );

  const { data: metricsList, isLoading: metricsListIsLoading } = useQuery({
    queryKey: ["metricsList"],
    queryFn: fetchMetrics,
    staleTime: 300000,
  });

  return (
    <div>
      <RangePicker
        onChange={(dayjsDate, dateString) => {
          const formattedFromDate = new Date(dateString[0]).toISOString();
          const formattedToDate = new Date(dateString[1]).toISOString();
          setDateRange([formattedFromDate, formattedToDate]);
        }}
      />
      <Select
        filterOption={false}
        loading={restaurantListIsLoading}
        placeholder="Ресторан"
        showSearch
        defaultValue={restaurantSelectValue}
        onSearch={(val) => setRestaurantSelectValue(val)}
        style={{ width: 120 }}
        allowClear
        options={restaurantList?.map((restaurant) => {
          return {
            value: restaurant.id,
            label: `${restaurant.city} ${restaurant.pointNumber}`,
          };
        })}
      />
      <Select
        mode="multiple"
        loading={metricsListIsLoading}
        style={{ width: 120 }}
        onChange={setSelectedMetricsIds}
        placeholder="Метрики"
        options={metricsList?.map((metric) => {
          return {
            value: metric.id,
            label: metric.name,
          };
        })}
      />
    </div>
  );
};
export default DashboardHeader;
