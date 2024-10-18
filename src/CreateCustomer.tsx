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
import { createCustomer, useQuery, getCustomer } from 'wasp/client/operations';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import { DatePicker } from './components/ui/date-picker';
import Header from './components/layout/header';
import { CustomerForm } from './components/customer/customer';

export const CustomerPage = () => {
  let defaultCustomer = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    dateOfBirth: new Date(),
    premiumUser: false,
  };

  return <CustomerForm customer={defaultCustomer} />;
};
