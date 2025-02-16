import { Input } from "antd";
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
      {label && (
        <label htmlFor={label} className="block mb-2 font-bold">
          {label}
        </label>
      )}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            type={type}
            id={name}
            {...field}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        )}
      />
    </div>
  );
};

export default PHFormInput;
