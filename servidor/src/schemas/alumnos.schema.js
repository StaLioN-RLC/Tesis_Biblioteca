import { z } from 'zod'

export const alumnoSchema = z.object({
  /* Nombre del estudiante */
  nombre: z.string({
    required_error: 'El nombre del alumno es requerido',
  }).min(4, {
    message: 'El nombre del estudiante debe tener al menos 4 caracteres'
  }).max(40, {
    message: 'El nombre del estudiante no puede tener más de 40 caracteres'
  }),

  /* Apellido del estudiante */
  apellido: z.string({
    required_error: 'El apellido del alumno es requerido',
  }).min(4, {
    message: 'El apellido del estudiante debe tener al menos 4 caracteres'
  }).max(40, {
    message: 'El apellido del estudiante no puede tener más de 40 caracteres'
  }),

  /* Grupo del estudiante */
  grupo: z.string({
    required_error: 'El grupo del estudiante es requerido',
  }).max(1, {
    message: 'El grupo del estudiante no puede tener más de 1 caracter'
  }),
})