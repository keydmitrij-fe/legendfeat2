import { Button, Form, Input, Modal, Typography, Image } from "antd";
import logo from "../../assets/logo.png";
import classes from "./Registration.module.css";
import authImage from "../../assets/images/illustration.png";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";
import { UserRegistration } from "../../api/interface";
import { useState } from "react";
import {
  MAXIMAL_LOGIN_LENGTH,
  MAXIMAL_PASSWORD_LENGTH,
  MAXIMAL_USERNAME_LENGTH,
  MINIMAL_LOGIN_LENGTH,
  MINIMAL_PASSWORD_LENGTH,
  MINIMAL_USERNAME_LENGTH,
} from "../../constants/constants";

const { Title } = Typography;

const Registration: React.FC = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: UserRegistration) => {
    try {
      await registerUser(values);
      showModal();
    } catch (error: any) {
      if (error.response.status >= 500) {
        alert("Ошибка со стороны сервера, попробуйте позже.");
      }
      if (error.response.status === 409) {
        showErrorModal();
      }
      console.log(error);
    }
  };

  const showModal = () => {
    setIsSuccessModalOpen(true);
  };

  const handleOk = () => {
    setIsSuccessModalOpen(false);
    navigate("/auth");
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
    <div className={classes.layout}>
      <img className={classes.image} src={authImage} alt="" />
      <section className={classes.form}>
        <div className={classes.logoContainer}>
          <Image preview={false} width={50} src={logo} />
        </div>
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
                message: "Имя пользователя должно быть от 1 до 60 символов",
              },
              {
                pattern: /[A-Za-zА-Яа-яЁё]/,
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
                message: "Логин должен быть от 2 до 60 символов",
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
                message: "Пароль должен содержать от 6 до 60 символов",
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
                pattern: /[0-9]{11,12}/,
                message:
                  "Пожалуйста, введите подходящий номер телефона в формате '375xxxxxxxxx' или '7xxxxxxxxxx'",
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
          Уже есть аккаунт? <Link to="/auth">Авторизоваться</Link>
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
          Ошибка: пользователь с таким логином уже существует. Хотите исправить
          данные?
        </Modal>
      </section>
    </div>
  );
};

export default Registration;
