import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';  // Assuming you have these actions in CartSlice

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Calculate total cost for this item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // Remove '$' and convert to number
    return price * item.quantity;
  };

  // Handle incrementing the quantity
  const handleIncrement = () => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Handle removing the item from the cart
  const handleRemove = () => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>Price: {item.cost}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrement}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <p>Subtotal: ${calculateTotalCost(item).toFixed(2)}</p>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      // Extract cost from item and convert it to a number (strip the "$" symbol)
      const itemCost = parseFloat(item.cost.substring(1)); // "$10.00" -> 10.00
      total += itemCost * item.quantity; // Add cost * quantity to the total
    });
    return total.toFixed(2); // Return the total as a string, formatted to 2 decimal places
  };

  // Continue shopping button handler
  const handleContinueShopping = () => {
    // Assuming you have a function to navigate to the plant listing page
    // You can use React Router or any other routing mechanism here
    alert('Redirecting to the plant listing page...');
  };

  const buttonStyle = {
    fontSize: '23px',
    backgroundColor: 'rgb(76, 175, 80)',
    color: 'rgb(255, 255, 255)',
    cursor: 'pointer',
    marginTop: '40px',
    marginLeft: '20px',
    padding: '15px 25px',
    borderWidth: 'initial',
    borderStyle: 'none',
    borderColor: 'initial',
    borderImage: 'initial',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.name} item={item} />
        ))
      )}
      <div className="cart-total">
        <h3>Total Cost: ${calculateTotalAmount()}</h3>
      </div>
      <div className="cartButton">
      <button style={buttonStyle} onClick={handleContinueShopping}>Continue Shopping</button>
      <button style={buttonStyle} onClick={() => alert('Checkout functionality will be added soon.')}>Checkout</button>
    </div>
    </div>
  );
};

export default CartPage;
