import React from 'react';
import { CiMail, CiUser, CiLock } from 'react-icons/ci';
import './auth.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {

    const register = async (e) => {
        e.preventDefault();

        const user = {
            name : e.target.name.value,
            email : e.target.email.value,
            password : e.target.password.value
        };
        try {
            await axios.post('/api/auth/register', user);
            toast.success('user registered')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

	return (
		<form className="login-div" onSubmit={register}>
			<div className="logo overflow-hidden">
				<img src='/login.jpg' alt="logo" className="w-full object-cover"/>
			</div>
			<div className="title">Sign Up</div>
			<div className="fields">
				<div className="username">
					<span className="flex items-center justify-center">
						<CiUser />
					</span>
					<input type="username" name='name' required className="user-input" placeholder="Username" />
				</div>
				<div className="username">
					<span className="flex items-center justify-center">
						<CiMail />
					</span>
					<input type="email" name='email' required className="user-input" placeholder="Email" />
				</div>
				<div className="password">
					<span className="flex items-center justify-center">
						<CiLock />
					</span>
					<input type="password" name='password' required className="pass-input" placeholder="Password" />
				</div>
			</div>
			<button type='submit' className="signin-button">Sign Up</button>
		</form>
	);
};

export default Register;
