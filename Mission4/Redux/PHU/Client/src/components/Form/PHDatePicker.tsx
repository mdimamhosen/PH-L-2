import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

const PHDatePicker = ({ name, label }: { name: string; label?: string }) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              placeholder={label}
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
