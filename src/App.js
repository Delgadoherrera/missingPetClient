import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LOGIN, LOGOUT, PRIVATE, REGISTER, MAP } from './config/routes/paths'
import { AuthContextProvider } from './contexts/authContext'
import PublicRoute from './components/router/PublicRoute'
import PrivateRoute from './components/router/PrivateRoute'
import Private from './views/Private'
import Home from './views/Home'
import Logout from './components/Logout'
import './App.css'




function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path={PRIVATE} element={<PrivateRoute />}>
            <Route path={PRIVATE} element={<Private />} />
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
