import {
  Button,
  Form,
  Input,
  Modal,
  Typography,
  NotificationArgsProps,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import { UserRegistration } from "../../types/authTypes";
import { useState } from "react";
import {
  MAXIMAL_LOGIN_LENGTH,
  MAXIMAL_PASSWORD_LENGTH,
  MAXIMAL_USERNAME_LENGTH,
  MINIMAL_LOGIN_LENGTH,
  MINIMAL_PASSWORD_LENGTH,
  MINIMAL_USERNAME_LENGTH,
  REGULAR_PHONE_NUMBER,
  REGULAR_USER_NAME,
} from "../../constants/constants";
import axios from "axios";
type NotificationPlacement = NotificationArgsProps["placement"];

const { Title } = Typography;

const Registration: React.FC = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    message: string
  ) => {
    api.error({
      type: "error",
      message: message,
      duration: 6,
      placement,
    });
  };
  const onFinish = async (values: UserRegistration) => {
    try {
      await registerUser(values);
      showModal();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status !== undefined && status >= 500) {
          openNotification(
            "top",
            "Ошибка со стороны сервера, попробуйте позже."
          );
          return;
        }
        if (status === 409) {
          showErrorModal();
        }
      }
    }
  };

  const showModal = () => {
    setIsSuccessModalOpen(true);
  };

  const handleOk = () => {
    setIsSuccessModalOpen(false);
    navigate("/auth/login");
  };

  const handleCancel = () => {
    setIsSuccessModalOpen(false);
    form.resetFields();
  };

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const handleErrorOk = () => {
    setIsErrorModalOpen(false);
  };

  const handleErrorCancel = () => {
    setIsErrorModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Title style={{ marginBottom: "2.5rem" }} level={2}>
        Зарегистрируйте свой аккаунт
      </Title>
      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите имя пользователя",
            },
            {
              min: MINIMAL_USERNAME_LENGTH,
              max: MAXIMAL_USERNAME_LENGTH,
              message: `Имя пользователя должно быть от ${MINIMAL_USERNAME_LENGTH} до ${MAXIMAL_USERNAME_LENGTH} символов`,
            },
            {
              pattern: REGULAR_USER_NAME,
              message:
                "Допустимы только символы русского и латинского алфавитов",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Логин"
          name="login"
          rules={[
            { required: true, message: "Пожалуйста, введите логин" },
            {
              min: MINIMAL_LOGIN_LENGTH,
              max: MAXIMAL_LOGIN_LENGTH,
              message: `Логин должен быть от ${MINIMAL_LOGIN_LENGTH} до ${MAXIMAL_LOGIN_LENGTH} символов`,
            },
            {
              pattern: /[A-Za-z]/,
              message: "Допустимы только символы латинского алфавита",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите пароль" },
            {
              min: MINIMAL_PASSWORD_LENGTH,
              max: MAXIMAL_PASSWORD_LENGTH,
              message: `Пароль должен содержать от ${MINIMAL_PASSWORD_LENGTH} до ${MINIMAL_PASSWORD_LENGTH} символов`,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="repeatPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Пожалуйста, повторите пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Пароль должен совпадать с полем "Пароль"')
                );
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Введите подходящий E-mail",
            },
            {
              required: true,
              message: "Пожалуйста, введите E-mail",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Номер телефона"
          rules={[
            {
              pattern: REGULAR_PHONE_NUMBER,
              message:
                "Пожалуйста, введите подходящий номер телефона в формате '+7XXXXXXXXXX' или '8XXXXXXXXXX'",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item style={{ marginBottom: "4rem" }}>
          <Button block type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
        Уже есть аккаунт? <Link to="/auth/login">Авторизоваться</Link>
      </Form>
      <Modal
        cancelText="Закрыть"
        okText="Перейти"
        open={isSuccessModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Регистрация прошла успешно. Перейти на страницу авторизации?
      </Modal>
      <Modal
        cancelText="Нет"
        okText="Да"
        open={isErrorModalOpen}
        onOk={handleErrorOk}
        onCancel={handleErrorCancel}
      >
        Ошибка: пользователь с таким логином или почтой уже существует. Хотите
        исправить данные?
      </Modal>
    </>
  );
};

export default Registration;
