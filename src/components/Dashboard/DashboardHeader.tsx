import { DatePicker, DatePickerProps, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { useEffect, useState } from "react";
import { fetchRestaurants } from "./mocks";
import { useQuery } from "@tanstack/react-query";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

const DashboardHeader: React.FC = () => {
  const [restaurantSelectValue, setRestaurantSelectValue] =
    useState<string>("");
  const { RangePicker } = DatePicker;
  const [metrics, setMetrics] = useState<string[]>(["Ava Swift"]);
  const [selectedDateRange, setSelectedDateRange] = useState<string[]>([
    "Ava Swift",
  ]);

  const { data: restaurantList, isLoading: restaurantListIsLoading } = useQuery(
    {
      queryKey: ["restaurantList", restaurantSelectValue],
      queryFn: () => fetchRestaurants({ search: restaurantSelectValue }),
    },
  );

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
  ) => {
    console.log("onOk: ", value);
  };

  return (
    <div>
      <RangePicker
        onChange={(dayjsDate, dateString) => {
          console.log("Formatted Selected Time: ", dateString);
        }}
        onOk={onOk}
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
        style={{ width: 120 }}
        onChange={setMetrics}
        placeholder="Метрики"
        options={[
          { value: "1", label: "Метрика 1" },
          { value: "2", label: "Метрика 2" },
        ]}
      />
    </div>
  );
};
export default DashboardHeader;
