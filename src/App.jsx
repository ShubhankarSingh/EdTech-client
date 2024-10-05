import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
//import '@fotawesome/fontawesome-free/css/all.min.css';
//import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import '@popperjs/core'
import Registration from "./components/auth/Registration"
import Login from "./components/auth/Login"
import AddCourse from "./components/course/AddCourse"
import AddVideos from "./components/course/AddVideos"
import Courses from "./components/course/Courses"
import CourseDescription from "./components/course/CourseDescription"
import StreamLecture from "./components/course/StreamLecture"
import NavBar from "./components/layout/NavBar"
import { AuthProvider, useAuth } from "./components/auth/AuthProvider"
import Profile from "./components/auth/Profile"
import InstructorInterface from "./components/users/InstructorInterface"
import AddReview from "./components/course/AddReview"


function App() {
  
  return (
    <main>

      <AuthProvider>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/register" element={ <Registration/> }></Route>
          <Route path="/login" element={ <Login/> }></Route>
          <Route path="/user/profile" element={ <Profile/> }></Route>
          
          <Route path="/course/add-course" element={ <AddCourse/> }></Route>
          <Route path="/courses/:category" element={ <Courses/> }></Route>
          <Route path="/course/:title" element={ <CourseDescription/> }></Route>
          <Route path="/course/:title/lesson/:videoId" element={ <StreamLecture/> }></Route>
          <Route path="/course/:courseId/:title/add-lecture" element={ <AddVideos/> }></Route>
          <Route path="/course/:courseId/:title/add-review" element={ <AddReview/> }></Route>

          <Route path="/instructor/courses/" element={<InstructorInterface/>} ></Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
      
    </main>
  )
}

export default App
