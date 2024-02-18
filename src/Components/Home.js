import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import Card from './Card'
import axios from '../axios'
function Home() {
  const [products,setProducts]=useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/products/get");
      setProducts(data.data);
    };
    fetchdata();
  }, []);
  const filterProducts = () => {
    if (!selectedPriceRange) {
      return products;
    }
    return products.filter(product => {
      const price = parseFloat(product.price);

      if (selectedPriceRange === '0-500') {
        return price >= 0 && price <= 500;
      }
      if (selectedPriceRange === '500-1000') {
        return price > 500 && price <= 1000;
      }
      if (selectedPriceRange === '1000-1500') {
        return price > 1000 && price <= 1500;
      }
      if (selectedPriceRange === '1500-2000') {
        return price > 1500 && price <= 2000;
      }
      if (selectedPriceRange === '2000-above') {
        return price > 2000;
      }

      return false;
    });
  };
  return (
    <Container>
       <Navbar />
       <Banner>
        <img src='./images/banner.jpg' alt='' style={{height:"550px"}}/>
        <img src="./images/home.jpg" alt="" />
       </Banner>
       <Main>
       <FilterDiv>
        <h1 style={{ marginBottom: '15px' }}>Filters</h1>
        <input
          type="radio"
          name="price"
          value="0-500"
          onClick={() => setSelectedPriceRange('0-500')}
        />
        ₹0-500<br />
        <input
          type="radio"
          name="price"
          value="500-1000"
          onClick={() => setSelectedPriceRange('500-1000')}
        />
        ₹500-1000<br />
        <input
          type="radio"
          name="price"
          value="1000-1500"
          onClick={() => setSelectedPriceRange('1000-1500')}
        />
        ₹1000-1500<br />
        <input
          type="radio"
          name="price"
          value="1500-2000"
          onClick={() => setSelectedPriceRange('1500-2000')}
        />
        ₹1500-2000<br />
        <input
          type="radio"
          name="price"
          value="2000-above"
          onClick={() => setSelectedPriceRange('2000-above')}
        />
        ₹2000 and above<br />
      </FilterDiv>
        {filterProducts().map((product) => (
          <Card
            key={product._id}
            id={product._id}
            image={product.imageURL}
            price={product.price}
            rating={product.rating}
            title={product.title}
          />
        ))}
       </Main>
    </Container>
  )
}
const Container=styled.div`
width:100%;
background-color:rgb(234,237,237);
  margin: auto;
  height: fit-content;
`

const FilterDiv=styled.div`
`
const Banner=styled.div`
width:100%;
img{
    width:100%;
    -webkit-mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 2),
        rgba(0, 0, 0, 0.95),
        rgba(0, 0, 0, 0.85),
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.55),
        rgba(0, 0, 0, 0)
      );
      &:nth-child(2) {
        display: none;
      }
      @media only screen and (max-width: 767px) {
        &:nth-child(1) {
          display: none;
        }
        &:nth-child(2) {
          display: block;
          -webkit-mask-image: none;
        }
      }
    }
    
}
`
const Main=styled.div`
display: grid;
justify-content: center;
place-items: center;
width: 100%;
grid-auto-rows: 420px 420px;
grid-template-columns: repeat(4,280px);
grid-gap: 20px;
/* Mobile */
@media only screen and (max-width: 767px) {
  grid-template-columns: repeat(2, 50%);
  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }
  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }
  @media only screen and (min-width: 767px) {
    margin-top: -130px;
    padding: 10px 0px;
  }
}
/* Tablets */
@media only screen and (min-width: 767px) and (max-width: 1200px) {
  grid-template-columns: repeat(3, 30%);
}
@media only screen and (min-width: 767px) {
  margin-top: -130px;
  padding: 10px 0px;
}
`
export default Home