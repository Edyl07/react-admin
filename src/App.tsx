import React from 'react';
import './App.css';
import Nav from './secure/components/Nav';
import Dashboard from './secure/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './secure/Users';
import Login from './public/Login';
import Register from './public/Register';

function App() {
  return (
    
 <div className="App">
    <div className="container-fluid">
        <BrowserRouter>
            <Route path={'/'} exact component={Dashboard} />
            <Route path={'/users'} component={Users} />
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
        </BrowserRouter>
    </div>
 </div>
  
   );
}

export default App;
