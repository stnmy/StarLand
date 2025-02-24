import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/routes/Routes'
import { Provider } from 'react-redux'
import { store } from './app/store/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position='top-right' hideProgressBar theme='colored'></ToastContainer>
      <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)
