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
import { AuthData, Token } from "../../api/interface";
import { authUser } from "../../api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { authActions } from "../../store/AuthSlice";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationType = "success" | "error";

const Authorization: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    type: NotificationType
  ) => {
    if (type === "success") {
      api[type]({
        type: "success",
        message: "Успешная авторизация!",
        duration: 6,
        placement,
      });
    } else {
      api[type]({
        type: "error",
        message: "Неверный логин или пароль",
        duration: 6,
        placement,
      });
    }
  };
  const onFinish = async (values: AuthData) => {
    try {
      const tokens: Token = await authUser(values);

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);

      dispatch(authActions.login());
      openNotification("top", "success");
      setTimeout(() => {
        navigator("/");
      }, 2000);
    } catch (error: any) {
      if (error.response.status >= 500) {
        alert("Ошибка со стороны сервера, попробуйте позже.");
        return;
      }
      if (error.response.status === 401) {
        openNotification("top", "error");
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
