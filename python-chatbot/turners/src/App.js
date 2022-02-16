import './App.css';
import Homepage from './components/Homepage';
import Chatbox from './components/Chatbox';
import SellPage from './components/SellPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<> <Homepage /> <Chatbox /> </>}></Route>
        <Route path='/sell' element={<SellPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
