import IForm from './interfaceForm';

const resetPasswordFields: IForm[] = [
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Новы пароль',
    helperText: 'Абавязковае поле',
  },
  {
    id: 'confirmNewPassword',
    name: 'confirmNewPassword',
    type: 'password',
    label: 'Пацвердзіце новы пароль',
    helperText: 'Абавязковае поле',
  },
];

export type ResetPasswordDataType = {
  password: string;
  confirmNewPassword: string;
};

export default resetPasswordFields;
