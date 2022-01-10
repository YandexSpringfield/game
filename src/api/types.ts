export type TSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type TSignIn = {
  login: string;
  password: string;
};

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TUserRequest = {
  login: string;
  display_name: string;
  first_name: string;
  second_name: string;
  email: string;
};
