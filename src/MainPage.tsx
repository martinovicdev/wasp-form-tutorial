import React from 'react';
import { Customer } from 'wasp/entities';
import { type AuthUser } from 'wasp/auth';
import { deleteCustomer, useQuery } from 'wasp/client/operations';

import './Main.css';
import { getCustomers } from 'wasp/client/operations';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { Button } from './components/ui/button';
import Header from './components/layout/header';
import { Link } from 'wasp/client/router';

export const MainPage = ({ user }: { user: AuthUser }) => {
  const { data: customers, isLoading, error } = useQuery(getCustomers);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <>
      <Header />
      <main>
        {user && user.identities.username && (
          <h1 className="text-2xl font-semibold text-center">
            {user.identities.username.id}
            {"'s customers "}
          </h1>
        )}

        <div className="border border-border rounded-md mt-10">
          {customers.length > 0 ? (
            <CustomerTable customers={customers} />
          ) : (
            <div className="p-3">No customers found</div>
          )}
        </div>
      </main>
    </>
  );
};

function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="p-1">
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.surname}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell className="flex gap-2">
              <Link to="/customer/:id" params={{ id: customer.id }}>
                <Button>Edit</Button>
              </Link>
              <Button
                variant={'destructive'}
                onClick={() => {
                  void deleteCustomer(customer.id);
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
