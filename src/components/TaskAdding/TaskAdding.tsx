import { Form, Input, Button, notification } from "antd";
import type { FormProps, NotificationArgsProps } from "antd";
import { addTask } from "../../api/todoApi.ts";
import "./TaskAdding.css";
import { TodoRequest, FieldTaskName } from "../../types/todoTypes.ts";
import { memo } from "react";
import {
  MAXIMAL_TASK_LENGTH,
  MINIMAL_TASK_LENGTH,
} from "../../constants/constants.ts";
type NotificationPlacement = NotificationArgsProps["placement"];

const TaskAdding: React.FC<{ onUpdate: () => void }> = memo(({ onUpdate }) => {
  const [form] = Form.useForm();
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

  const handleSubmit: FormProps<FieldTaskName>["onFinish"] = async (value) => {
    const request: TodoRequest = {
      title: value.taskName,
    };
    await addTask(request.title!);
    onUpdate();
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
      <Form
        name="basic"
        style={{
          display: "flex",
          gap: "3rem",
          justifyContent: "flex-start",
          width: "100%",
        }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldTaskName>
          name="taskName"
          style={{ width: "100%" }}
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
          <Input placeholder="Task To Be Done..." />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});

export default TaskAdding;
