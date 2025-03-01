import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

export type TFormSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};

const PHFormSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
}: TFormSelectProps) => (
  <>
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} name={name}>
          <Select
            mode={mode}
            placeholder="Select a option and change input text above"
            {...field}
            size="large"
            disabled={disabled}
            options={options}
          />

          {error && <div style={{ color: "red" }}>{error.message}</div>}
        </Form.Item>
      )}
    />
  </>
);

export default PHFormSelect;
