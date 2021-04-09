type User = {
  _id: number;
  username: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | 'ROLE_ANONYMOUS';
  created_at: string;
  updated_at: string;
  accessToken: string;
  refreshToken: string;
};

export default User;
