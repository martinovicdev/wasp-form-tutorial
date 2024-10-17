import React from 'react';
import waspLogo from '../../waspLogo.png';
import { Button } from '../ui/button';
import { logout } from 'wasp/client/auth';
import { Link } from 'wasp/client/router';

export const Header = () => {
  return (
    <div className="h-16 flex items-center justify-between px-10">
      <div className="flex gap-4 items-center">
        <img src={waspLogo} className="size-10" alt="wasp logo" />
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/customer" className="hover:underline">
          Add new customer
        </Link>
      </div>

      <Button variant={'destructive'} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
