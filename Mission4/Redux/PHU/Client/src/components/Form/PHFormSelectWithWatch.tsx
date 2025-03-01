import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export type TFormSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange?: (value: string) => void;
};

const PHFormSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TFormSelectProps) => {
  const method = useFormContext();

  const inputValue = useWatch({
    control: method.control,
    name: name,
  });
  console.log(inputValue);

  useEffect(() => {
    onValueChange?.(inputValue);
  }, [inputValue]);

  return (
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
};

export default PHFormSelectWithWatch;
