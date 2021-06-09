import './App.css';
import { Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
