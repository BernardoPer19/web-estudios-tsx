import { Cursos } from '../components/Student/Cursos'
import { StudentData } from '../components/Student/StudentData'

const StudentPage = () => {
  return (
    <div  style={{ backgroundColor: "#161A30" }} className='h-screen'>
      <StudentData/>
      <Cursos/>
    
    </div>
  )
}

export default StudentPage