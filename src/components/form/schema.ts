import {z} from 'zod'

export const schema = z.object({ 
    description: z.string().min(1,"La descripcion es necesaria"), 
    amount: z.coerce.number().min(1, "El monto es obligatorio"), 
    category: z.string(), 
    card: z.string() 
  });

export type FormValues = z.infer<typeof schema>;

export const initialForm = () => ({
    description: '',
    amount: 0,
    category: '',
    card: '',
   })

export const schemaCard = z.object({
    name:z.string().min(1, "El nombre es necesario"),
    date_end: z.string(),
    capacity: z.coerce.number().min(0, "El monto es obligatorio"),
    color: z.string(),
    genre: z.string(),
  });

export type FormCardValues = z.infer<typeof schemaCard>;

export const initialFormCard = () => ({
    name:'',
    date_end: '2020-01-30',
    capacity: 0,
    color: '#000000',
    genre: 'credit',
  });