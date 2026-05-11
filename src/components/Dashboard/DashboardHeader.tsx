import { DatePicker, DatePickerProps, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { use, useEffect, useState } from "react";
import { fetchMetrics, fetchRestaurants } from "./mocks";
import { useQuery } from "@tanstack/react-query";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import { DashboardDataRequest } from "../../types/dashboardTypes";

interface Props {
  selectRestaurant: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectMetrics: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  selectDate: React.Dispatch<
    React.SetStateAction<
      Pick<DashboardDataRequest, "dateEnd" | "dateStart"> | undefined
    >
  >;
}

const DashboardHeader: React.FC<Props> = ({
  selectDate,
  selectMetrics,
  selectRestaurant,
}) => {
  const [restaurantSelectValue, setRestaurantSelectValue] =
    useState<string>("");
  const { RangePicker } = DatePicker;

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
          const formattedDateStart = new Date(dateString[0]).toISOString();
          const formattedDateEnd = new Date(dateString[1]).toISOString();
          selectDate({
            dateStart: formattedDateStart,
            dateEnd: formattedDateEnd,
          });
        }}
      />
      <Select
        filterOption={false}
        loading={restaurantListIsLoading}
        placeholder="Ресторан"
        showSearch
        onChange={(id) => selectRestaurant(Number(id))}
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
        onChange={selectMetrics}
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
