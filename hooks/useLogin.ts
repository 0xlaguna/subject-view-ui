import { poster } from "@/lib/api/apiClient";
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  email: string;
  password: string;
}

interface Session {
  token: string;
  name: string;
  user_id: number;
}

const useLogin = () => {
  const {isError, isPending, isSuccess, mutate} = useMutation<Session, Error, LoginData, unknown>({
    mutationFn: (data: LoginData) => poster<LoginData, Session>('/account/login', data)
  });

  return {
    loginError: isError,
    loginPending: isPending,
    loginSuccess: isSuccess,
    loginMutate: mutate
  }
};

export default useLogin;
