import { Link } from "react-router-dom"


const Home=()=>{

    return(
        <div>
            Welcome to the practical round!
                <br/>
            <Link to="/register">Register</Link>
            <br/>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home