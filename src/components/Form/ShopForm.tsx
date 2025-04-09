import { cn } from "@/lib/utils";
import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  className: string;
} & TFormConfig;
const ShopForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  className,
}: TFormProps) => {
  const formConfig: TFormConfig = {
    defaultValues,
    resolver,
  };
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  const submit = (data: FieldValues) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form
        className={cn("", className)}
        layout="vertical"
        onFinish={methods.handleSubmit(submit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default ShopForm;
