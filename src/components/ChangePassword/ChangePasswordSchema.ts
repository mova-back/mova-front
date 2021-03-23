import * as Yup from 'yup';

export default {
  initialState: {
    oldPassword: '',
    newPassword: '',
    confirm_new_password: '',
  },
  validSchema: Yup.object().shape({
    oldPassword: Yup.string().required('This field is required'),
    newPassword: Yup.string().required('This field is required'),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
      .required('This field is required'),
  }),
};
