import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Herosection } from "./components/Herosection";
import { Products } from "./components/Products";
import { ShoppingbagComponent } from "./components/ShoppingBagComponent";
import { CheckoutPage } from "./components/CheckoutPage";

function App() {
  const [currentMainContent, setCurrentMainContent] = useState("Herosection");
  const [productList, setProductList] = useState([]);
  const [shoppingBag, setShoppingBag] = useState([]);

  useEffect(() => {
    const url = "https://fakestoreapi.com/products?limit=20";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setProductList(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar
        shoppingBag={shoppingBag}
        setCurrentMainContent={setCurrentMainContent}
      />
      {currentMainContent === "Herosection" && (
        <Herosection
          currentMainContent={currentMainContent}
          setCurrentMainContent={setCurrentMainContent}
        />
      )}
      {currentMainContent === "Products" && (
        <Products
          productList={productList}
          shoppingBag={shoppingBag}
          setShoppingBag={setShoppingBag}
        />
      )}
      {currentMainContent === "Shoppingbag" && (
        <ShoppingbagComponent
          shoppingBag={shoppingBag}
          setShoppingBag={setShoppingBag}
          setCurrentMainContent={setCurrentMainContent}
        />
      )}

      {currentMainContent === "Checkoutpage" && <CheckoutPage/>}
    </>
  );
}

export default App;
