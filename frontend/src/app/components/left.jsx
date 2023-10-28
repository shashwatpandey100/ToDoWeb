"use client";
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { navState } from '../recoilState.js';
import { CgArrowLeft, CgProfile } from 'react-icons/cg';
import { CiImageOn, CiStickyNote, CiUser, CiMail } from 'react-icons/ci';
import { CgCalendarToday, CgCalendarNext } from 'react-icons/cg';
import { AiOutlineSetting } from 'react-icons/ai';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import axios from 'axios';
import toast from 'react-hot-toast';
import './auth.css';

const Left = () => {
	const [settingOpen, setSettingOpen] = useState(false);

	const [nav, setNav] = useRecoilState(navState);

	const toggleSetting = () => {
		setSettingOpen(!settingOpen);
	};

	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const { data } = await axios.get('/api/users/me');
			setUser(data);
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const logout = async () => {
		try {
			await axios.post('/api/auth/logout');
			toast.success('Logged out successfully');
			setTimeout(() => {
				window.location.reload();
			}, 500);
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	const update = async e => {
		e.preventDefault();

		const user = {
			image: e.target.image.value,
			name: e.target.username.value,
			email: e.target.email.value,
		};

		try {
			await axios.put('/api/users/me', user);
			toast.success('Updated successfully');
			getUser();
		} catch (error) {
			toast.error('something went wrong');
		}
	};

	return (
		<section className="h-full bg-bgWhite w-[24%] rounded-[10px] relative p-[10px] flex flex-col">
			<div id="top" className="h-[100%] w-fullp-[10px]">
				{settingOpen ? (
					<div>
						<form className="login-div relative" onSubmit={update}>
							<div className="logo overflow-hidden mt-[20px]">
								<img
									src={user?.image}
									alt="profile-image"
									className="w-full h-full object-cover"
								/>
							</div>
							<span
								className="absolute top-[20px] left-[20px] cursor-pointer text-[25px] text-textColSp transform transition-transform duration-500 hover:-translate-x-2"
								onClick={() => setSettingOpen(false)}
							>
								<CgArrowLeft />
							</span>
							<div className="fields">
								<div className="username">
									<span className="flex items-center justify-center">
										<CiImageOn />
									</span>
									<input
										type="text"
										name="image"
										className="user-input"
										placeholder="Image URL"
										defaultValue={user?.image}
									/>
								</div>
								<div className="username">
									<span className="flex items-center justify-center">
										<CiUser />
									</span>
									<input
										type="username"
										name="username"
										className="user-input"
										placeholder="Username"
										defaultValue={user?.name}
									/>
								</div>
								<div className="password">
									<span className="flex items-center justify-center">
										<CiMail/>
									</span>
									<input
										type="email"
										name="email"
										className="user-input overflow-hidden"
										placeholder="email"
										defaultValue={user?.email}
									/>
								</div>
							</div>
							<button type="submit" className="signin-button">
								Update
							</button>
						</form>
					</div>
				) : (
					<div className="h-[100%] w-full flex flex-col ">
						<div className="logo overflow-hidden">
							<img
								src={user?.image}
								alt="profile-image"
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="rounded-[3px] border px-[10px] py-[7px] my-[30px]">
							<span className="font-[400] text-[13px] text-gray-400">
								<CgProfile className="inline-block mr-[15px] mb-[3px] text-[20px]" />
								{user?.name}
							</span>
						</span>

						<span className="font-[500] text-[12px] text-gray-500 uppercase mb-[10px]">
							Tasks
						</span>
						<div className="w-full max-h-max flex flex-col gap-[2px] mb-[20px]">
							<span className='rounded-[3px] border-none px-[10px] py-[7px] hover:bg-[#ebebeb] cursor-pointer group' 
							onClick={()=>setNav('all')}
							{
								...nav==='all' && {
									style: {
										backgroundColor: '#ebebeb',
										fontWeight: '600'
									}
								}
							}
							>
								<span className="text-[13px] text-textColSp group-hover:font-[600]">
									<CiStickyNote className="inline-block mr-[15px] mb-[3px] text-[20px]" />
									All
								</span>
							</span>
							<span className='rounded-[3px] border-none px-[10px] py-[7px] hover:bg-[#ebebeb] cursor-pointer group' 
							onClick={()=>setNav('today')} 
							{
								...nav==='today' && {
									style: {
										backgroundColor: '#ebebeb',
										fontWeight: '600'
									}
								}
							}
							>
								<span className="font-[400] text-[13px] text-textColSp group-hover:font-[600]" >
									<CgCalendarToday className="inline-block mr-[15px] mb-[3px] text-[20px]" />
									Today
								</span>
							</span>
							<span className='rounded-[3px] border-none px-[10px] py-[7px] hover:bg-[#ebebeb] cursor-pointer group' 
							onClick={()=>setNav('upcoming')}
							{
								...nav==='upcoming' && {
									style: {
										backgroundColor: '#ebebeb',
										fontWeight: '600'
									}
								}
							}
							>
								<span className="font-[400] text-[13px] text-textColSp group-hover:font-[600]" >
									<CgCalendarNext className="inline-block mr-[15px] mb-[3px] text-[20px]" />
									Upcoming
								</span>
							</span>
						</div>
					</div>
				)}
			</div>

			<div id="bottom" className="h-[82px] w-full flex flex-col gap-[2px]">
				<span className="rounded-[3px] h-[40px] w-full border-none px-[10px] py-[7px] cursor-pointer">
					<span
						className="font-[400] text-[13px] text-textColSp"
						onClick={toggleSetting}
					>
						<AiOutlineSetting className="inline-block mr-[15px] mb-[3px] text-[20px]" />
						Settings
					</span>
				</span>
				<span className="rounded-[3px] h-[40px] border-none px-[10px] py-[7px] cursor-pointer">
					<span
						className="font-[400] text-[13px] text-textColSp"
						onClick={logout}
					>
						<RiLogoutBoxRLine className="inline-block mr-[15px] mb-[3px] text-[20px]" />
						Sign out
					</span>
				</span>
			</div>
		</section>
	);
};

export default Left;
