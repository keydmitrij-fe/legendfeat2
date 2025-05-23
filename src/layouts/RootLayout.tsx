import { Layout, Spin } from "antd";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SiderMenu from "../components/Menu/Menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, profileActions } from "../store/AuthSlice";
import { AppDispatch, RootState } from "../store";
import { tokenUtil } from "../components/TokenUtil/tokenUtil";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { getProfile, refreshToken, removeTokens } from "../store/authAction";

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
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isInitAuthEnded = useSelector(
    (state: RootState) => state.auth.isInitAuthEnded
  );

  useEffect(() => {
    const initAuth = async () => {
      if (!localStorage.getItem("refreshToken")) {
        dispatch(authActions.logout());
        removeTokens();
        navigate("/auth");
        return;
      }

      if (!tokenUtil.getAccessToken()) {
        try {
          await dispatch(refreshToken());
          if (!tokenUtil.getAccessToken())
            throw new Error("Ошибка обновления токена");
        } catch (error: unknown) {
          dispatch(authActions.logout());
          removeTokens();
          navigate("/auth");
          return;
        }
      }

      try {
        const profileData = await dispatch(getProfile()).unwrap();
        dispatch(profileActions.setProfileData(profileData));
        dispatch(authActions.login());
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          dispatch(authActions.logout());
          dispatch(profileActions.clearProfileData());
          removeTokens();
          navigate("/auth");
        }
      } finally {
        dispatch(authActions.setInitAuthEnded());
      }
    };

    initAuth();
  }, [dispatch, navigate]);
  if (!isInitAuthEnded) {
    return (
      <Spin
        fullscreen
        indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />}
      />
    );
  }
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  return (
    <>
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          <SiderMenu />
        </Sider>
        <Layout style={layoutStyle}>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default RootLayout;
