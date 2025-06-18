import "./ShoppingBagComponent.css";
import deleteicon from "../assets/icons/deleteicon.svg";
import plusIcon from "../assets/icons/plus.svg";
import minusIcon from "../assets/icons/minus.svg";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const TAX = 20.0;


function getTotal(array) {
  
  let result = 0;
  array.forEach((item) => {
    result = item.quantity * item.itemPrice + result;
  });
  return result;
}

function ShoppingbagComponent() {
  let navigate = useNavigate("");
  
  const { productList, shoppingBag, setShoppingBag } = useOutletContext();

  return (
    <>
      <h2 className="shopping-bag-heading">Shopping bag</h2>
      <div className="shopping-bag-container">
        <div className="shopping-bag-items">
          {shoppingBag.length === 0 && <h2 className="empty-shopping-bag empty-shopping-heading">🛒 Your bag is empty!</h2>}
          {shoppingBag.length === 0 && <p className="empty-shopping-bag empty-shopping-paragraph">Don’t leave it hanging—add something you love and make it happy. Your perfect pick might be just a scroll away. Go on, treat yourself—you deserve it!</p>}

          {shoppingBag.map((purchasedItem) => {
            return (
              <div className="purchased-item-div" key={purchasedItem.itemId}>
                <img
                  src={purchasedItem.itemImage}
                  alt="purchased-item"
                  className="purchased-itemimage"
                />

                <p className="purchased-item-name">{purchasedItem.itemName}</p>
                <div className="quantity-div">
                  <img
                    src={minusIcon}
                    className="minus-icon quantity-icons"
                    alt="minus-icon"
                    onClick={() => {
                      const index = shoppingBag.findIndex(
                        (item) => item.itemId === purchasedItem.itemId,
                      );

                      setShoppingBag((prevBag) => {
                        let updatedBag = [...prevBag];
                        let itemToUpdate = updatedBag[index];
                        if (itemToUpdate.quantity === 1) {
                          updatedBag[index] = {
                            ...itemToUpdate,
                            quantity: itemToUpdate.quantity,
                          };
                        } else {
                          updatedBag[index] = {
                            ...itemToUpdate,
                            quantity: itemToUpdate.quantity - 1,
                          };
                        }

                        return updatedBag;
                      });
                    }}
                  />

                  <p className="purchased-item-quantity">
                    {purchasedItem.quantity}
                  </p>
                  <img
                    src={plusIcon}
                    className="plus-icon quantity-icons"
                    alt="plus-icon"
                    onClick={() => {
                      const index = shoppingBag.findIndex(
                        (item) => item.itemId === purchasedItem.itemId,
                      );

                      setShoppingBag((prevBag) => {
                        let updatedBag = [...prevBag];
                        let itemToUpdate = updatedBag[index];
                        if (itemToUpdate.quantity === 5) {
                          updatedBag[index] = {
                            ...itemToUpdate,
                            quantity: itemToUpdate.quantity,
                          };
                        } else {
                          updatedBag[index] = {
                            ...itemToUpdate,
                            quantity: itemToUpdate.quantity + 1,
                          };
                        }

                        return updatedBag;
                      });
                    }}
                  />
                </div>

                <p className="purchased-item-price">
                  $ {purchasedItem.itemPrice.toFixed(2)}
                </p>

                <img
                  src={deleteicon}
                  className="delete-item-icon"
                  alt="del-icon"
                  onClick={() => {
                    setShoppingBag((prevBag) =>
                      prevBag.filter(
                        (item) => item.itemId !== purchasedItem.itemId,
                      ),
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="shopping-bag-total">
          <h2 className="shopping-bag-total-heading">Order Summary</h2>

          {shoppingBag.length === 0 ? <h3 className="shopping-bag-total-cost">
            $ {0.00}</h3> : <h3 className="shopping-bag-total-cost">
            $ {(getTotal(shoppingBag) + TAX).toFixed(2)}
          </h3>}
          <div className="shopping-bag-subtotal-div">
            <p>Subtotal</p>
            {shoppingBag.length === 0 ? <p>{0.00}</p> : <p>{getTotal(shoppingBag).toFixed(2)}</p>}

          </div>
          <div className="shopping-bag-tax-div">
            <p>Tax</p>
            {shoppingBag.length === 0 ? <p>{0.00}</p> : <p>{TAX}</p>}
          </div>
          <hr />
          <div className="shopping-bag-costinfo-div">
            <h3 className="total-heading">Total</h3>
            {shoppingBag.length === 0 ? <p className="total-paragraph">
              {0.00}
            </p> : <p className="total-paragraph">
              {(getTotal(shoppingBag) + TAX).toFixed(2)}
            </p>}

          </div>
          <button
            className="checkout-button"
            onClick={() => {
              if (shoppingBag.length !== 0) {
                navigate("/Checkoutpage");
              }
            }}
          >
            Checkout
          </button>

        </div>
      </div>
    </>
  );
}

export { ShoppingbagComponent };
