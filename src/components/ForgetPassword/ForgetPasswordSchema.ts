import * as Yup from 'yup';

export default {
  initialState: {
    email: '',
  },
  validSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
  }),
};
