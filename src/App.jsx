import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './components/Routers'
import HeaderSub from './components/HeaderSub'


function App() {


  

  return (
    <>
      <HeaderSub />
      <RouterProvider router={router} />
    </>
  )
}

export default App
