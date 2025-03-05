import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signupApi({ email, password }),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the account from email address"
      );
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Signup Failed");
    },
  });
  return { signup, isLoading };
}
