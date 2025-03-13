import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [studentName, setStudentName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [round1Marks, setRound1Marks] = useState("");
  const [round2Marks, setRound2Marks] = useState("");
  const [round3Marks, setRound3Marks] = useState("");
  const [technicalRoundMarks, setTechnicalRoundMarks] = useState("");
  const [students , setStudents] = useState([])
  
  useEffect(()=>{ 
    async function fetchStudents() {
      //@ts-ignore
      const res =await axios.get('http://localhost:3000/students')
      setStudents(res.data)
    }
    fetchStudents()
  },[ , handleSubmit])

  async function handleSubmit() {
    const StudentData = { 
      studentName,
      collegeName,
      round1Marks: parseFloat(round1Marks),
      round2Marks: parseFloat(round2Marks),
      round3Marks: parseFloat(round3Marks),
      technicalRoundMarks: parseFloat(technicalRoundMarks),

    }
    await axios.post('http://localhost:3000/add-student' , StudentData).then(response =>console.log(response));
    alert("done")
    
    setStudentName("");
    setCollegeName("");
    setRound1Marks("");
    setRound2Marks("");
    setRound3Marks("");
    setTechnicalRoundMarks("");

    
    
  }
  //@ts-ignore
  const listitem = students?.map(user => <li key={user.id}>{user.studentName} : {user.collegeName} : Total Marks :  {user.totalMarks} :{user.result} </li>)
  
  return (
    <>
      
      <div className='h-screen w-full flex flex-col items-center justify-center'>
        <h1 className='Heading mt-40 mb-10'>Enter Your details</h1>

        <div className='height-1/2'>
        <input className='rounded-md width-1/3 height-1 border-2 px-3 py-2 m-1' type="text" placeholder='enter name' value={studentName} onChange={(e)=> setStudentName(e.target.value)}/>
        </div>
      
        <br />
        <input className='rounded-md width-1/3 height-1 border-2 px-3 py-2 m-1'  type="text" placeholder='enter college' value={collegeName} onChange={(e)=> setCollegeName(e.target.value)}/>
        <br />
        <input className='rounded-md width-1/3 height-1 border-2 px-3 py-2 m-1'  type="text" placeholder='enter round1marks' value={round1Marks} onChange={(e)=> setRound1Marks(e.target.value)}/>
        <br />
        <input className='rounded-md width-1/3 height-1 border-2 px-3 py-2 m-1'  type="text" placeholder='enter round2marks' value={round2Marks} onChange={(e)=> setRound2Marks(e.target.value)}/>
        <br />
        <input className='rounded-md width-1/3 height-1 border-2 px-3 py-2 m-1'  type="text" placeholder='enter round3marks' value={round3Marks} onChange={(e)=> setRound3Marks(e.target.value)}/>
        <br />
        <input className='rounded-md width-1/3 height-1 border-2 px-3 py-2 m-1'  type="text" placeholder='enter technical round marks' value={technicalRoundMarks} onChange={(e)=> setTechnicalRoundMarks(e.target.value)}/>

        <br />
        <button onClick={handleSubmit}>Submit</button>
        <br />

        <br />
        <br />
        <div className='p-3 m-3'>
        <h1 className='Heading'>RESULTS</h1>
        </div>
        <div className='flex flex-col items-center justify-center'>
          {listitem}
        </div>
      </div>
    </>


  )
}

export default App
