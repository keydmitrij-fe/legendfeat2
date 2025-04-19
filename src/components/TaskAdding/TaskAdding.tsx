import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";
import { addTask } from "../../api/api.ts";
import "./TaskAdding.css";
import { TodoRequest, FieldTaskName } from "../../api/interface.ts";

const TaskAdding: React.FC<{ onUpdate: () => void }> = (props) => {
  const [form] = Form.useForm();

  const handleSubmit: FormProps<FieldTaskName>["onFinish"] = async (value) => {
    const request: TodoRequest = {
      title: value.taskName,
    };
    await addTask(request.title!);
    props.onUpdate();
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
            min: 2,
            max: 64,
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
};

export default TaskAdding;
