import { HttpStatusCodes } from 'backk';

export const exampleServiceErrors = {
  exampleError: {
    errorCode: 1,
    message: 'Example error message',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
};
