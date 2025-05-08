import { Layout } from "antd";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import { AppDispatch } from "../store";
import { isTokenExpired, refreshAccessToken, removeTokens } from "../util/auth";
import { Token } from "../api/interface";

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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tokens: Token = useLoaderData();

  useEffect(() => {
    if (!tokens.refreshToken || isTokenExpired(tokens.refreshToken)) {
      dispatch(authActions.logout());
      removeTokens();
      navigate("/auth");
      return;
    }
    if (!tokens.accessToken || isTokenExpired(tokens.accessToken)) {
      refreshAccessToken();
    }
    dispatch(authActions.login());
  }, [tokens, dispatch, navigate]);
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
