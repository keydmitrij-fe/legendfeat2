import {
  Button,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Typography,
} from "antd";
import { Roles, User } from "../../types/usersTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { userActions } from "../../store/adminSlice";
import { getUserData } from "../../store/usersAction";
import {
  userFiltersActions,
  userRolesActions,
  usersModalActions,
} from "../../store/usersSlice";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightOutlined,
  DeleteFilled,
  LockFilled,
  MinusCircleFilled,
  PlusCircleFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { FilterValue, SorterResult } from "antd/es/table/interface";

const { Text } = Typography;

const TableUsers: React.FC = () => {
  const filters = useSelector((state: RootState) => state.userFilters);
  const profileRoles = useSelector((state: RootState) => state.profile.roles);
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
      total: users.meta.totalAmount,
      showSizeChanger: false,
    },
  });

  const showModal = useCallback(
    (
      type: "delete" | "block" | "unblock" | "addRoles" | "deleteRoles",
      id: number
    ) => {
      dispatch(usersModalActions.setSelectedUserId(id));
      dispatch(usersModalActions.setIsModalOpen(type));
    },
    [dispatch]
  );

  const handleTableChange = async (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    const current = pagination.current;
    if (typeof current === "number") {
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, current },
      }));
      dispatch(userFiltersActions.setFilterOffset(current - 1));
    }

    if (!Array.isArray(sorter) && typeof sorter.field === "string") {
      let order: "asc" | "desc" | undefined;
      if (sorter.order === "ascend") {
        order = "asc";
      } else {
        order = "desc";
      }
      dispatch(userFiltersActions.setSortBy(sorter.field));
      dispatch(userFiltersActions.setSortOrder(order));
    } else {
      dispatch(userFiltersActions.setSortBy(undefined));
      dispatch(userFiltersActions.setSortOrder(undefined));
    }
  };

  const handleToUserProfile = useCallback(
    async (id: number) => {
      const userData = await dispatch(getUserData(id)).unwrap();
      dispatch(userActions.setUserProfileData(userData));
      dispatch(
        userFiltersActions.setFilterOffset(tableParams.pagination.current - 1)
      );
      navigate(`/users/${id}`);
    },
    [tableParams.pagination, navigate, dispatch]
  );

  const handleOpenRolesModal = useCallback(
    (roles: Roles[], record: any) => {
      const allRoles = Object.values(Roles);
      const missingRoles = allRoles.filter((role) => !roles.includes(role));
      dispatch(userRolesActions.setAvailableUserRoles(missingRoles));
      dispatch(userRolesActions.setNewUserRoles(roles));
      showModal("addRoles", record.id);
    },
    [dispatch, showModal]
  );

  const handleOpenDeleteRolesModal = useCallback(
    (roles: Roles[], record: any) => {
      dispatch(userRolesActions.setAvailableUserRoles(roles));
      dispatch(userRolesActions.setNewUserRoles(roles));
      showModal("deleteRoles", record.id);
    },
    [dispatch, showModal]
  );
  const getColumns = useMemo(() => {
    const columns: TableProps<User>["columns"] = [
      {
        title: "Перейти к профилю",
        dataIndex: "id",
        key: "id",
        render: (id) => {
          return (
            <Tooltip title="Перейти к профилю">
              <Button
                color="primary"
                variant="solid"
                onClick={() => handleToUserProfile(id)}
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
        sorter: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: true,
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
              {record.isBlocked && profileRoles.includes("ADMIN") && (
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
    ];
    if (profileRoles.includes("ADMIN")) {
      columns.push({
        title: "Управление ролями",
        dataIndex: "roles",
        key: "roles",
        render: (roles, record) => {
          return (
            <>
              <Tooltip title="Добавить роль">
                <Button
                  onClick={() => handleOpenRolesModal(roles, record)}
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
                  onClick={() => handleOpenDeleteRolesModal(roles, record)}
                >
                  <MinusCircleFilled />
                </Button>
              </Tooltip>
            </>
          );
        },
      });
    }
    columns.push({
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    });
    if (profileRoles.includes("ADMIN")) {
      columns.push({
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
      });
    }
    return columns;
  }, [
    showModal,
    handleOpenDeleteRolesModal,
    handleOpenRolesModal,
    handleToUserProfile,
    profileRoles,
  ]);

  useEffect(() => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: users.meta.totalAmount,
      },
    }));
  }, [users.meta.totalAmount]);
  return (
    <>
      <Table<User>
        key={filters.offset}
        style={{ maxWidth: "100%" }}
        columns={getColumns}
        dataSource={users.data}
        rowKey="id"
        onChange={handleTableChange}
        pagination={users.meta.totalAmount > 20 && tableParams.pagination}
      />
    </>
  );
};

export default TableUsers;
