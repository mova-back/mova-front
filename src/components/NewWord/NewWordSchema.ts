import * as Yup from 'yup';

export default {
  initialState: {
    wordname: '',
    meaning: '',
    swearing: false,
    extended_description: '',
    usages: '',
    tags: '',
  },
  validSchema: Yup.object().shape({
    wordname: Yup.string().required('Error'),
    meaning: Yup.string().required('Error'),
    swearing: Yup.boolean(),
    extended_description: Yup.string().min(5, 'Too Short!'),
    usages: Yup.string().min(5, 'Too Short!'),
    tags: Yup.string(),
  }),
};
