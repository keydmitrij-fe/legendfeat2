import { List, Checkbox, Typography, Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import {
  fetchEditTasksToDone,
  deleteTask,
  fetchEditTasksName,
} from "../../api/todoApi.ts";
import "./TodoItem.css";
import { TodoRequest, FieldTaskName } from "../../api/interface.ts";
import { useForm } from "antd/es/form/Form";
import {
  MAXIMAL_TASK_LENGTH,
  MINIMAL_TASK_LENGTH,
} from "../../constants/constants.ts";

const { Text } = Typography;

const TodoItem: React.FC<{
  taskId: number;
  taskIsDone: boolean;
  taskTitle: string;
  onUpdate: () => void;
}> = (props) => {
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateTaskStatus, setUpdateTaskStatus] = useState<boolean>(
    props.taskIsDone
  );

  async function handleEditClickToDone() {
    setUpdateTaskStatus(!props.taskIsDone);
    const request: TodoRequest = { isDone: !updateTaskStatus };
    await fetchEditTasksToDone(props.taskId, request);
    props.onUpdate();
  }

  async function handleDelete() {
    await deleteTask(props.taskId);
    props.onUpdate();
  }

  function handleEditClick() {
    form.setFieldValue("taskName", props.taskTitle);
    setIsEdit(true);
    props.onUpdate();
  }

  function handleCancelClick() {
    form.setFieldValue("taskName", "");
    setIsEdit(false);
  }

  const handleSubmit: FormProps<FieldTaskName>["onFinish"] = async (value) => {
    const request: TodoRequest = {
      title: value.taskName,
    };
    await fetchEditTasksName(props.taskId, request);
    setIsEdit(false);
    props.onUpdate();
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldTaskName>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <List.Item className="task-container">
      <Checkbox
        checked={updateTaskStatus}
        onClick={handleEditClickToDone}
      ></Checkbox>
      {!isEdit && (
        <>
          <div className="label-container">
            {!updateTaskStatus && <Text>{props.taskTitle}</Text>}
            {updateTaskStatus && <Text delete>{props.taskTitle}</Text>}
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
                message: "Название задачи должно быть от 2 до 64 символов!",
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
  );
};

export default TodoItem;
