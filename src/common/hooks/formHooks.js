import { useState } from 'react';

export const useForm = initialState => {
  const [form, setform] = useState(initialState);
  const handleChange = event => {
    setform({ ...form, [event.target.name]: event.target.value });
  };
  return [form, handleChange];
};
