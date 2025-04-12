import './App.css'
import AuthComponent from './features/auth/page'
import { HashRouter, Routes, Route } from "react-router-dom";
import HomeComponent from './features/gallery/page';

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
