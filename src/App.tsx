import React from 'react';
import './App.css';
import Dashboard from './secure/dashboard/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './secure/users/Users';
import Login from './public/Login';
import Register from './public/Register';
import RedirectToDashboard from './secure/components/RedirectToDashboard';
import UserCreate from './secure/users/UserCreate';
import UserEdit from './secure/users/UserEdit';
import Roles from './secure/roles/Roles';
import RoleCreate from './secure/roles/RoleCreate';
import RoleEdit from './secure/roles/RoleEdit';
import Products from './secure/products/Products';
import ProductCreate from './secure/products/ProductCreate';

function App() {
  return (
    
 <div className="App">
    <div className="container-fluid">
        <BrowserRouter>
            <Route path={'/'} exact component={RedirectToDashboard} />
            <Route path={'/dashboard'} exact component={Dashboard} />
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
            <Route path={'/users'} exact component={Users} />
            <Route path={'/users/create'} component={UserCreate} />
            <Route path={'/users/:id/edit'} component={UserEdit} />
            <Route path={'/roles'} exact component={Roles} />
            <Route path={'/roles/create'} component={RoleCreate} />
            <Route path={'/roles/:id/edit'} component={RoleEdit} />
            <Route path={'/products'} exact component={Products} />
            <Route path={'/products/create'} component={ProductCreate} />
        </BrowserRouter>
    </div>
 </div>
  
   );
}

export default App;
