import { useState } from "react";
import axios, { Method } from "axios";

interface Props<T, U> {
  url: string;
  method: Method;
  body: T;
  onSuccess?: (data?: U) => void;
}

interface ErrorElement {
  message: string;
}

const useRequest = <T, U>({ url, method, body, onSuccess }: Props<T, U>) => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const { data } = await axios.request<U>({
        method,
        url,
        data: { ...body, ...props },
      });

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (err: any) {
      setErrors(
        <div>
          <ul>
            {err.response.data.errors.map((err: ErrorElement) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
