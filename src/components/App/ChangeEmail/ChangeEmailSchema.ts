import * as Yup from 'yup';

export default {
  initialState: {
    newEmail: '',
  },
  validSchema: Yup.object().shape({
    newEmail: Yup.string().required('This field is required'),
  }),
};
