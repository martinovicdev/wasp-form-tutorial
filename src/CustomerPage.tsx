import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Checkbox } from './components/ui/checkbox';
import { createCustomer } from 'wasp/client/operations';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import { DatePicker } from './components/ui/date-picker';
import Header from './components/layout/header';

export const CustomerPage = ({ id }: { id: number }) => {
  const { toast } = useToast();
  const formSchema = z.object({
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email().min(5),
    dateOfBirth: z.date().max(new Date()),
    premiumUser: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      dateOfBirth: new Date(),
      premiumUser: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createCustomer({
        name: values.name,
        surname: values.surname,
        email: values.email,
        dateOfBirth: values.dateOfBirth,
        premiumUser: values.premiumUser,
      });
      toast({
        title: 'Success!',
        description: 'Customer created successfully',
      });
      form.reset();
    } catch (err: any) {
      window.alert('Error: ' + err?.message);
    }
  }

  return (
    <>
      <Header />
      <Form {...form}>
        <h1 className="text-2xl font-semibold text-center">Add new customer</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" border border-border p-3 rounded-md space-y-8 mx-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>

                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="premiumUser"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Premium user</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
};
