import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardCardBlock from "../../components/Dashboard/DashboardCardBlock";
import { useQuery } from "@tanstack/react-query";
import { fetchMockDashboardData } from "../../components/Dashboard/mocks";
import { DashboardDataRequest } from "../../types/dashboardTypes";

const DashboardPage: React.FC = () => {
  // const [metricData, setMetricData] = useState<object>({});
  const lastMonthFilter: DashboardDataRequest = {
    metricIds: ["revenue", "average_check"],
    restaurantId: 205,
    dateStart: "2026-04-01T00:00:00.000Z",
    dateEnd: "2026-04-30T23:59:59.999Z",
  };

  const { data: metricData, isLoading } = useQuery({
    queryKey: ["metricData"],
    queryFn: () => fetchMockDashboardData(lastMonthFilter),
  });

  return (
    <div style={{ color: "black" }}>
      {isLoading && <div>Loading</div>}

      <DashboardHeader></DashboardHeader>
      {!isLoading && (
        <DashboardCardBlock metrics={metricData!}></DashboardCardBlock>
      )}
    </div>
  );
};
export default DashboardPage;
