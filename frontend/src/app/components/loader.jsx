import React from 'react';
import './loader.css';

const Loader = () => {
	return (
        <section className='h-[100vh] w-[100vw] flex justify-center items-center'>
		<div className="loader">
			<div className="tile"></div>
		</div>
        </section>
	);
};

export default Loader;
