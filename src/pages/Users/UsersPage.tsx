import React, { useCallback, useEffect } from "react";
import { Button, Flex, Form, FormProps, Input, Select, Tooltip } from "antd";
import { UserFilters } from "../../types/usersTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { userFiltersActions, usersActions } from "../../store/usersSlice";
import { getUsersData } from "../../store/usersAction";
import { authActions, profileActions } from "../../store/AuthSlice";
import axios from "axios";
import { removeTokens } from "../../store/authAction";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import UsersModal from "../../components/UsersModal/UsersModal";
import TableUsers from "../../components/TableUsers/TableUsers";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const filters = useSelector((state: RootState) => state.userFilters);
  const profileRoles = useSelector((state: RootState) => state.profile.roles);
  const [form] = Form.useForm();

  const handleSubmitSearch: FormProps<UserFilters>["onFinish"] = useCallback(
    async (value: any) => {
      dispatch(userFiltersActions.setFilterSearchUser(value.search));
    },
    [dispatch]
  );

  const handleChangeSelect = (value: string | undefined) => {
    switch (value) {
      case "all": {
        return dispatch(userFiltersActions.setIsBlockFilter(undefined));
      }
      case "blocked": {
        return dispatch(userFiltersActions.setIsBlockFilter(true));
      }
      case "active": {
        return dispatch(userFiltersActions.setIsBlockFilter(false));
      }
    }
  };

  useEffect(() => {
    const initUsers = async () => {
      try {
        const usersData = await dispatch(getUsersData(filters)).unwrap();
        dispatch(usersActions.setUsersData(usersData));
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          dispatch(authActions.logout());
          dispatch(profileActions.clearProfileData());
          dispatch(usersActions.clearUsersData());
          dispatch(userFiltersActions.resetFilters());
          removeTokens();
          navigate("/auth/login");
        }
      }
    };
    initUsers();
  }, [dispatch, navigate, filters]);

  return (
    <>
      <Flex justify="space-between">
        <Form
          form={form}
          style={{ display: "flex" }}
          onFinish={handleSubmitSearch}
        >
          <Form.Item name="search">
            <Input
              style={{ width: "20rem" }}
              placeholder="Введите имя пользователя или email"
            />
          </Form.Item>
          <Form.Item>
            <Tooltip title="Поиск пользователей">
              <Button htmlType="submit">
                <SearchOutlined />
              </Button>
            </Tooltip>
          </Form.Item>
        </Form>
        {profileRoles.includes("ADMIN") && (
          <Select
            defaultValue="all"
            onChange={handleChangeSelect}
            style={{ width: "16rem" }}
            options={[
              { value: "all", label: "Все пользователи" },
              { value: "active", label: "Активные пользователи" },
              { value: "blocked", label: "Заблокированные пользователи" },
            ]}
          />
        )}
      </Flex>

      <TableUsers />
      <UsersModal />
    </>
  );
};
export default UsersPage;
