
import "./Products.css"

function Products({productList}) {
    return <>
        <h2 className="products-heading">Products</h2>

        <div className="products-grid">
            {productList.map((product)=>{
            return  (
                <div className="product-div" key={product.id}>
                    <h2 className="product-name">{product.title}</h2>
                    <img src={product.image} alt="product-image" className="product-image"/>
                    <p className="product-price">$ {product.price}</p>
                    <button className="add-to-bag-button">ADD TO BAG</button>
                </div>

            )
            })}     
        </div>  
        
    </>
}



export {Products};