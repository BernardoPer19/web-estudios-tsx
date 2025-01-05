import { Route, Routes } from 'react-router-dom'
import './App.css'

import TeacherPage from './pages/TeacherPage'
import StudentPage from './pages/StudentPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <Routes>
      <Route element={<LoginPage/>} path='/'/>
      <Route element={<StudentPage/>} path='/student-page'/>
      <Route element={<TeacherPage/>} path='/teacher-page'/>
      </Routes>
    </>
  )
}

export default App
