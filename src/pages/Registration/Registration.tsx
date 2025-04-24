import { Button, Checkbox, Form, Input, Flex, Select } from "antd";
import classes from "./Registration.module.css";
import authImage from "../../assets/images/illustration.png";
import { Link } from "react-router-dom";

const { Option } = Select;

const Registration: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="375">+375</Option>
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className={classes.layout}>
      <img className={classes.image} src={authImage} alt="" />
      <section className={classes.form}>
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
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Please input your Login!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Повторите пароль"
            name="password2"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
            или <Link to="/">Авторизоваться сейчас</Link>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Registration;
