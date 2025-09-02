import { useState, ChangeEvent } from "react";

type FormState<T> = T & { [key: string]: any };

export function useForm<T extends FormState<T>>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => setFormState(initialState);

  return {
    ...formState,
    formState,
    onInputChange,
    resetForm,
    setFormState,
  };
}
