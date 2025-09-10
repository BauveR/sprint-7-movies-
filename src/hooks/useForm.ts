import { useState, ChangeEvent } from "react";

export function useForm<T extends Record<string, unknown>>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  // Cambiar por nombre/valor tipados
  const onFieldChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Adaptador para eventos <input/textarea>
  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onFieldChange(name as keyof T, value as T[keyof T]);
  };

  const resetForm = () => setFormState(initialState);

  return {
    ...formState,
    formState,
    onInputChange,
    onFieldChange,   
    resetForm,
    setFormState,
  };
}
