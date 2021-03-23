import { FormikHelpers } from 'formik';

export type ChangeEmailDataType = {
  newEmail: string;
};
export type ChangeEmailFormDataType = {
  newEmail: string;
  meta: FormikHelpers<ChangeEmailDataType>;
};
