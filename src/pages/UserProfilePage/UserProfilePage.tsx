import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  NotificationArgsProps,
  Typography,
} from "antd";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../store/adminSlice";
import { useCallback, useEffect, useState } from "react";
import { UserRequest } from "../../types/usersTypes";
import { editUserData, getUserData } from "../../store/usersAction";
import {
  MAXIMAL_USERNAME_LENGTH,
  MINIMAL_USERNAME_LENGTH,
  REGULAR_PHONE_NUMBER,
  REGULAR_USER_NAME,
} from "../../constants/constants";

const { Paragraph } = Typography;

type NotificationPlacement = NotificationArgsProps["placement"];

const contentStyle: React.CSSProperties = {
  marginTop: "6rem",
  minHeight: 120,
  lineHeight: "120px",
  width: "30%",
  marginLeft: "30rem",
  color: "#fff",
  background: "#fff",
  flexDirection: "column",
};

const UserProfilePage: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userProfile);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { userId } = useParams();

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
    for (const key in value) {
      const typedKey = key as keyof UserRequest;
      if (value[typedKey] !== userData[typedKey]) {
        request[typedKey] = value[typedKey];
      }
    }
    const newUserData = await dispatch(
      editUserData({ id: userData.id, data: request })
    ).unwrap();
    dispatch(userActions.setUserProfileData(newUserData));
    setIsEdit(false);
    dispatch(getUserData(userData.id));
    form.resetFields();
  };

  useEffect(() => {
    const initUser = async () => {
      try {
        const id = Number(userId);
        const userData = await dispatch(getUserData(id)).unwrap();
        dispatch(userActions.setUserProfileData(userData));
      } catch (error: unknown) {
        openNotification("top", "Ошибка загрузки данных пользователя");
      }
    };
    initUser();
  }, [dispatch, userId, openNotification]);

  return (
    <>
      {contextHolder}
      {!isEdit && (
        <Flex style={contentStyle}>
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
        </Flex>
      )}
      {isEdit && (
        <Form form={form} onFinish={handleSubmit} style={contentStyle}>
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Номер телефона"
            name="phoneNumber"
            rules={[
              {
                pattern: REGULAR_PHONE_NUMBER,
                message:
                  "Пожалуйста, введите подходящий номер телефона в формате '+7XXXXXXXXXX' или '8XXXXXXXXXX'",
              },
            ]}
          >
            <Input />
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
      )}
    </>
  );
};

export default UserProfilePage;
