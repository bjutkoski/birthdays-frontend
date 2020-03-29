import React from 'react';
import { useSelector } from 'react-redux';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Birthdays from '~/pages/Birthdays';
import Employees from '~/pages/Employees/List';
import Employee from '~/pages/Employees/Form';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';

export default function Routes() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/birthdays" component={Birthdays} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      {profile && profile.isAdmin && (
        <Route path="/employees/new" component={Employee} isPrivate />
      )}
      {profile && profile.isAdmin && (
        <Route path="/employees/:id" component={Employee} isPrivate />
      )}
      {profile && profile.isAdmin && (
        <Route path="/employees" component={Employees} isPrivate />
      )}
      <Route path="/" component={NotFound} isPrivate />
    </Switch>
  );
}
