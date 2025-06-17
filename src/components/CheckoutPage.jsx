import tickIcon from "../assets/icons/tickicon.svg"
import "./CheckoutPage.css"


function CheckoutPage() {
    return <>
        <div className="checkout-div">
        <h2 className="checkout-text">Thanks for the purchase</h2>
        <img src={tickIcon} alt="tick-icon" className="tick-icon"/>
        <p className="checkout-text">Hope you had a lovely time shopping here. I wish you will come back here again. Bye! 🥹</p>
        </div> 
    </>
}


export {CheckoutPage}