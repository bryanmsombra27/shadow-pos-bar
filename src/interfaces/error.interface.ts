import { AxiosError } from "axios";

export interface AppError
  extends AxiosError<{ error: string; message: string; statusCode: number }> {}
