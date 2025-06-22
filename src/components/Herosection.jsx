import "./Herosection.css";
import heroImage from "../assets/images/heroimage.png";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero-section" data-testid="hero-section">
        <div className="hero-section-left">
          <h1 className="hero-heading">Welcome to Quickshop.</h1>
          <p className="hero-paragraph">
            This is a fake store which has items fetched through the fake store
            api. This site isnt real. This is just a filler text for the landing
            page of this project.
          </p>
          <button
            className="start-shopping-button"
            onClick={() => {
              navigate("/Products");
            }}
          >
            START SHOPPING
          </button>
        </div>
        <div className="hero-section-right">
          <img src={heroImage} alt="hero-image" className="hero-image" />
        </div>
      </div>
    </>
  );
}

export { Herosection };
