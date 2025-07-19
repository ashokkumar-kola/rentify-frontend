import { useState } from 'react';

type Errors<T> = Partial<Record<keyof T, string | null>>;

const useAuthForm = <T extends Record<string, any>>(
  initialState: T,
  validate: (formData: T) => Errors<T>
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    formData,
    errors,
    loading,
    setLoading,
    handleChange,
    validateForm,
  };
};

export default useAuthForm;
