import smileIcon from "../assets/icons/smile.svg";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();
  const { productList, shoppingBag, setShoppingBag } = useOutletContext();

  return (
    <>
      <div className="checkout-div">
        <h2 className="checkout-text checkout-heading">
          Thanks for the purchase
        </h2>
        <img src={smileIcon} alt="smile-icon" className="smile-icon" />
        <p className="checkout-text">
          Hope you had a lovely time shopping here. I wish you will come back
          here again. Bye! 🥹
        </p>
        <button
          className="go-home-checkout-button"
          onClick={() => {
            navigate("/");
            setShoppingBag([]);
          }}
        >
          GO TO HOME
        </button>
      </div>
    </>
  );
}

export { CheckoutPage };
