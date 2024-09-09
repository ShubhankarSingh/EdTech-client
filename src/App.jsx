import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import Registration from "./components/auth/Registration"
import AddCourse from "./components/course/AddCourse"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={ <Registration/> }></Route>
          <Route path="/course/add-course" element={ <AddCourse/> }></Route>
        </Routes>
      </BrowserRouter>
      
    </main>
  )
}

export default App
