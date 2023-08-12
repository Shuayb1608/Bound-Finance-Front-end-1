import { Route, Router, Routes } from 'react-router-dom';
import './styles/App.css';
import { MakerDao } from './components/MakerDao';
import { StakingPart } from './Pages/stakingBCK'
import ProtectedRoute from './sections/ProtectedRoute';
import BCKETH from './Pages/BCKETH';
import DAO from './Pages/DAO';
import Exit from './Pages/Liquidations';
import HomePage from './Pages/Homepage';

function App() {
  return (
    <div className='mb-20'>
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
          <Route path='' element={<HomePage />}/>
            <Route path='/loan' element={<MakerDao />}/>
            <Route path="/bcketh" element={<BCKETH />} />
            <Route path='/staking' element={<StakingPart />} />
            <Route path="/dao" element={<DAO />} />
            <Route path="/liquidation" element={<Exit />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
