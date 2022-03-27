import { Navigate } from "react-router-dom"


export const PrivateRoute=({children})=>{

      const registerDetail = JSON.parse(
        localStorage.getItem("registerDetail") || false
      );
      const loggedInUser=localStorage.getItem('VIITCUR')

    return ( <>{ loggedInUser && registerDetail.find((x)=>x.email ===loggedInUser) ? children : <Navigate to="/404-page-not-found"/>} </>)
}