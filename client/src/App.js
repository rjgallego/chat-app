import './App.css';
import { Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route path="/sign-up" component={SignUp}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
