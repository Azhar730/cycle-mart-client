import { cn } from '@/lib/utils';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const ShopTextArea = ({
  name,
  label,
  labelClassName,
  inputClassName,
  placeHolder,
  value,
}: {
  name: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeHolder?: string;
  value?: any;
}) => {
  const { setValue, control } = useFormContext();

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

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
            <p
              className={cn(
                'ps-1 text-[#101828] dark:text-white text-base font-normal leading-6 mb-2',
                labelClassName
              )}
            >
              {label}
            </p>
            <Form.Item style={{ marginBottom: '0px' }}>
              <TextArea
                {...field}
                id={name}
                size="large"
                rows={4}
                className={cn('w-full dark:bg-gray-300', inputClassName)}
                placeholder={placeHolder}
              />
            </Form.Item>
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default ShopTextArea;