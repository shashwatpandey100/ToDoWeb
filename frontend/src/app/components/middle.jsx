'use client';
import React, { useEffect, useState } from 'react';
import { navState } from '../recoilState.js';
import { useRecoilValue } from 'recoil';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillSaveFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { DatePicker } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';

const Middle = () => {
	const nav = useRecoilValue(navState);

	const generateColor = index => {
		if (List.length === 0) {
			return 'bg-card1';
		}
		const colors = [
			'bg-card1',
			'bg-card2',
			'bg-card3',
			'bg-card4',
			'bg-card5',
			'bg-card6',
		];
		return colors[index % colors.length];
	};

	const [List, setList] = useState([]);
	const [tasksDueToday, setTasksDueToday] = useState([]);
	const [tasksDueTodayAndTomorrow, setTasksDueTodayAndTomorrow] = useState([]);

	const getList = async () => {
		try {
			const { data } = await axios.get('/api/tasks/all');
			setList(data);
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		getList();
	}, []);

	const createTask = async taskData => {
		try {
			await axios.post('/api/tasks', taskData);
			toast.success('Task created successfully');
			getList();
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const deleteTask = async taskId => {
		try {
			await axios.delete(`/api/tasks/${taskId}`);
			toast.success('Task deleted successfully');
			getList();
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	const updateTask = async (taskId, taskData) => {
		try {
			await axios.put(`/api/tasks/${taskId}`, taskData);
			toast.success('Task updated successfully');
			getList();
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	const today = new Date().toISOString().split('T')[0];
	const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
		.toISOString()
		.split('T')[0];

	useEffect(() => {
		const tasksDueToday = List.filter(
			task => task.deadline.split('T')[0] === today
		);
		const tasksDueTodayAndTomorrow = List.filter(
			task =>
				task.deadline.split('T')[0] === today ||
				task.deadline.split('T')[0] === tomorrow
		);

		setTasksDueToday(tasksDueToday);
		setTasksDueTodayAndTomorrow(tasksDueTodayAndTomorrow);
	}, [List]);

	return (
		<section className="h-full w-[76%] flex flex-col bg-bgWhite rounded-[10px]">
			<section className="h-[5%] w-full flex items-center justify-between px-[10px]">
				<span className="font-[500] text-[12px] text-gray-500 uppercase">
					Tasks
				</span>
				<AiOutlinePlus className="text-[25px] text-textColSp cursor-pointer" />
			</section>
			<section className="h-[95%] w-full grid grid-cols-3 gap-[10px] p-[10px] overflow-x-hidden overflow-y-scroll">
				{nav === 'all' &&
					List.map((item, index) => (
						<Card
							key={item.id}
							color={generateColor(index)}
							data={List[index]}
							deleteTask={deleteTask}
							updateTask={updateTask}
						/>
					))}
				{nav === 'today' &&
					tasksDueToday.map((item, index) => (
						<Card
							key={item.id}
							color={generateColor(index)}
							data={List[index]}
							deleteTask={deleteTask}
							updateTask={updateTask}
						/>
					))}
				{nav === 'upcoming' &&
					tasksDueTodayAndTomorrow.map((item, index) => (
						<Card
							key={item.id}
							color={generateColor(index)}
							data={List[index]}
							deleteTask={deleteTask}
							updateTask={updateTask}
						/>
					))}
				<BlankCard createTask={createTask} />
			</section>
		</section>
	);
};

export default Middle;

const Card = ({ color, data, deleteTask, updateTask }) => {
	const deleteTaskHandler = async () => {
		deleteTask(data._id);
	};

	const handleFormSubmit = async e => {
		e.preventDefault();

		const taskData = {
			title: e.target.title.value,
			description: e.target.description.value,
			deadline: e.target.deadline.value,
			completed: false,
		};

		updateTask(data._id, taskData);
	};

	return (
		<div
			className={`w-[100%] min-h-[300px] max-h-[300px] rounded-[10px] flex flex-col ${color} relative`}
		>
			<form className="w-full p-4 relative" onSubmit={handleFormSubmit}>
				<div className="mb-[4px]">
					<DatePicker
						style={{ width: '80%' }}
						showTime
						name="deadline"
						autoFocus={false}
						placeholder={data?.deadline || 'deadline'}
					/>
				</div>
				<div className="mb-[4px]">
					<input
						type="text"
						id="title"
						name="title"
						placeholder="title"
						defaultValue={data?.title}
						className="w-full outline-none h-[40px] rounded border-none bg-transparent px-2 py-1"
					/>
				</div>
				<div className="mb-[4px]">
					<textarea
						id="description"
						name="description"
						placeholder="description"
						defaultValue={data?.description}
						className="w-full outline-none h-[150px] rounded border-none bg-transparent px-2 py-1 resize-none"
					/>
				</div>
				<div className="w-[40px] h-[40px] flex items-center justify-center absolute top-[10px] right-0 cursor-pointer">
					<button type="submit" className="text-[20px] text-textColSp">
						<BsFillSaveFill />
					</button>
				</div>
			</form>
			<div className="w-[45px] h-[45px] flex items-center justify-center absolute bottom-0 right-0 cursor-pointer">
				<span
					className="text-[24px] text-textColSp"
					onClick={deleteTaskHandler}
				>
					<MdDelete />
				</span>
			</div>
		</div>
	);
};

const BlankCard = ({ createTask }) => {
	const [isAdding, setIsAdding] = useState(false);

	const handleFormSubmit = async e => {
		e.preventDefault();

		const taskData = {
			title: e.target.title.value,
			description: e.target.description.value,
			deadline: e.target.deadline.value,
			completed: false,
		};

		createTask(taskData);
		setIsAdding(false);
	};

	return (
		<div className="w-[100%] min-h-[300px] max-h-[300px] rounded-[10px] bg-blankCard flex items-center justify-center cursor-pointer">
			{isAdding ? (
				<div className="w-[100%] min-h-[300px] max-h-[300px] rounded-[10px] flex flex-col relative">
					<form className="w-full p-4 relative" onSubmit={handleFormSubmit}>
						<div className="mb-[4px]">
							<DatePicker
								style={{ width: '80%' }}
								showTime
								name="deadline"
								autoFocus={false}
								placeholder="deadline"
							/>
						</div>
						<div className="mb-[4px]">
							<input
								type="text"
								id="title"
								name="title"
								placeholder="title"
								className="w-full outline-none h-[40px] rounded border-none bg-transparent px-2 py-1"
							/>
						</div>
						<div className="mb-[4px]">
							<textarea
								id="description"
								name="description"
								placeholder="description"
								className="w-full outline-none h-[150px] rounded border-none bg-transparent px-2 py-1 resize-none"
							/>
						</div>
						<div className="w-[40px] h-[40px] flex items-center justify-center absolute top-[10px] right-0 cursor-pointer">
							<button type="submit" className="text-[20px] text-textColSp">
								<BsFillSaveFill />
							</button>
						</div>
					</form>
					<div className="w-[45px] h-[45px] flex items-center justify-center absolute bottom-0 right-0 cursor-pointer">
						<span
							className="text-[24px] text-textColSp"
							onClick={() => setIsAdding(false)}
						>
							<MdDelete />
						</span>
					</div>
				</div>
			) : (
				<AiOutlinePlus
					className="text-[30px] text-textColSp"
					onClick={() => setIsAdding(true)}
				/>
			)}
		</div>
	);
};
