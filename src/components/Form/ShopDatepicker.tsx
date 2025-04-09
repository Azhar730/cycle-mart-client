import { cn } from "@/lib/utils";
import { Form, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const ShopDatePicker = ({
  name,
  label,
  labelClassName,
  picker = "date", // Allows selection of "date", "month", "week", "year"
  inputClassName,
  value,
  onValueChange,
}: {
  name: string;
  label?: string;
  labelClassName?: string;
  picker?: "date" | "month" | "week" | "year";
  inputClassName?: string;
  value?: string | Date; // Can accept a string or Date object
  onValueChange?: (newValue: dayjs.Dayjs | null) => void;
}) => {
  const { setValue, control } = useFormContext();

  // Watch the DatePicker field's value
  const selectedDate = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (value) {
      setValue(name, dayjs(value), { shouldValidate: false });
    }
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(selectedDate);
    }
  }, [selectedDate, onValueChange]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: "This field is required",
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
            {label && (
              <p
                className={cn(
                  "ps-1 mb-2 text-[#101828] dark:text-white text-base font-normal leading-6",
                  labelClassName
                )}
              >
                {label}
              </p>
            )}
            <Form.Item style={{ marginBottom: "0px" }}>
              <DatePicker
                {...field}
                picker={picker}
                id={name}
                size="large"
                className={cn("w-full", inputClassName)}
                value={field.value ? dayjs(field.value) : null} // Ensure value is handled as dayjs
                onChange={(date) => {
                  field.onChange(date);
                  if (onValueChange) onValueChange(date);
                }}
              />
            </Form.Item>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default ShopDatePicker;
