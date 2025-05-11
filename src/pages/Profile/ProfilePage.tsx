import { Button, Typography } from "antd";
import { getUserProfile, logoutUser } from "../../api/api";
import { useCallback, useEffect, useState } from "react";
import { Profile } from "../../api/interface";
import { removeTokens } from "../../util/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { authActions } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
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
    } catch (error: any) {
      if (error.response.status === 401) {
        removeTokens();
        dispatch(authActions.logout());
        navigate("/auth");
      } else {
        if (error.response.status >= 500) {
          alert("Ошибка со стороны сервера, попробуйте позже.");
        }
      }
    }
  }, [navigate, dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeTokens();
      dispatch(authActions.logout());
      navigate("/auth");
    } catch (error: any) {
      if (error.response.status >= 500) {
        alert("Ошибка со стороны сервера, попробуйте позже.");
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
