import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Homepage from './Pages/Homepage';
import {Route} from "react-router-dom";
import Chatpage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Route exact path = "/" component = { Homepage }/>
      <Route exact path = "/chats" component = { Chatpage }/>
    </div>
  );
}

export default App;
