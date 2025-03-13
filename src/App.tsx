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

  function check(){ 
      const round1 = parseFloat(round1Marks);
      const round2 = parseFloat(round2Marks);
      const round3 = parseFloat(round3Marks);
      const technical = parseFloat(technicalRoundMarks);

      // Check if any value is greater than 10 (except technical marks)
    if (
        round1 > 10 || round1 < 0 ||
        round2 > 10 || round2 < 0 ||
        round3 > 10 || round3 < 0 ||
        technical > 20 || technical < 0 // Assuming technical marks should be max 20
      ) {
        alert("Marks must be between 0 and 10 (Technical Marks: 0-20)");
        return;
      }
      else {
        handleSubmit()
      }
  }
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
  const listitem = students?.map(user => <ul key={user.id}>{user.studentName} : {user.collegeName} : Total Marks :  {user.totalMarks} :{user.result} </ul>)
  
  return (
    <>
      
      <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 text-white'>
        <div className='bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full'>

          <h1 className=' text-3xl font-bold text-white text-center mb-6 opacity-100 transition-opacity duration-1000 ease-in-out animate-[fadeIn_1.5s_ease-in-out_forwards]'>Enter Your details</h1>
        
         
          <div className='flex  flex-col items-center display-center'>
            <input className='w-5/6 p-2 border-b-2 border-gray-400 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-all duration-300 mb-5' type="text" placeholder='enter name' value={studentName} onChange={(e)=> setStudentName(e.target.value)}/>
          
            <input className='w-5/6 p-2 border-b-2 border-gray-400 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-all duration-300 mb-5' type="text" placeholder='enter college' value={collegeName} onChange={(e)=> setCollegeName(e.target.value)}/>
            
            <input className='w-5/6 p-2 border-b-2 border-gray-400 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-all duration-300 mb-5' type="text" placeholder='enter round1marks' value={round1Marks} onChange={(e)=> setRound1Marks(e.target.value)}/>
            
            <input className='w-5/6 p-2 border-b-2 border-gray-400 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-all duration-300 mb-5'   type="text" placeholder='enter round2marks' value={round2Marks} onChange={(e)=> setRound2Marks(e.target.value)}/>
            
            <input className='w-5/6 p-2 border-b-2 border-gray-400 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-all duration-300 mb-5' type="text" placeholder='enter round3marks' value={round3Marks} onChange={(e)=> setRound3Marks(e.target.value)}/>
            
            <input className='w-5/6 p-2 border-b-2 border-gray-400 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-all duration-300 mb-5' type="text" placeholder='enter technical round marks' value={technicalRoundMarks} onChange={(e)=> setTechnicalRoundMarks(e.target.value)}/>
          </div>
        
          <div className='w-full flex items-center justify-end'>
              <button className='mt-5 w px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition duration-300 ease-in-out shadow-lg ' onClick={check}>Submit</button>
          </div>
      
        </div>
        
          <div className='ml-10 p-3 m-3 w-1/3 min-h-141 rounded-xl flex flex-col items-center justify-center bg-gray-900 backdrop-blur-md rounded'>
            <h1 className='text-3xl p-6'>RESULTS : </h1>
            <div className='flex flex-col items-center justify-center'>
            
              {/* {listitem} */}
              <div className="w-full flex flex-col items-center">


                <table className="border-collapse border border-gray-400 text-white">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-400 p-2">Name</th>
                      <th className="border border-gray-400 p-2">College</th>
                      <th className="border border-gray-400 p-2">Total Marks</th>
                      <th className="border border-gray-400 p-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((user) => (
                      <tr key={user.id} className="text-center">
                        <td className="border border-gray-400 p-2">{user.studentName}</td>
                        <td className="border border-gray-400 p-2">{user.collegeName}</td>
                        <td className="border border-gray-400 p-2">{user.totalMarks}</td>
                        <td className={`border border-gray-400 p-2 ${user.result === 'Selected' ? 'text-green-400' : 'text-red-400'}`}>
                          {user.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
          
      </div>
      
    </>


  )
}

export default App
