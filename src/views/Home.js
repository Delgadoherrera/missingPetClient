import { useAuthContext } from "../contexts/authContext"
import NavBar from './PublicNavbar'
import Dog from '../assets/img/cachorros.jpg'
import '../assets/Home.css'

export default function Home() {
    const { login } = useAuthContext();
    return (
        <div className="homeBody">
            <NavBar />
            <img className="BackGroundHome" src={Dog}></img>

        </div>


    )
}

