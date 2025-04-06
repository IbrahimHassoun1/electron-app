import './App.css'
import AuthComponent from './components/AuthComponent'
import { HashRouter, Routes, Route } from "react-router-dom";
import HomeComponent from './components/Home';

function App() {


  return (
    <div className='app-component'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<AuthComponent/>}/>
          <Route path='/home' element={<HomeComponent/>}/>
        </Routes>
      </HashRouter>
      
    </div>
  )
}

export default App
