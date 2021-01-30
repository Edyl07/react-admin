import React from 'react';
import './App.css';
import Dashboard from './secure/dashboard/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './secure/users/Users';
import Login from './public/Login';
import Register from './public/Register';
import RedirectToDashboard from './secure/components/RedirectToDashboard';
import UserCreate from './secure/users/UserCreate';

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
        </BrowserRouter>
    </div>
 </div>
  
   );
}

export default App;
