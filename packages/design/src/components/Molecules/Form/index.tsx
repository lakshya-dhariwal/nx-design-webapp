import { FormProps } from "@/types";
import { useForm, FormProvider, FieldValues } from "react-hook-form";

type FormPropsWithHTMLAttributes<TFieldValues extends FieldValues> =
  FormProps<TFieldValues> & React.FormHTMLAttributes<HTMLFormElement>;

function Form<TFieldValues extends FieldValues>({
  onSubmit,
  children,

  ...formProps
}: FormPropsWithHTMLAttributes<TFieldValues>) {
  const methods = useForm<TFieldValues>(formProps);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...formProps}>
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
