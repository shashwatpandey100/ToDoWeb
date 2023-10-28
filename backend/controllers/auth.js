import createError from '../utils/createError.js';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
	if (!req.body.name || !req.body.email || !req.body.password) {
		return next(
			createError({ message: 'Please fill all required fields', status: 400 })
		);
	}
	if (!isPasswordComplex(password)) {
        return next(createError({ message: 'Password must be minimum 10 characters long and should include atleast one number and a special character', status: 400 }));
    }
	try {
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(req.body.password, salt);

		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});

		await newUser.save();
		res.status(201).json({ message: 'User registered successfully.' });
	} catch (error) {
		return next(error);
	}
};

function isPasswordComplex(password) {
    if (password.length < 10) {
        return false;
    }
    if (!/\d/.test(password)) {
        return false;
    }
    const specialCharacters = /[!@#$%^&*]/;
    if (!specialCharacters.test(password)) {
        return false;
    }
    return true;
}

export const login = async (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return next(
			createError({ message: 'Please fill all required fields', status: 400 })
		);
	}
	try {
		const user = await User.findOne({ email: req.body.email }).select(
			'name email password'
		);
		if (!user) {
			return next(createError({ message: 'Invalid Credentials', status: 404 }));
		}
		const isPasswordCorrect = await bcryptjs.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordCorrect) {
			return next(createError({ message: 'Password incorrect!', status: 400 }));
		}
		const payload = {
			id: user._id,
			name: user.name,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});
		return res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json({ message: 'Logged in successfully.' });
	} catch (error) {
		return next(error);
	}
};

export const logout = async (req, res, next) => {
	res.clearCookie('access_token');
	return res.status(200).json({ message: 'Logged out successfully.' });
};

export const isLoggedIn = async (req, res) => {
	const token = req.cookies.access_token;
    if(!token) {
        return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err) => { 
        if(err){
            return res.json(false);
        }else {
            return res.json(true);
        }
    });
};
