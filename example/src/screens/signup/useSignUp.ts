import { useState } from 'react';
import { checkEmail, checkPassword, screenHeight } from '@app/utils';

const bottomHeight = screenHeight * 0.11;

export const useSignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    isEmailValid: true,
    isPasswordValid: true,
  });

  const [screenH, setScreenH] = useState(screenHeight - bottomHeight);

  const handleChangeEmail = (val: string) => {
    setForm({
      ...form,
      email: val,
      isEmailValid: checkEmail(val),
    });
  };
  const handleChangePassword = (val: string) => {
    setForm({
      ...form,
      password: val,
      isPasswordValid: checkPassword(val),
    });
  };

  const onKeyboardWillshow = (frames: any) => {
    setScreenH(screenH - (frames.endCoordinates.height - 25));
  };

  const onKeyboardWillHide = () => {
    setScreenH(screenHeight - bottomHeight);
  };

  return {
    email: form.email,
    handleChangeEmail,
    handleChangePassword,
    password: form.password,
    isEmailValid: form.isEmailValid,
    isPasswordValid: form.isPasswordValid,
    screenH,
    onKeyboardWillshow,
    onKeyboardWillHide,
  };
};
