import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";
import { addTask } from "../../api/api.ts";
import "./TaskAdding.css";
import { TodoRequest, FieldTaskName } from "../../api/interface.ts";
import { memo } from "react";
import {
  MAXIMAL_TASK_LENGTH,
  MINIMAL_TASK_LENGTH,
} from "../../constants/constants.ts";

const TaskAdding: React.FC<{ onUpdate: () => void }> = memo(({ onUpdate }) => {
  const [form] = Form.useForm();

  const handleSubmit: FormProps<FieldTaskName>["onFinish"] = async (value) => {
    const request: TodoRequest = {
      title: value.taskName,
    };
    await addTask(request.title!);
    onUpdate();
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldTaskName>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
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
        <Input placeholder="Task To Be Done..." />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
});

export default TaskAdding;
