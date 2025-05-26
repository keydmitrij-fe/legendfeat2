import { Button, notification, NotificationArgsProps, Typography } from "antd";
import { logoutUser } from "../../api/authApi";
import { Profile } from "../../types/authTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { authActions, profileActions } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeTokens } from "../../store/authAction";
type NotificationPlacement = NotificationArgsProps["placement"];
const { Title, Paragraph } = Typography;

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userData: Profile = useSelector((state: RootState) => state.profile);
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeTokens();
      dispatch(profileActions.clearProfileData());
      dispatch(authActions.logout());
      navigate("/auth/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status !== undefined && status >= 500)
          openNotification("top", "Ошибка на сервере, попробуйте позже.");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Title>Привет</Title>
      <Paragraph>Имя пользователя: {userData.username}</Paragraph>
      <Paragraph>Email: {userData.email}</Paragraph>
      {!userData.phoneNumber && <Paragraph>Номер телефона не указан</Paragraph>}
      {userData?.phoneNumber && (
        <Paragraph>Номер телефона: {userData.phoneNumber}</Paragraph>
      )}
      <Button onClick={handleLogout}>Выход из аккаунта</Button>
    </>
  );
};

export default ProfilePage;
