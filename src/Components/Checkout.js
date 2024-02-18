import React, { useState } from 'react'
import styled from 'styled-components'
import { useStateValue } from '../StateProvider'
import Navbar from './Navbar';
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
function Checkout() {
  const navigate=useNavigate();
  const [{basket},dispatch]=useStateValue();
  const removeFromBasket = (e, id) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  const increment = (id) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      id: id,
      quantity: 1,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      id: id,
      quantity: -1,
    });
  };
  return (
    <Container>
        <Navbar/>
        <Main>
        <ShoppingCart>
          <h2>SHOPPING CART</h2>
          {
            basket?.map((product)=>(
              <Product>
              <Image>
                <img src={product.image} alt=''/>
              </Image>
              <Description>
                 <h4>{product.title}</h4>
                 <Quantity>
                  {product.quantity>1?
                  (<button style={{ marginRight: '15px' }} onClick={() => decrement(product.id)}>-</button>):
                  (<button style={{ marginRight: '15px' }}>-</button>)}
                  <p style={{marginBottom:"3px"}}>{product.quantity}</p>
                  <button style={{ marginLeft: '15px' }} onClick={() => increment(product.id)}>+</button>
                </Quantity>
                 <p>₹ {product.price*product.quantity}</p>
                 <button onClick={(e)=>removeFromBasket(e,product.id)}>Remove</button>
              </Description>
            </Product>
            ))
          }
        </ShoppingCart>
        <Subtotal>
          <CurrencyFormat  renderText={(value) => (
              <>
                <p>
                  Subtotal ( {basket.length} items ) : <strong> {value}</strong>
                </p>
                <small>
                  <input type="checkbox" />
                  <span>This order contains a gift.</span>
                </small>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType="text"
            thousandSeparator={true}
            prefix={"₹ "}
          />
          <button onClick={()=>navigate("/address")}>Proceed to Checkout</button>
        </Subtotal>
        </Main>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: fit-content;
  margin: auto;
  background-color: rgb(234, 237, 237);
  border: 1px solid red;
  position: relative;
`;
const Main = styled.div`
  display: flex;
  padding: 15px;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
const Quantity=styled.div`
 display: flex;
`
const ShoppingCart = styled.div`
  padding: 15px;
  background-color: #fff;
  flex: 0.7;
  @media only screen and (max-width: 1200px) {
    flex: none;
  }
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;
const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }
  small {
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      margin-left: 10px;
    }
  }
  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor:pointer;
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 50%;
  }
`;
const Description = styled.div`
  flex: 0.7;
  h4 {
    font-weight: 600;
    font-size: 18px;
  }
  p {
    font-weight: 600;
    margin-top: 10px;
  }
  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export default Checkout;