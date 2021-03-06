import IForm from './interfaceForm';

const signup: IForm[] = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'example@gmail.com',
    label: 'Email',
  },
  {
    id: 'username',
    name: 'username',
    type: 'username',
    placeholder: 'Увядзіце ваш nick',
    label: 'Nickname',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Увядзіце пароль',
    label: 'Password',
  },
];

export default signup;
