import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Flex, Input, notification, NotificationArgsProps, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { userFiltersActions, usersActions } from "../../store/usersSlice";
import { getUsersData } from "../../store/usersAction";
import { useNavigate } from "react-router-dom";
import UsersModal from "../../components/UsersModal/UsersModal";
import TableUsers from "../../components/TableUsers/TableUsers";

type NotificationPlacement = NotificationArgsProps["placement"];

const UsersPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const filters = useSelector((state: RootState) => state.userFilters);
  const profileRoles = useSelector((state: RootState) => state.profile.roles);
  const searchText = useSelector(
    (state: RootState) => state.userFilters.search
  );
  const [localSearchText, setLocalSearchText] = useState<string>(
    searchText ?? ""
  );

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

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(event.target.value);
  };

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
    setLocalSearchText(searchText ?? "");
  }, [searchText]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(userFiltersActions.setFilterSearchUser(localSearchText));
    }, 800);

    return () => clearTimeout(timeout);
  }, [dispatch, localSearchText]);

  useEffect(() => {
    const initUsers = async () => {
      try {
        const usersData = await dispatch(getUsersData(filters)).unwrap();
        dispatch(usersActions.setUsersData(usersData));
      } catch (error: unknown) {
        openNotification("top", "Ошибка загрузки пользователей");
      }
    };
    initUsers();
  }, [dispatch, navigate, filters, openNotification]);

  return (
    <>
      {contextHolder}
      <Flex justify="space-between">
        <Input
          name="search"
          value={localSearchText}
          onChange={handleChangeSearch}
          style={{ width: "20rem", marginLeft: "40rem", marginBottom: "1rem" }}
          placeholder="Введите имя пользователя или email"
        />
        {profileRoles.includes("ADMIN") && (
          <Select
            value={
              (filters.isBlocked === true && "blocked") ||
              (filters.isBlocked === false && "active") ||
              "all"
            }
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
