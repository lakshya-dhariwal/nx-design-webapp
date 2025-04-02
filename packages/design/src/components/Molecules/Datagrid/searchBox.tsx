import Input from "@/components/Atoms/Controls/Input";
import { FormProvider, useForm } from "react-hook-form";

const GlobalInput = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Input
        type="text"
        name="globalFilter"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(String(e.target.value))}
        placeholder="Global search..."
      />
    </FormProvider>
  );
};

export default GlobalInput;
