import { Card } from "antd";
import { DashboardDataResponse } from "../../types/dashboardTypes";

interface Props {
  metrics: DashboardDataResponse[];
}

const DashboardCardBlock: React.FC<Props> = ({ metrics }) => {
  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: 12,
        padding: "1rem",
        display: "flex",
        gap: "1rem",
      }}
    >
      {metrics.map((metric) => (
        <Card
          style={{ height: "250px", width: "250px", textAlign: "center" }}
          key={metric.id}
        >
          <p>{metric.name}</p>
          <p>{metric.value}</p>
        </Card>
      ))}
    </div>
  );
};
export default DashboardCardBlock;
