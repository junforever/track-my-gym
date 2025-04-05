'use client';
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
import { Auth, AuthCredentials } from '@/modules/auth/domain/entities/Auth';
import { AuthResponse } from '@/modules/auth/domain/entities/Auth';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({
  handleLogin,
}: {
  handleLogin: (username: string, password: string) => Promise<AuthResponse>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<Auth>({
    resolver: zodResolver(AuthCredentials),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: Auth) => {
    setIsLoading(true);
    const response = await handleLogin(values.username, values.password);

    if (response?.error) {
      toast.error('Error de inicio de sesión', {
        duration: 5000,
        position: 'top-right',
        description: 'Usuario y/o contraseña incorrectos',
      });
      setIsLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
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
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
