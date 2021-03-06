import IForm from './interfaceForm';

const login: IForm[] = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'example@gmail.com',
    label: 'Email',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Увядзіце пароль',
    label: 'Password',
  },
];

export default login;
