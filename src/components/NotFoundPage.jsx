import { Link } from "react-router-dom"
import sadIcon from "../assets/icons/sadicon.svg"
import "./NotFoundPage.css"
import { useNavigate } from "react-router-dom"

function NotFoundPage() {
    const navigate = useNavigate();
    return <>
        <div className="not-found-container">
            <h1 className="not-found-text">Error 404 - Page Not Found</h1>
            <p className="not-found-text">The page you are looking for does not exist.</p>
            <img src={sadIcon} alt="sad-icon" className="sad-icon"/>
            <button className="not-found-button" onClick={()=>{
                    navigate("/");
            }}>GO TO HOME</button>
        </div>
    </>
}


export { NotFoundPage }