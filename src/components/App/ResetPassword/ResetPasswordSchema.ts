import * as Yup from 'yup';

export default {
  initialState: {
    password: '',
    confirmNewPassword: '',
  },
  validSchema: Yup.object().shape({
    password: Yup.string().required('This field is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required(),
  }),
};
