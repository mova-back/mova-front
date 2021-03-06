import * as Yup from 'yup';

export default {
  initialState: {
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  },
  validSchema: Yup.object().shape({
    old_password: Yup.string().required('This field is required'),
    new_password: Yup.string().required('This field is required'),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref('new_password')], 'Passwords do not match')
      .required('This field is required'),
  }),
};
