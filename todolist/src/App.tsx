import { Route, Routes } from 'react-router-dom'
import './App.css'
import ToDo from './pages/ToDo'
import Login from './pages/Login'

function App() {
  return(
    <Routes>
      <Route path="/*" element={ <div>Home Page</div> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/todo" element={<ToDo/> } />
    </Routes>
  )
}

export default App
