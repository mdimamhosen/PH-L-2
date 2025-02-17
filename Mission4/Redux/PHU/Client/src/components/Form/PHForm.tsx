import { Form } from "antd";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
  defaultValues?: FieldValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
};

type TFormConfig = {
  defaultValues?: FieldValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
};

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm({
    ...formConfig,
  });

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
      ;
    </FormProvider>
  );
};

export default PHForm;
