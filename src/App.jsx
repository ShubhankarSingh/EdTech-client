import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import Registration from "./components/auth/Registration"
import AddCourse from "./components/course/AddCourse"
import AddVideos from "./components/course/AddVideos"
import Courses from "./components/course/Courses"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={ <Registration/> }></Route>
          <Route path="/course/add-course" element={ <AddCourse/> }></Route>
          <Route path="/courses/:category" element={ <Courses/> }></Route>
          <Route path="/course/add-course/:courseId/add-lecture" element={ <AddVideos/> }></Route>
        </Routes>
      </BrowserRouter>
      
    </main>
  )
}

export default App
