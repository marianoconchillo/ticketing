import { useState } from "react";
import axios, { Method } from "axios";

interface Props<T> {
  url: string;
  method: Method;
  body: T;
  onSuccess?: () => void;
}

interface ErrorElement {
  message: string;
}

const useRequest = <T extends Object>({
  url,
  method,
  body,
  onSuccess,
}: Props<T>) => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const { data } = await axios.request({
        method,
        url,
        data: body,
      });

      if (onSuccess) {
        onSuccess();
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
