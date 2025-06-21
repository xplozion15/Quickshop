import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
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
      <Navbar shoppingBag={shoppingBag} />
      <Outlet context={{ productList, shoppingBag, setShoppingBag }} />
    </>
  );
}

export default App;
