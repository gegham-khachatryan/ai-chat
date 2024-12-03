import { ChangeHandler, RegisterOptions, UseFormProps, useForm as useHookForm } from 'react-hook-form';

export interface UseCustomFormProps extends UseFormProps {
  trim?: boolean;
}

export const useForm = ({ trim, ...props }: UseCustomFormProps) => {
  const methods = useHookForm(props);
  const register = (name: string, registerOptions?: RegisterOptions) => {
    const field = methods.register(name, registerOptions);
    const customOnChange: ChangeHandler = async (event) => {
      const target = event.target;

      if (trim && typeof target.value === 'string' && target.value) {
        target.value = target.value.trim();
      }

      field.onChange(event);
    };

    return { ...field, onChange: customOnChange };
  };

  return { ...methods, register };
};
