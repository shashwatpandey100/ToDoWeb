"use client";
import { useEffect, useState } from 'react';
import Left from './components/left.jsx';
import Middle from './components/middle.jsx';
import Auth from './components/auth.jsx';
import useAuth from './hooks/useAuth.js';
import Loader from './components/loader.jsx';

export default function Home() {
	const { auth } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const delay = 2000;
		setTimeout(() => {
			setLoading(false);
		}, delay);
	}, [auth]);

	if (loading) {
		return <Loader />;
	}
	if (auth === true) {
		return (
			<section
				id="outermost-container"
				className="h-[100vh] w-[100vw] flex items-center justify-center"
			>
				<section
					id="inner-container"
					className="p-[15px] bg-bg min-w-[94vw] h-[95%] rounded-[25px] overflow-hidden max-w-[1120px] max-h-[750px] flex flex-col newShadow"
				>
					<div className="flex h-full w-full gap-[15px]">
						<Left />
						<Middle />
					</div>
				</section>
			</section>
		);
	} else {
		return (
			<section
				id="outermost-container"
				className="h-[100vh] w-[100vw] flex items-center justify-center"
			>
				<section
					id="inner-container"
					className="p-[15px] bg-bg w-[30vw] h-[75%] rounded-[25px] overflow-hidden max-w-[1120px] max-h-[750px] flex flex-col newShadow"
				>
          <Auth />
				</section>
			</section>
		);
	}
}
