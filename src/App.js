import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import styled from "styled-components";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SIgnUp from "./Components/SIgnUp";
import Checkout from "./Components/Checkout";
import AddProduct from "./Components/AddProduct";
import Address from "./Components/Address";
import Payment from "./Components/Payment";
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import Orders from "./Components/Orders";
const promise=loadStripe(
  `pk_test_51LmDIZSBt9ti9pRDfODG1xieYUgpKQnKtTwfFKn9fPIx5esY3deaPJuwxSde178PcOSA6u8VikRoLZGouyEfwF74006lg2smSb`
)
function App() {
  return (
    <Router>
    <Container>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/signup' element={<SIgnUp/>}/>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>} />
            <Route path="/orders" element={<Orders/>}/>
          </Routes>
    </Container>
    </Router>
  );
}
const Container=styled.div`
width:100%;
height:100%;
`
export default App;
