import "./ShoppingBagComponent.css"
import deleteicon from '../assets/icons/deleteicon.svg';
import plusIcon from "../assets/icons/plus.svg";
import minusIcon from "../assets/icons/minus.svg";


function ShoppingbagComponent({ shoppingBag }) {
    return <>
        <h2 className="shopping-bag-heading">Shopping bag</h2>
        <div className="shopping-bag-container">
            <div className="shopping-bag-items">
                {shoppingBag.map((purchasedItem) => {
                    return <div className="purchased-item-div" key={purchasedItem.itemId}>

                        <img src={purchasedItem.itemImage} alt="purchased-item" className="purchased-itemimage" />

                        <p className="purchased-item-name">{purchasedItem.itemName}</p>
                        <div className="quantity-div">
                            <img src={minusIcon} className="minus-icon quantity-icons" alt="minus-icon" />

                            <p className="purchased-item-quantity">{purchasedItem.quantity}</p>
                            <img src={plusIcon} className="plus-icon quantity-icons" alt="plus-icon" />
                        </div>

                        <p className="purchased-item-price">$ {purchasedItem.quantity * purchasedItem.itemPrice}</p>

                        <img src={deleteicon} className="delete-item-icon" alt="del-icon" />

                    </div>
                })}
            </div>
            <div className="shopping-bag-total">
                <h2 className="shopping-bag-total-heading">Order Summary</h2>
                <h3 className="shopping-bag-total-cost">$ 335.2</h3>
                <div className="shopping-bag-subtotal-div">
                    <p>Subtotal</p>
                    <p>$ 19</p>
                </div>
                <div className="shopping-bag-tax-div">   
                    <p>Tax</p>
                    <p>$ 23</p>
                </div>
                <hr />
                <div className="shopping-bag-costinfo-div">
                    <h3 className="total-heading">Total</h3>
                    <p className="total-paragraph">$ 53</p> 
                </div>
                <button className="checkout-button">Checkout</button>
            </div>

        </div>

    </>
}


export { ShoppingbagComponent }