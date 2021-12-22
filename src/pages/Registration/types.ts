export interface IState {
  first_name: {
    value: string;
    error: string | boolean;
  };
  second_name: {
    value: string;
    error: string | boolean;
  };
  login: {
    value: string;
    error: string | boolean;
  };
  email: {
    value: string;
    error: string | boolean;
  };
  password: {
    value: string;
    error: string | boolean;
  };
  password_confirm: {
    value: string;
    error: string | boolean;
  };
}
