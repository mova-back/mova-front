type User = {
  _id: number;
  username: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_MODERATOR';
  created_at: string;
  updated_at: string;
  accessToken: string;
  refreshToken: string;
};

export default User;
