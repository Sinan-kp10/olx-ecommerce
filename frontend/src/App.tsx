import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppRoute from "./route/AppRoute"


function App() {
  
  return (
    <>
      <AppRoute />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
