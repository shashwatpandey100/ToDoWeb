"use client";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default () => {
    const [auth, setAuth] = useState(null);

    const verifyAuth = async () => {
        try {
            const res = await axios.post('/api/auth/isLoggedIn');
            return res.data;
        } catch (error) {
            console.log(error);
            return false;
        }   
    };

    useEffect(()=> {
        (
            async () => {
                const data = await verifyAuth();
                setAuth(data);
            }
        )()
    });

    return { auth };
}