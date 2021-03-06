import IForm from './interfaceForm';

const changePassword: IForm[] = [
  {
    id: 'oldPassword',
    name: 'old_password',
    type: 'password',
    label: 'Стары пароль',
    helperText: 'Абавязковае поле',
  },
  {
    id: 'newPassword',
    name: 'new_password',
    type: 'password',
    label: 'Hoвы пароль',
    helperText: 'Абавязковае поле',
  },
  {
    id: 'confirmNewPassword',
    name: 'confirm_new_password',
    type: 'password',
    label: 'Пацвердзіце новы пароль',
    helperText: 'Абавязковае поле',
  },
];

export default changePassword;
