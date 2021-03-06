import { AxiosError } from 'axios';

export default class HttpError extends Error {
  public statusCode?: number | string;

  constructor(error: AxiosError) {
    super(HttpError.getMessage(error));
    this.statusCode = error.response ? error.response.status : error.code;
  }

  static getMessage(error: AxiosError): string {
    if (error.response) {
      if (error.response.data.errors) {
        // @todo: handle later
        return JSON.stringify(error.response.data.errors);
      }
      return error.response.statusText;
    }
    if (error.message) {
      return error.message;
    }
    return 'Error processing the request';
  }
}
