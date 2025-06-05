import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  Button,
  Modal,
  notification,
  NotificationArgsProps,
  Typography,
} from "antd";
import {
  userRolesActions,
  usersActions,
  usersModalActions,
} from "../../store/usersSlice";
import { UserRolesRequest } from "../../types/usersTypes";
import {
  blockUserProfile,
  deleteUserProfile,
  editUserRoles,
  getUsersData,
  unblockUserProfile,
} from "../../store/usersAction";
import { useCallback } from "react";

const { Text } = Typography;
type NotificationPlacement = NotificationArgsProps["placement"];

const UsersModal: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch<AppDispatch>();
  const usersModal = useSelector((state: RootState) => state.usersModal);
  const filters = useSelector((state: RootState) => state.userFilters);
  const roles = useSelector((state: RootState) => state.userRoles);

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

  const handleOk = async () => {
    switch (usersModal.modalType) {
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
    if (!roles.newRoles?.length) {
      openNotification(
        "top",
        "У пользователя должна быть как минимум одна роль"
      );
      return;
    }
    const request: UserRolesRequest = {
      roles: [...roles.newRoles],
    };
    await dispatch(
      editUserRoles({ id: usersModal.selectedUserId, roles: request })
    );
    const users = await dispatch(getUsersData(filters)).unwrap();
    dispatch(usersActions.setUsersData(users));
    dispatch(usersModalActions.resetModal());

    dispatch(userRolesActions.setNewUserRoles(null));
    dispatch(userRolesActions.setAvailableUserRoles(null));
  };

  const handleCancel = () => {
    dispatch(usersModalActions.resetModal());
  };

  return (
    <>
      {contextHolder}
      <Modal
        key={usersModal.modalType}
        cancelText="Отмена"
        okText="Подтвердить"
        open={usersModal.modalType !== null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {usersModal.modalType === "delete" &&
          "Вы действительно хотите удалить данного пользователя?"}
        {usersModal.modalType === "block" &&
          "Вы действительно хотите заблокировать данного пользователя?"}
        {usersModal.modalType === "unblock" &&
          "Вы действительно хотите разблокировать данного пользователя?"}
        {usersModal.modalType === "addRoles" &&
          roles.availableRoles?.length && (
            <>
              Выберите роль для добавления:
              {roles.availableRoles &&
                roles.availableRoles.map((role) => (
                  <Button
                    key={role}
                    onClick={() =>
                      dispatch(
                        userRolesActions.setNewUserRoles([
                          ...(roles.newRoles || []),
                          role,
                        ])
                      )
                    }
                    disabled={roles.newRoles?.includes(role)}
                  >
                    {role}
                  </Button>
                ))}
              {roles.newRoles?.length && (
                <div style={{ marginTop: 12 }}>
                  <Text strong>Итоговые роли: </Text>
                  {roles.newRoles.join(", ")}
                </div>
              )}
            </>
          )}
        {usersModal.modalType === "addRoles" &&
          !roles.availableRoles?.length && (
            <Text>Все возможные роли уже добавлены</Text>
          )}
        {usersModal.modalType === "deleteRoles" &&
          roles.availableRoles?.length && (
            <>
              Выберите роль для удаления:{"  "}
              {roles.availableRoles.map((role) => (
                <Button
                  key={role}
                  onClick={() => {
                    const newRoles = (roles.newRoles || []).filter(
                      (r) => r !== role
                    );
                    dispatch(userRolesActions.setNewUserRoles(newRoles));
                  }}
                  disabled={!roles.newRoles?.includes(role)}
                >
                  {role}
                </Button>
              ))}
              {roles.newRoles?.length && (
                <div style={{ marginTop: 12 }}>
                  <Text strong>Итоговые роли: </Text>
                  {roles.newRoles.join(", ")}
                </div>
              )}
              {!roles.newRoles?.length && (
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

export default UsersModal;
