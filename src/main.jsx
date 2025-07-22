import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Lists from './S3Components/Lists.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // ✅ Layout wraps everything
    children: [
      {
        index: true,
        element: <App />,   // ✅ App will render inside <Outlet />
      },
      {
        path: "lists",
        element: <Lists />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router} />
  </StrictMode>,
)
