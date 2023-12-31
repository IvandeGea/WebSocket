
import { Route, Redirect } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import { isUserAuthenticated } from './middlewares'
function App() {


  return (<div className="App">

 
  <Route path="/" component={HomePage} exact/>
  <Route path="/chat"
         render={() => ( isUserAuthenticated() ? <ChatPage /> : <Redirect to="/" /> )}
      />
    </div>
  );

}

export default App
