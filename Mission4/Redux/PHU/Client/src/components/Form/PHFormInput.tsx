import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const PHFormInput = ({
  type,
  name,
  label,
  disable,
}: {
  type: string;
  name: string;
  label?: string;
  disable?: boolean;
}) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              placeholder={label}
              disabled={disable}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHFormInput;
