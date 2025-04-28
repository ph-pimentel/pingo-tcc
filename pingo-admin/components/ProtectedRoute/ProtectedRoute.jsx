import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles, children }) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const userRole = decoded.TipoUsuario;

        // Verifica se o usuário tem permissão para acessar a rota
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return <Navigate to="/unauthorized" replace />
        }


        return children ? children : <Outlet/>;
    }catch (e) {
        console.error("Token inválido:", e);
        localStorage.removeItem('token');
        return <Navigate to="/" replace />
    }
}