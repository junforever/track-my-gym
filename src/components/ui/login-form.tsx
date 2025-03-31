'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const formSchema = z.object({
  //por cada input que se agregue hay que definir la validacion aqui
  username: z
    .string()
    .nonempty({ message: 'Username cannot be empty' })
    .min(5, { message: 'Username must be at least 5 characters long' })
    .max(15, { message: 'Username must be at most 15 characters long' }),
  password: z
    .string()
    .nonempty({ message: 'Password cannot be empty' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  //para obtener los valores del formulario
  //console.log(form.getValues());

  //para saber si el formulario es valido
  //console.log(form.formState.isValid);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values });
  }
  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-6 md:px-8 md:py-12"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Bienvenido a Track My Gym
                </h1>
                <p className="text-balance text-muted-foreground">
                  Ingresa a tu Cuenta
                </p>
              </div>
            </div>
            {/* username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese su Usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su Contraseña"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* submit button */}
            <Button type="submit">Iniciar Sesión</Button>
            <p className="text-muted-foreground">
              Olvidaste tu contraseña? Por favor, contacta al administrador.
            </p>
          </form>
        </Form>
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/images/track-my-gym-full-logo.png"
            alt="Track My Gym"
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
