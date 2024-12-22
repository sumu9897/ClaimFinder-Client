import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home'
import Login from '../pages/Authentication/Login'
import Register from '../pages/Authentication/Register'
import ErrorPage from '../pages/ErrorPage'
import PrivateRoute from './PrivateRoute'
import AddItemPage from '../pages/AddItemPage'
import AllRecoveredPage from '../pages/AllRecoveredPage'
import MyItemsPage from '../pages/MyItemsPage'
import AllItemsPage from '../pages/AllItemsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Register />,
      },
      {
        path: '/allItems',
        element: <AllItemsPage/>
      },
      {
        path: 'addItem',
        element: <PrivateRoute><AddItemPage/></PrivateRoute>
      },
      {
        path: '/allRecovered',
        element: <PrivateRoute><AllRecoveredPage/></PrivateRoute>
      },
      {
        path: '/myItems',
        element: <PrivateRoute><MyItemsPage/></PrivateRoute>
      },
      
      
    ],
  },
])

export default router
