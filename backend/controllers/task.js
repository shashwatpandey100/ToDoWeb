import Task from '../models/task.js';
import createError from '../utils/createError.js';

export const createTask = async (req, res, next) => {
	try {
		const newTask = new Task({
			title: req.body.title,
			description: req.body.description,
			deadline: req.body.deadline,
			user: req.user.id,
			completed: req.body.completed,
		});
		const savedTask = await newTask.save();
		return res.status(201).json(savedTask);
	} catch (err) {
		return next(err);
	}
};

export const getAllTasks = async (req, res, next) => {
	try {
		const allTasks = await Task.find({ user: req.user.id });
		return res.status(200).json(allTasks);
	} catch (err) {
		return next(err);
	}
};

export const updateTask = async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.taskId).exec();
		if (!task) {
			return next(createError({ message: 'Task not found', status: 404 }));
		}
		if (task.user.toString() !== req.user.id) {
			return next(createError({ message: 'Not authorized', status: 401 }));
		}

		const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
			title: req.body.title,
			description: req.body.description,
			deadline: req.body.deadline,
			completed: req.body.completed,
		});
		return res.status(200).json(updatedTask);
	} catch (err) {
		return next(err);
	}
};

export const deleteTask = async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.taskId).exec();
		if (!task) {
			return next(createError({ message: 'Task not found', status: 404 }));
		}
		if (task.user.toString() !== req.user.id) {
			return next(createError({ message: 'Not authorized', status: 401 }));
		}
		await Task.findByIdAndDelete(req.params.taskId);
        return res.status(200).json({ message: 'Task deleted successfully' });
	} catch (err) {
		return next(err);
	}
};
