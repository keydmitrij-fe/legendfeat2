import {
  List,
  Checkbox,
  Typography,
  Button,
  Form,
  Input,
  notification,
} from "antd";
import type { FormProps, NotificationArgsProps } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import {
  changeTaskStatus,
  deleteTask,
  editTaskName,
} from "../../api/todoApi.ts";
import "./TodoItem.css";
import { TodoRequest, FieldTaskName } from "../../types/todoTypes.ts";
import { useForm } from "antd/es/form/Form";
import {
  MAXIMAL_TASK_LENGTH,
  MINIMAL_TASK_LENGTH,
} from "../../constants/constants.ts";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App.tsx";
type NotificationPlacement = NotificationArgsProps["placement"];

const { Text } = Typography;

const TodoItem: React.FC<{
  taskId: number;
  taskIsDone: boolean;
  taskTitle: string;
}> = ({ taskId, taskIsDone, taskTitle }) => {
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    message: string,
  ) => {
    api.error({
      type: "error",
      message: message,
      duration: 6,
      placement,
    });
  };

  const editTaskStatusMutation = useMutation({
    mutationFn: (newStatus: Required<TodoRequest>["isDone"]) => {
      return changeTaskStatus(taskId, { isDone: newStatus });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskStatusMutation = useMutation({
    mutationFn: (taskId: number) => {
      return deleteTask(taskId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const editTaskTitleMutation = useMutation({
    mutationFn: (newName: Required<TodoRequest>["title"]) => {
      return editTaskName(taskId, { title: newName });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  async function handleEditClickToDone() {
    editTaskStatusMutation.mutate(!taskIsDone);
  }

  async function handleDelete() {
    deleteTaskStatusMutation.mutate(taskId);
  }

  function handleEditClick() {
    form.setFieldValue("taskName", taskTitle);
    setIsEdit(true);
  }

  function handleCancelClick() {
    form.setFieldValue("taskName", "");
    setIsEdit(false);
  }

  const handleSubmit: FormProps<FieldTaskName>["onFinish"] = async (value) => {
    setIsEdit(false);
    if (value.taskName) {
      editTaskTitleMutation.mutate(value.taskName);
    }
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldTaskName>["onFinishFailed"] = (
    errorInfo,
  ) => {
    openNotification("top", `Failed: ${errorInfo}`);
  };

  return (
    <>
      {contextHolder}
      <List.Item className="task-container">
        <Checkbox
          checked={taskIsDone}
          onClick={handleEditClickToDone}
        ></Checkbox>
        {!isEdit && (
          <>
            <div className="label-container">
              {!taskIsDone && <Text>{taskTitle}</Text>}
              {taskIsDone && <Text delete>{taskTitle}</Text>}
            </div>
            <Button type="primary" onClick={handleEditClick}>
              <EditFilled />
            </Button>
          </>
        )}
        {isEdit && (
          <Form
            name="update"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item<FieldTaskName>
              name="taskName"
              rules={[
                {
                  min: MINIMAL_TASK_LENGTH,
                  max: MAXIMAL_TASK_LENGTH,
                  message: `Название задачи должно быть от ${MINIMAL_TASK_LENGTH} до ${MAXIMAL_TASK_LENGTH} символов!`,
                },
                {
                  required: true,
                  message: "Введите название задачи",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                <CheckOutlined />
              </Button>
              <Button type="primary" onClick={handleCancelClick}>
                <CloseOutlined />
              </Button>
            </Form.Item>
          </Form>
        )}
        <Button color="danger" variant="solid" onClick={handleDelete}>
          <DeleteFilled />
        </Button>
      </List.Item>
    </>
  );
};

export default TodoItem;
