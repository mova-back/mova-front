import { FormikHelpers } from 'formik';

type ChangePasswordDataWithValidation = {
  oldPassword: string;
  newPassword: string;
  confirm_new_password: string;
};
export type ChangePasswordDataType = {
  oldPassword: string;
  newPassword: string;
};
export type ChangePasswordFormDataType = {
  oldPassword: string;
  newPassword: string;
  meta: FormikHelpers<ChangePasswordDataWithValidation>;
};

export default ChangePasswordDataWithValidation;
