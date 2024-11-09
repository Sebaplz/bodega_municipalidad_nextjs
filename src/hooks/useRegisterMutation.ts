import { registerUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

export const useRegisterMutation = () => {
  const { toast } = useToast();
  const router = useRouter();
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast({
        title: "Registro Exitoso!",
        description: data.data.message,
        variant: "success",
      });
      router.push("/login");
    },
    onError: (error: Error) => {
      console.error("Error al registrar el usuario:", error);
    },
  });

  return registerMutation;
};
