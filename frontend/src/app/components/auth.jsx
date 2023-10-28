import React, { useState } from 'react';
import Login from './login.jsx';
import Register from './register.jsx';
import './auth.css';

const Auth = () => {
	const [login, setLogin] = useState(false);

	const handleLoginClick = () => {
		setLogin(!login);
	};

	const containerStyle = {
		animation: login
			? 'scaleDownAndTranslate 1s ease-in-out forwards'
			: 'scaleUpAndTranslate 1s ease-in-out forwards',
	};

	return (
		<div style={containerStyle} className="h-full md:w-[200%] w-[800px] flex">
			<div className="h-full w-[50%] flex flex-col items-center justify-center">
				<Login />
				<p className="text-textColSp text-[13px] mb-[20px]">
					dont have an account yet? &nbsp;
					<span
						onClick={handleLoginClick}
						className="cursor-pointer text-textColSp text-[13px] underline"
					>
						Register
					</span>
				</p>
			</div>
			<div className="h-full w-[50%] flex flex-col items-center justify-center">
				<Register />
				<p className="text-textColSp text-[13px] mb-[20px]">
					Already have an account? &nbsp;
					<span
						onClick={handleLoginClick}
						className="cursor-pointer text-textColSp text-[13px] underline"
					>
						Login
					</span>
				</p>
			</div>
		</div>
	);
};

export default Auth;
