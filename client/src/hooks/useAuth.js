import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export function useProtectedRoute() {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]
)
}