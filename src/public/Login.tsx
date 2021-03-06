import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router-dom';
import './public.css'

class Login extends Component {
    email = '';
    password = '';

    state = {
        redirect: false
    }

    submit =  async(e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('login', {
            email: this.email,
            password: this.password
        });

        // localStorage.setItem('token', response.data.token);
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        // console.log(response);

        this.setState({
            redirect: true
        })
        
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />;
        }

        return (
            <form className="form-signin" onSubmit={this.submit}>
                <img className="mb-4 mx-auto d-block" src="/logo2.png" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                    onChange={ e => this.email = e.target.value }  />

                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                    onChange={ e => this.password = e.target.value } />
                <div className="checkbox mb-3">
                </div>
                <button className="btn btn-lg btn-success btn-block" type="submit">Sign in</button>
          </form>
        )
    }
}

export default Login;
