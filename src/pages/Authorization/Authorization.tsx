import { Button, Checkbox, Form, Input, Flex } from "antd";
import classes from "./Authorization.module.css";
import authImage from "../../assets/images/illustration.png";
import { Link } from "react-router-dom";

const Authorization: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className={classes.layout}>
      <img className={classes.image} src={authImage} alt="" />
      <section className={classes.form}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
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
            <Input placeholder="mail@abc.com" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="**********" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>
              <a href="">Забыли пароль</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Авторизоваться
            </Button>
            или <Link to="/registration">Зарегистрироваться</Link>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};
export default Authorization;
