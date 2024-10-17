import { type Customer } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { type GetCustomers, type GetCustomer } from 'wasp/server/operations';

export const getCustomers = ((_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Customer.findMany({
    orderBy: { id: 'asc' },
  });
}) satisfies GetCustomers<void, Customer[]>;

export const getCustomer = ((_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Customer.findUnique({
    where: { id: _args.id },
  });
}) satisfies GetCustomer<{ id: number }, Customer | null>;
