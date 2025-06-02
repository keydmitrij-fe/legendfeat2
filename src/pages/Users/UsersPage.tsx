import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  notification,
  NotificationArgsProps,
  Table,
  Tooltip,
} from "antd";
import { TableProps, Typography } from "antd";
import {
  Roles,
  User,
  UserFilters,
  UserRolesRequest,
} from "../../types/usersTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { usersActions, usersModalActions } from "../../store/usersSlice";
import {
  blockUserProfile,
  deleteUserProfile,
  editUserRoles,
  getUserData,
  getUsersData,
  unblockUserProfile,
} from "../../store/usersAction";
import { authActions, profileActions } from "../../store/AuthSlice";
import axios from "axios";
import { removeTokens } from "../../store/authAction";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/adminSlice";
import {
  ArrowRightOutlined,
  DeleteFilled,
  LockFilled,
  MinusCircleFilled,
  PlusCircleFilled,
  SearchOutlined,
  UnlockFilled,
} from "@ant-design/icons";

const { Text } = Typography;
type NotificationPlacement = NotificationArgsProps["placement"];

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users);
  const usersModal = useSelector((state: RootState) => state.usersModal);
  // const [isActionModalOpen, setIsActionModalOpen] = useState<
  //   "delete" | "block" | "unblock" | "addRoles" | "deleteRoles" | null
  // >(null);
  // const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [availableRoles, setAvailableRoles] = useState<Roles[] | null>(null);
  const [newRoles, setNewRoles] = useState<Roles[]>();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
      total: users.meta.totalAmount,
      showSizeChanger: false,
    },
  });
  const [filters, setFilters] = useState<UserFilters>({});

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

  const showModal = (
    type: "delete" | "block" | "unblock" | "addRoles" | "deleteRoles",
    id: number
  ) => {
    dispatch(usersModalActions.setSelectedUserId(id));
    dispatch(usersModalActions.setIsModalOpen(type));
  };
  const handleCancel = () => {
    dispatch(usersModalActions.resetModal());
  };
  const handleDeleteOk = async () => {
    await dispatch(deleteUserProfile(usersModal.selectedUserId));
    const users = await dispatch(getUsersData(filters)).unwrap();
    dispatch(usersActions.setUsersData(users));
    dispatch(usersModalActions.resetModal());
  };

  const handleBlockOk = async () => {
    await dispatch(blockUserProfile(usersModal.selectedUserId));
    const users = await dispatch(getUsersData(filters)).unwrap();
    dispatch(usersActions.setUsersData(users));
    dispatch(usersModalActions.resetModal());
  };

  const handleUnblockOk = async () => {
    await dispatch(unblockUserProfile(usersModal.selectedUserId));
    const users = await dispatch(getUsersData(filters)).unwrap();
    dispatch(usersActions.setUsersData(users));
    dispatch(usersModalActions.resetModal());
  };

  const handleEditRole = async () => {
    if (!newRoles?.length) {
      openNotification(
        "top",
        "У пользователя должна быть как минимум одна роль"
      );
      return;
    }
    const request: UserRolesRequest = {
      roles: [...newRoles],
    };
    await dispatch(
      editUserRoles({ id: usersModal.selectedUserId, roles: request })
    );
    const users = await dispatch(getUsersData(filters)).unwrap();
    dispatch(usersActions.setUsersData(users));
    dispatch(usersModalActions.resetModal());

    setNewRoles([]);
    setAvailableRoles(null);
  };

  const handleOk = async () => {
    switch (usersModal.isModalOpen) {
      case "delete":
        return handleDeleteOk();
      case "block":
        return handleBlockOk();
      case "unblock":
        return handleUnblockOk();
      case "addRoles":
        return handleEditRole();
      case "deleteRoles":
        return handleEditRole();
    }
  };

  const handleSubmitSearch: FormProps<UserFilters>["onFinish"] = useCallback(
    async (value: any) => {
      const userFilters: UserFilters = {
        search: value.search,
      };
      setFilters(userFilters);
      const users = await dispatch(getUsersData(userFilters)).unwrap();
      dispatch(usersActions.setUsersData(users));
    },
    [dispatch]
  );

  const handleTableChange = (pagination: any) => {
    setTableParams((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, current: pagination.current },
    }));
    setFilters((prev) => ({ ...prev, offset: pagination.current - 1 }));
  };

  const columns = useMemo<TableProps<User>["columns"]>(
    () => [
      {
        title: "Перейти к профилю",
        dataIndex: "id",
        key: "id",
        render: (id) => {
          const handleToUserProfile = async () => {
            const userData = await dispatch(getUserData(id)).unwrap();
            dispatch(userActions.setUserProfileData(userData));
            navigate("/user");
          };
          return (
            <Tooltip title="Перейти к профилю">
              <Button
                color="primary"
                variant="solid"
                onClick={handleToUserProfile}
              >
                <ArrowRightOutlined />
              </Button>
            </Tooltip>
          );
        },
      },
      {
        title: "Имя пользователя",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Дата регистрации",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Статус блокировки",
        dataIndex: "isBlocked",
        key: "isBlocked",
        render: (status) => {
          return status && <Text type="danger">Заблокирован</Text>;
        },
      },
      {
        title: "",
        dataIndex: "id",
        key: "actionBlockUnblock",
        render: (id, record) => {
          return (
            <>
              {record.isBlocked && (
                <Tooltip title="Разблокировать">
                  <Button
                    color="green"
                    variant="solid"
                    onClick={() => showModal("unblock", id)}
                  >
                    <UnlockFilled />
                  </Button>
                </Tooltip>
              )}
              {!record.isBlocked && (
                <Tooltip title="Заблокировать">
                  <Button
                    color="danger"
                    variant="solid"
                    onClick={() => showModal("block", id)}
                  >
                    <LockFilled />
                  </Button>
                </Tooltip>
              )}
            </>
          );
        },
      },
      {
        title: "Роли",
        dataIndex: "roles",
        key: "roles",
        render: (roles) => {
          if (!roles) {
            return <>Нет ролей</>;
          }
          return <Text>{roles.join(", ")}</Text>;
        },
      },
      {
        title: "Управление ролями",
        dataIndex: "roles",
        key: "roles",
        render: (roles, record) => {
          const handleOpenRolesModal = () => {
            const allRoles = Object.values(Roles);
            const missingRoles = allRoles.filter(
              (role) => !roles.includes(role)
            );
            setAvailableRoles(missingRoles);
            setNewRoles(roles);
            showModal("addRoles", record.id);
          };
          const handleOpenDeleteRolesModal = () => {
            setAvailableRoles(roles);
            setNewRoles(roles);
            showModal("deleteRoles", record.id);
          };

          return (
            <>
              <Tooltip title="Добавить роль">
                <Button
                  onClick={handleOpenRolesModal}
                  color="blue"
                  variant="solid"
                >
                  <PlusCircleFilled />
                </Button>
              </Tooltip>
              <Tooltip title="Удалить роль">
                <Button
                  color="danger"
                  variant="solid"
                  onClick={handleOpenDeleteRolesModal}
                >
                  <MinusCircleFilled />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
      {
        title: "Номер телефона",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: "Удалить",
        dataIndex: "id",
        key: "delete",
        render: (id) => {
          return (
            <Tooltip title="Удалить пользователя">
              <Button
                color="danger"
                variant="solid"
                onClick={() => showModal("delete", id)}
              >
                <DeleteFilled />
              </Button>
            </Tooltip>
          );
        },
      },
    ],
    [dispatch, navigate]
  );

  useEffect(() => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: users.meta.totalAmount,
      },
    }));
  }, [users.meta.totalAmount]);

  useEffect(() => {
    const initUsers = async () => {
      try {
        const userFilters: UserFilters = {
          ...filters,
          offset: tableParams.pagination.current - 1,
        };
        const usersData = await dispatch(getUsersData(userFilters)).unwrap();
        dispatch(usersActions.setUsersData(usersData));
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          dispatch(authActions.logout());
          dispatch(profileActions.clearProfileData());
          removeTokens();
          navigate("/auth/login");
        }
      }
    };
    initUsers();
  }, [dispatch, navigate, tableParams.pagination, filters]);

  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={handleSubmitSearch}>
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
      <Table<User>
        style={{ maxWidth: "100%" }}
        columns={columns}
        dataSource={users.data}
        rowKey="id"
        onChange={handleTableChange}
        pagination={users.meta.totalAmount > 20 && tableParams.pagination}
      />
      <Modal
        key={usersModal.isModalOpen}
        cancelText="Отмена"
        okText="Подтвердить"
        open={usersModal.isModalOpen !== null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {usersModal.isModalOpen === "delete" &&
          "Вы действительно хотите удалить данного пользователя?"}
        {usersModal.isModalOpen === "block" &&
          "Вы действительно хотите заблокировать данного пользователя?"}
        {usersModal.isModalOpen === "unblock" &&
          "Вы действительно хотите разблокировать данного пользователя?"}
        {usersModal.isModalOpen === "addRoles" && availableRoles?.length && (
          <>
            Выберите роль для добавления:
            {availableRoles.map((role) => (
              <Button
                key={role}
                onClick={() => setNewRoles((prev) => [...(prev || []), role])}
                disabled={newRoles?.includes(role)}
              >
                {role}
              </Button>
            ))}
            {newRoles?.length && (
              <div style={{ marginTop: 12 }}>
                <Text strong>Итоговые роли: </Text>
                {newRoles.join(", ")}
              </div>
            )}
          </>
        )}
        {usersModal.isModalOpen === "addRoles" && !availableRoles?.length && (
          <Text>Все возможные роли уже добавлены</Text>
        )}
        {usersModal.isModalOpen === "deleteRoles" && availableRoles?.length && (
          <>
            Выберите роль для удаления:{"  "}
            {availableRoles.map((role) => (
              <Button
                key={role}
                onClick={() =>
                  setNewRoles((prev) => [
                    ...(prev || []).filter((r) => r !== role),
                  ])
                }
                disabled={!newRoles?.includes(role)}
              >
                {role}
              </Button>
            ))}
            {newRoles?.length && (
              <div style={{ marginTop: 12 }}>
                <Text strong>Итоговые роли: </Text>
                {newRoles.join(", ")}
              </div>
            )}
            {!newRoles?.length && (
              <div>
                <Text type="secondary">
                  У пользователя должна быть хотя-бы одна роль
                </Text>
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default UsersPage;
