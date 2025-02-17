import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const PHFormInput = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label?: string;
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} placeholder={label} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHFormInput;
