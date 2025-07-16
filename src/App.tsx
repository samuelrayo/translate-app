/* eslint-disable react/react-in-jsx-scope */

// import translateText from '../backend/src/services/translateText'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Translate from './pages/Translate'
import Historial from './pages/Historial'
import { Login } from './pages/Login'



function App() {

  return (
    <div className='flex justify-between w-full h-dvh '>
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path='/login' element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Translate />} />
          <Route path="history" element={<Historial />} />
        </Route>
      </Routes>
    </div>

  )
}

export default App
