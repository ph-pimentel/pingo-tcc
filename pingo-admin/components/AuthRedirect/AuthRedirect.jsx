
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthRedirect = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        
        if(token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000; //seg

                if (decoded.exp && decoded.exp > now) {
                    //Verifica se está valido
                    navigate("/home");
                }
            }catch(error) {
                console.error("Erro ao decodificar o token:", error);
                //Se for inválido leva para o Login
            }
         }
    }, [navigate]);
        return children;
    }

export default AuthRedirect