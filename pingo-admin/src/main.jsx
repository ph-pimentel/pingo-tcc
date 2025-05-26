import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, Outlet, RouterProvider} from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute.jsx'

import '../styles/global.css'
import Home from '../pages/Home/Home.jsx'
import QuadrasPub from '../pages/QuadrasPub/QuadrasPub.jsx'
import Users from '../pages/Users/Users.jsx'
import ErrorPage from '../pages/ErrorPage/ErrorPage.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Menu from '../components/Menu/Menu.jsx'
import Footer from '../components/Footer/Footer.jsx'
import Perfil from '../pages/Perfil/Perfil.jsx'
import ProprietarioLogin from '../pages/ProprietarioLogin/ProprietarioLogin.jsx'
import Proprietario from '../pages/Proprietario/Proprietario.jsx'
import QuadrasPriv from '../pages/QuadrasPriv/QuadrasPriv.jsx'
import Reserva from '../pages/Reserva/Reserva.jsx'
import SingleQuadraPub from '../pages/SingleQuadraPub/SingleQuadraPub.jsx'
import SingleQuadraPriv from '../pages/SingleQuadraPriv/SingleQuadraPriv.jsx'
import SingleUser from '../pages/SingleUser/SingleUser.jsx'
import Login from '../pages/Login/Login.jsx'
import Unauthorized from '../pages/Unauthorized/Unauthorized.jsx'
import AuthRedirect from '../components/AuthRedirect/AuthRedirect.jsx'
import MinhasQuadras from '../pages/MinhasQuadras/MinhasQuadras.jsx'

const Layout = () => {
  return (
    <div className="main">
      <Navbar/>
      <div className='container'>
        <div className='menuContainer'>
          <Menu/>
        </div>
        <div className='contentContainer'>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />, //Pagina de Erro
    children: [
      //Paginas Públicas que não contém o Layout do Admin
      {
        path: "/",
        element:(
          <Login/>
        ) 
      },
      {
        path: "/unauthorized",
        element: <Unauthorized/>
      },
    {
      // Paginas Privadas, só acessadas se fizer login com Layout
      //Através do allowedRoles posso gerenciar quem entra em qual página
    element:(
        <ProtectedRoute allowedRoles={['Admin', 'Proprietario']}>
          <Layout />
        </ProtectedRoute>
      ),
    children: [ 
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/users",
        element: <Users/>,
      },
      {
        path: "/quadraspub",
        element: <QuadrasPub/>,
      },
      {
        path: "/quadraspriv",
        element: <QuadrasPriv/>,
      },
      {
        path: "/settings",
        element: <Perfil/>,
      },
      {
        path: "/proplogin",
        element: <ProprietarioLogin/>,
      },
      {
        path: "/proprietario",
        element: <Proprietario/>,
      },
      {
        path: "/reserva",
        element: <Reserva/>,
      },
      {
        path: "/quadraspub/:id",
        element: <SingleQuadraPub/>
      },
      {
        path: "/quadraspriv/:id",
        element: <SingleQuadraPriv/>
      },
      {
        path: "/users/:id",
        element: <SingleUser/>
      },
    {
      element:(
        <ProtectedRoute allowedRoles={['Proprietario']}>
        </ProtectedRoute>
      ),
      children: [
      {
        path: "/minhas-quadras",
        element: <MinhasQuadras/>
      }
      ]
      },
    ]
  }
]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
