import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useGlobalContext } from './utils/context';


const CartContainer = () => {
  const { state, clearCart } = useGlobalContext();
  const [total, setTotal] = useState(0);


  // const cartArray = [...cartItems];
  const cartArray = state ? Array.from(state.cart.entries()) : [];
  // console.log(cartArray);

  if (cartArray.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
        {/* <div className="btn-container" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type="button" className='btn btn-hipster'>Refresh</button>
        </div> */}
      </section>
    );
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          // return console.log(cartItem[1].id);
          return <CartItem key={cartItem[0]} {...cartItem[1]} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className='cart-total'>
            total<span>${total}</span>
          </h5>
        </div>
        <button
          className='btn btn-hipster'
          onClick={() => clearCart()}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
