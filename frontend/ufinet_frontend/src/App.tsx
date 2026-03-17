
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginForm } from './pages/LoginForm'
import { RegisterForm } from './pages/RegisterForm'
import { CarPage } from './pages/CarPage'
import ProtectedRoute from './components/ProtectedRoute'
import { CarForm } from './pages/CarForm'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/register' element={<RegisterForm/>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/car-page" element={<CarPage/>}></Route>
          <Route path="/car-form" element={<CarForm/>}></Route>
          <Route path="/car-form/:id" element={<CarForm/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
