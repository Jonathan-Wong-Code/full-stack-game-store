import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../src/selectors/cart';
import { Wrapper } from '../src/components/Wrapper';
import CartItemPreview from '../src/components/ItemPreview';

import {
  OrderSummary,
  TotalsBar,
  H2,
  CheckoutButton,
  CheckoutContainer,
  TotalSavings
} from '../src/containers/cartPage/index.css';

import { formatPricing } from '../src/utils/utils';

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);

  const orderTotal = cartItems.reduce((acc, curr) => {
    return curr.price + acc;
  }, 0);

  const discountTotal = cartItems.reduce((acc, curr) => {
    return curr.originalPrice - curr.price + acc;
  }, 0);

  return (
    <section style={{ padding: '3rem 0' }}>
      <Wrapper>
        <H2 id="order-summary-heading">Your Order Summary</H2>
        {cartItems.length > 0 ? (
          <>
            <OrderSummary
              className="order-box"
              aria-labelledby="order-summary-heading"
            >
              <ul>
                {cartItems.map(cartItem => (
                  <li key={cartItem.id}>
                    <CartItemPreview
                      title={cartItem.title}
                      price={cartItem.price}
                      originalPrice={cartItem.originalPrice}
                      image={cartItem.image}
                      id={cartItem.id}
                    />
                  </li>
                ))}
              </ul>
              <TotalsBar className="total">
                <div style={{ textAlign: 'right' }}>
                  <p>Order Total: {formatPricing(orderTotal)}</p>
                  <TotalSavings>
                    Total saved: {formatPricing(discountTotal)}
                  </TotalSavings>
                </div>
              </TotalsBar>
            </OrderSummary>
            <CheckoutContainer>
              <CheckoutButton>Checkout</CheckoutButton>
            </CheckoutContainer>
          </>
        ) : (
          <h3>Your cart is currently empty.</h3>
        )}
      </Wrapper>
    </section>
  );
};

export default CartPage;
