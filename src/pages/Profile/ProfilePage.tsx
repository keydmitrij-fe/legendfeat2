import { Button, Typography } from "antd";
import { getUserProfile, logoutUser } from "../../api/authApi";
import { useCallback, useEffect, useState } from "react";
import { Profile } from "../../api/interface";
import { removeTokens } from "../../util/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { authActions } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Title, Paragraph } = Typography;

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<Profile>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  dispatch(authActions.login());

  const getUserData = useCallback(async () => {
    try {
      const resData = await getUserProfile();
      setUserData(resData);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status !== undefined && status >= 500) {
          removeTokens();
          dispatch(authActions.logout());
          alert("Ошибка на сервере, попробуйте позже.");
        }
      }
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeTokens();
      dispatch(authActions.logout());
      navigate("/auth");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status !== undefined && status >= 500)
          alert("Ошибка на сервере сервера, попробуйте позже.");
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <Title>Привет</Title>
      <Paragraph>Имя пользователя: {userData?.username}</Paragraph>
      <Paragraph>Email: {userData?.email}</Paragraph>
      {!userData?.phoneNumber && (
        <Paragraph>Номер телефона не указан</Paragraph>
      )}
      {userData?.phoneNumber && (
        <Paragraph>Номер телефона: {userData?.phoneNumber}</Paragraph>
      )}
      <Button onClick={handleLogout}>Выход из аккаунта</Button>
    </>
  );
};

export default ProfilePage;
