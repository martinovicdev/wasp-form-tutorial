import React from 'react';
import { useQuery, getCustomer } from 'wasp/client/operations';
import { useParams } from 'react-router-dom';
import { CustomerForm } from './components/customer/customer';

export const CustomerEditPage = () => {
  const { id } = useParams<'id'>();

  const {
    data: customer,
    isLoading,
    error,
  } = useQuery(getCustomer, { id: Number(id) });

  return <>{!isLoading && customer && <CustomerForm customer={customer} />}</>;
};
