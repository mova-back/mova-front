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
    wordname: Yup.string()
      .min(2, 'Занадта коратка!')
      .required('Абавязковае поле!')
      .max(50, 'Занадта доўга!'),
    meaning: Yup.string()
      .required('Абавязковае поле!')
      .min(2, 'Занадта коратка!')
      .max(50, 'Занадта доўга!'),
    swearing: Yup.boolean(),
    extended_description: Yup.string().min(5, 'Занадта коратка!').max(80, 'Too Long!'),
    usages: Yup.string().min(2, 'Занадта коратка!').max(50, 'Занадта доўга!'),
    tags: Yup.string().max(50, 'Занадта доўга!'),
  }),
};
