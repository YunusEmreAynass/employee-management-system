import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.users.token);
    if (!token) {
        return <Navigate to="/signin" replace />;
    }
    return children;
};

export const ProtectedAdmin = ({ children }) => {
    const userType = useSelector((state) => state.users.userType);
    if (userType !== 'ADMIN' && userType !== 'MANAGER') {
        return <Navigate to="/" replace />;
    }
    return children;
}

export const ProtectedManager = ({ children }) => {
    const userType = useSelector((state) => state.users.userType);
    if (userType !== 'MANAGER') {
        return <Navigate to="/" replace />;
    }
    return children;
}