import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import AuthProvider from './context/AuthContext'

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <AuthProvider>

      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>

    </AuthProvider>
  </QueryClientProvider>
)
