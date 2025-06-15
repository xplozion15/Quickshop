
import "./Products.css"





function Products({ productList, shoppingBag, setShoppingBag }) {
    return <>
        <h2 className="products-heading">Products</h2>

        <div className="products-grid">
            {productList.map((product) => {
                return (
                    <div className="product-div" key={product.id}>
                        <h2 className="product-name">{product.title}</h2>
                        <img src={product.image} alt="product-image" className="product-image" />
                        <p className="product-price">$ {product.price}</p>
                        
                        <button className="add-to-bag-button" onClick={() => {
                            const newItem = {
                                itemName: product.title,
                                itemId: product.id,
                                itemImage: product.image,
                                quantity: 1,
                            };

                            const index = shoppingBag.findIndex(item => item.itemId === product.id);

                            if (index === -1) {
                                setShoppingBag((prevBag) => [...prevBag, newItem]);
                            }
                            else {
                                setShoppingBag((prevBag) => {
                                    let updatedBag = [...prevBag];
                                    let itemToUpdate = updatedBag[index];

                                    updatedBag[index] = {...itemToUpdate, quantity : itemToUpdate.quantity+1}
                                
                                return updatedBag;
                            })
                            }


                        }}>ADD TO BAG</button>
                    </div>

        )
            })}
    </div >

    </>
}



export { Products };