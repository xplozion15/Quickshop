import './Navbar.css';
import shopppingBagIcon from '../assets/icons/shoppingbag.svg'; 

function Navbar({shoppingBag}) {

    return <>
        <nav>
            <div className="logo-container">
                <p className="logo">Quickshop.</p>
            </div>
            <div className="navbar-items">
                <a href="/">Products</a>
                <div className='shopping-bag-div'>
                    <img src={shopppingBagIcon} alt="shopping bag" className='shopping-bag-icon'/>
                    {shoppingBag.length > 0 && <p className='shoppingbag-count'>{shoppingBag.length}</p>}
                </div>
                
            </div>
        </nav>
    </>
}


export {Navbar};