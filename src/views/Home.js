import { useAuthContext, AuthContextProvider, AuthContext } from "../contexts/authContext"
import UserLogin from '../components/UserLogin'
import NavBar from './PublicNavbar'

export default function Home() {
    const { login } = useAuthContext();
    return (
        <div>
            <NavBar />


        </div>


    )
}

