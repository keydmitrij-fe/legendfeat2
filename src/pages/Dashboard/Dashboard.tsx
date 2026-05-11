import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCardBlock from "../../components/Dashboard/DashboardCardBlock";
import { useQuery } from "@tanstack/react-query";
import { fetchMockDashboardData } from "../../components/Dashboard/mocks";
import { DashboardDataRequest } from "../../types/dashboardTypes";
import { Metric } from "web-vitals";

type DateRange = Pick<DashboardDataRequest, "dateEnd" | "dateStart">;

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number>();
  const [selectedMetricsIds, setSelectedMetricsIds] =
    useState<Metric["id"][]>();
  const [isShowData, setIsShowData] = useState<boolean>(false);

  const isAllFiltersEntered =
    dateRange && selectedMetricsIds && selectedRestaurantId;

  const { data: metricData, isLoading } = useQuery({
    queryKey: [
      "metricData",
      dateRange,
      selectedMetricsIds,
      selectedRestaurantId,
    ],
    enabled: !!isAllFiltersEntered,
    queryFn: () => {
      if (isAllFiltersEntered) {
        return fetchMockDashboardData({
          dateEnd: dateRange.dateEnd,
          dateStart: dateRange.dateStart,
          metricIds: selectedMetricsIds,
          restaurantId: selectedRestaurantId,
        });
      }
    },
  });

  return (
    <div style={{ color: "black" }}>
      <DashboardHeader
        selectDate={setDateRange}
        selectMetrics={setSelectedMetricsIds}
        selectRestaurant={setSelectedRestaurantId}
      />
      <button
        disabled={!isAllFiltersEntered}
        onClick={() => setIsShowData(true)}
      >
        Отобразить
      </button>
      {metricData && isShowData && <DashboardCardBlock metrics={metricData} />}
    </div>
  );
};
export default DashboardPage;
