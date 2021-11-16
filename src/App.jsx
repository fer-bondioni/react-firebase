import './App.css';
import {Login} from './components/Login';
import {Menu}  from './components/Menu';
import {Admin} from './components/Admin';
import {Inicio} from './components/Inicio';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'

function App() {
  return (
    <Router className="container">
      <Menu/>
        <Switch>
            <Route exact path="/" component={Inicio}></Route>
            <Route exact path="/admin" component={Admin}></Route>
            <Route exact path="/login" component={Login}></Route>
        </Switch>
    </Router>
  );
}

export default App;
