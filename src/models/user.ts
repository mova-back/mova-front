export type RolesType = 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | 'ROLE_ANONYMOUS';

type User = {
  _id: string;
  username: string;
  email: string;
  role: RolesType;
  created_at: string;
  updated_at: string;
  accessToken: string;
  refreshToken: string;
};

export default User;
