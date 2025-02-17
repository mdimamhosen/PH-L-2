import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

export type TFormSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHFormSelect = ({ label, name, options }: TFormSelectProps) => (
  <>
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} name={name}>
          <Select
            placeholder="Select a option and change input text above"
            {...field}
            size="large"
            options={options}
          ></Select>

          {error && <div style={{ color: "red" }}>{error.message}</div>}
        </Form.Item>
      )}
    />
  </>
);

export default PHFormSelect;
