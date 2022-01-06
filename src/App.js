import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PokemonDetailPage from './pages/PokemonDetailPage';
import BasePage from './pages/BasePage';

function App() {
  return (
    
    <div className='app'>
    <h1>POKEMON CARDS</h1>
      <Router>
      <Routes>
        <Route exact path="/" element={<BasePage />}>
        </Route>
        <Route exact path="/:pokemon_id" element={<PokemonDetailPage />}>
        </Route>
      </Routes>
    </Router>
    </div>
        
      
    
  );
}

export default App;
