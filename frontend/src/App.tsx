import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
}
export default App
