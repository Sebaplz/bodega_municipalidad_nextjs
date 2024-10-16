import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Ingrese un correo electrónico válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(50, "La contraseña no puede exceder los 50 caracteres"),
  //TODO: Mientras se esta desarrollando
  /* .regex(
    /^(?=.*[A-Z]).*$/,
    "La contraseña debe contener al menos una mayúscula"
  )
  .regex(/^(?=.*[0-9]).*$/, "La contraseña debe contener al menos un número"); */
});
