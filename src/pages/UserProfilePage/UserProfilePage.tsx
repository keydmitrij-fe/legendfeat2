import { Button, Form, FormProps, Input, Layout, Typography } from "antd";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/adminSlice";
import { useState } from "react";
import { UserRequest } from "../../types/usersTypes";
import { editUserData, getUserData } from "../../store/usersAction";
import {
  MAXIMAL_USERNAME_LENGTH,
  MINIMAL_USERNAME_LENGTH,
} from "../../constants/constants";

type LayoutType = Parameters<typeof Form>[0]["layout"];
const { Paragraph } = Typography;

const contentStyle: React.CSSProperties = {
  marginTop: "6rem",
  minHeight: 120,
  lineHeight: "120px",
  width: "30%",
  marginLeft: "30rem",
  color: "#fff",
  background: "#fff",
};

const UserProfilePage: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const handleBack = () => {
    navigate("/users");
    dispatch(userActions.clearUserProfileData());
  };
  const handleEdit = () => {
    setIsEdit(true);
    form.setFieldsValue(userData);
  };
  const handleCancelChanges = () => {
    setIsEdit(false);
  };
  const handleSubmit: FormProps<UserRequest>["onFinish"] = async (value) => {
    const request: UserRequest = {};
    if (value.username !== userData.username) {
      request.username = value.username;
    }
    if (value.email !== userData.email) {
      request.email = value.email;
    }
    if (value.phoneNumber !== userData.phoneNumber) {
      request.phoneNumber = value.phoneNumber;
    }
    const newUserData = await dispatch(
      editUserData({ id: userData.id, data: request })
    ).unwrap();
    dispatch(userActions.setUserProfileData(newUserData));
    setIsEdit(false);
    dispatch(getUserData(userData.id));
    form.resetFields();
  };

  return (
    <>
      {!isEdit && (
        <Layout style={contentStyle}>
          <Paragraph>Имя пользователя: {userData.username}</Paragraph>
          <Paragraph>Email: {userData.email}</Paragraph>
          {!userData.phoneNumber && (
            <Paragraph>Номер телефона не указан</Paragraph>
          )}
          {userData.phoneNumber && (
            <Paragraph>Номер телефона: {userData.phoneNumber}</Paragraph>
          )}
          <Button onClick={handleEdit}>Редактировать</Button>
          <Button onClick={handleBack}>Вернуться</Button>
        </Layout>
      )}
      {isEdit && (
        <Layout style={contentStyle}>
          <Form
            layout={formLayout}
            form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
            onFinish={handleSubmit}
            style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
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
                  pattern: /[A-Za-zА-Яа-яЁё]/,
                  message:
                    "Допустимы только символы русского и латинского алфавитов",
                },
              ]}
            >
              <Input value={userData.username} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
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
              <Input value={userData.email} />
            </Form.Item>
            <Form.Item
              label="Номер телефона"
              name="phoneNumber"
              rules={[
                {
                  pattern: /^(\+7|8)\d{10}$/,
                  message:
                    "Пожалуйста, введите подходящий номер телефона в формате '+7XXXXXXXXXX' или '8XXXXXXXXXX'",
                },
              ]}
            >
              <Input value={userData.phoneNumber} />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleCancelChanges} type="primary">
                Отменить редактирование
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Layout>
      )}
    </>
  );
};

export default UserProfilePage;
