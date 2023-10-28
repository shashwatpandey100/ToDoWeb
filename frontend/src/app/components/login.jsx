import React from 'react';
import { CiMail, CiLock } from 'react-icons/ci';
import toast from 'react-hot-toast';
import './auth.css';
import axios from 'axios';

const Login = () => {

    const login = async (e) => {
        e.preventDefault();

        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        try {
            await axios.post('/api/auth/login', user);
			toast.success('Logged in successfully');
			setTimeout(() => {
				window.location.reload();
			}, 500);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

	return (
		<form className="login-div" onSubmit={login}>
			<div className="logo overflow-hidden">
				<img src='/login.jpg' alt="logo" className="w-full object-cover"/>
			</div>
			<div className="title">Login</div>
			<div className="fields">
				<div className="username">
					<span className="flex items-center justify-center">
						<CiMail />
					</span>
					<input type="username" name='email' required className="user-input" placeholder="Email" />
				</div>
				<div className="password">
					<span className="flex items-center justify-center">
						<CiLock />
					</span>
					<input type="password" name='password' required className="pass-input" placeholder="Password" />
				</div>
			</div>
			<button type='submit' className="signin-button">Login</button>
		</form>
	);
};

export default Login;
