
import { Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

function App() {


  return (<div className="App">
  <nav>
    {/* <Link href="/home">Home</Link>
    <Link href="/chat">Chat</Link> */}
  </nav>
 
  <Route path="/" component={HomePage} exact/>
  <Route path="/chat" component={ChatPage}/>
  </div>)

}

export default App
