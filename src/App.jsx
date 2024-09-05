import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import Registration from "./components/auth/Registration"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={ <Registration/> }></Route>
        </Routes>
      </BrowserRouter>
      
    </main>
  )
}

export default App
