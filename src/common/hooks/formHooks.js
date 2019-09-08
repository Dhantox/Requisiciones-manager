import { useState } from 'react';

export const useForm = initialState => {
  const [form, setform] = useState(initialState);
  const handleChange = (event, { name, value }) => {
    setform({ ...form, [name]: value });
  };
  return [form, handleChange];
};
