import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "12rem",
  minHeight: 120,
  marginLeft: "12rem",
  lineHeight: "120px",
  color: "#fff",
  background: "#fff",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "15rem",
  lineHeight: "120px",
  color: "#fff",
  background: "#fff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(70% - 8px)",
  maxWidth: "calc(70% - 8px)",
  background: "#fff",
};

const RootLayout: React.FC = () => {
  return (
    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>
        <Navigation />
      </Sider>
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
