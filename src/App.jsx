import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Pedidos from './Pages/Pedidos'
import { Navbar } from './Components/Navbar'


function App() {
  return (
    <BrowserRouter>
        <Navbar   />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/pedidos' element={<Pedidos/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
