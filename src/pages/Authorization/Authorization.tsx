import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Flex,
  NotificationArgsProps,
  notification,
} from "antd";
import classes from "./Authorization.module.css";
import authImage from "../../assets/images/illustration.png";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthData } from "../../api/interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { authActions, profileActions } from "../../store/AuthSlice";
import { Typography } from "antd";
import axios from "axios";
import { useCallback } from "react";
import { getProfile, login, removeTokens } from "../../store/authAction";

const { Title, Paragraph } = Typography;

type NotificationPlacement = NotificationArgsProps["placement"];

const Authorization: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useCallback(
    (placement: NotificationPlacement, message: string) => {
      api.error({
        type: "error",
        message: message,
        duration: 6,
        placement,
      });
    },
    [api]
  );

  const getUserData = useCallback(async () => {
    try {
      const resData = await dispatch(getProfile()).unwrap();
      dispatch(profileActions.setProfileData(resData));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status !== undefined && status >= 500) {
          removeTokens();
          dispatch(authActions.logout());
          openNotification("top", "Ошибка на сервере, попробуйте позже.");
        }
      }
    }
  }, [dispatch, openNotification]);

  const onFinish = async (values: AuthData) => {
    try {
      await dispatch(login(values)).unwrap();
      dispatch(authActions.login());
      await getUserData();
      navigator("/");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "status" in error) {
        const status = error.status;

        if (status === 401) {
          openNotification("top", "Неверный логин или пароль");
        } else if (status && status === 500) {
          openNotification(
            "top",
            "Ошибка со стороны сервера, попробуйте позже."
          );
          return;
        }
      }
    }
  };
  return (
    <>
      {contextHolder}
      <div className={classes.layout}>
        <Image
          preview={false}
          style={{ maxHeight: "100vh" }}
          src={authImage}
          alt=""
        />
        <section className={classes.form}>
          <div className={classes.logoContainer}>
            <Image preview={false} width={50} src={logo} />
          </div>
          <Title level={2}>Войдите в свой аккаунт</Title>
          <Paragraph type="secondary" style={{ marginBottom: "2.5rem" }}>
            Посмотрите, что происходит с вашим бизнесом
          </Paragraph>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360, height: "300px" }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="login"
              label="Логин"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите логин",
                },
              ]}
            >
              <Input placeholder="Логин" />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль" },
              ]}
            >
              <Input type="password" placeholder="**********" />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Link to="">Забыли пароль</Link>
              </Flex>
            </Form.Item>
            <Form.Item style={{ marginBottom: "17rem" }}>
              <Button block type="primary" htmlType="submit">
                Авторизоваться
              </Button>
            </Form.Item>
            Ещё нет аккаунта?{" "}
            <Link to="/auth/registration">Зарегистрироваться</Link>
          </Form>
        </section>
      </div>
    </>
  );
};
export default Authorization;
