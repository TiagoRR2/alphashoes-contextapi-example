import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../providers/CartProvider';

import { Container, Header, Main, ProductCard, ProductButton } from './styles'

function Home() {
  const { addProduct } = useContext(CartContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('http://localhost:3333/products')
        const data = await response.json()

        if (Array.isArray(data)) {
          setProducts(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    loadData()
  }, [])

  return (
    <Container>
      <Header>
        <div>
          <h1>Alphashoes</h1>

          <div>
            <strong>Meu carrinho</strong>
            <span>1 item</span>
          </div>
        </div>
      </Header>

      <Main>
        <div>
          <ul>
            {products.map(product => (
              <ProductCard key={product?.id}>
                <img src={product?.image} alt={product.title} />

                <div className="product-info">
                  <strong>{product?.title}</strong>
                  <span>R$ {product?.price}</span>
                </div>

                <ProductButton type="button" onClick={() => addProduct(product?.id)}>
                  Adicionar ao carrinho
                </ProductButton>
              </ProductCard>
            ))}
          </ul>
        </div>
      </Main>
    </Container>
  )
}

export default Home;