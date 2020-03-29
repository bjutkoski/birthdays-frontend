import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Employees from '~/pages/Employees/List';
import Employee from '~/pages/Employees/Form';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/employees/new" component={Employee} isPrivate />
      <Route path="/employees/:id" component={Employee} isPrivate />
      <Route path="/employees" component={Employees} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
