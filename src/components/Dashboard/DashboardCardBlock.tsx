import { Card } from "antd";
import { DashboardDataResponse } from "../../types/dashboardTypes";

interface Props {
  metrics: DashboardDataResponse[];
}

const DashboardCardBlock: React.FC<Props> = ({ metrics }) => {
  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <p>{metric.name}</p>
          <p>{metric.value}</p>
        </Card>
      ))}
    </>
  );
};
export default DashboardCardBlock;
