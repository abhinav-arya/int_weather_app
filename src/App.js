import React from 'react';
import './App.css';
import MainPage from './components/MainPage'
// import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <header>
        <h3>The Weather App <b>-</b> <i>Powered by OpenWeatherMap</i></h3> 
      </header>
      <MainPage/>
    </div>
  );
}

export default App;
