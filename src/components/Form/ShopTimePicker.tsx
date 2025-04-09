import { cn } from '@/lib/utils';
import { Form, TimePicker } from 'antd';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const MyFormTimePicker = ({
  name,
  label,
  labelClassName,
  timePickerClassName,
  placeHolder,
  defaultValue,
  onValueChange,
}: {
  name: string;
  label?: string;
  labelClassName?: string;
  timePickerClassName?: string;
  placeHolder?: string;
  defaultValue?: any;
  onValueChange?: (newValue: any) => void;
}) => {
  const { setValue, control } = useFormContext();

  // Watch the time field's value
  const timeValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setValue(name, defaultValue, { shouldValidate: false });
  }, [defaultValue, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(timeValue); // Trigger the callback whenever the value changes
    }
  }, [timeValue, onValueChange]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
            {label && (
              <p
                className={cn(
                  'ps-1 mb-2 text-[#101828] dark:text-white text-base font-normal leading-6',
                  labelClassName
                )}
              >
                {label}
              </p>
            )}
            <Form.Item style={{ marginBottom: '0px' }}>
              <TimePicker
                size="large"
                {...field}
                className={cn('w-full dark:bg-gray-300', timePickerClassName)}
                placeholder={placeHolder}
                onChange={(time) => field.onChange(time)}
              />
            </Form.Item>
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormTimePicker;
