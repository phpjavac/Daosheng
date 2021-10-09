// eslint-disable-next-line import/prefer-default-export
export class ApiResponse<T = any> {
  static readonly CODE_SUCCESS: number = 1;

  static readonly CODE_ERROR: number = 0;

  code!: number;

  message!: string;

  data!: T;
}
