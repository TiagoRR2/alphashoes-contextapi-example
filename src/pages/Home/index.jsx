import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../providers/CartProvider';

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
    <div>
      <header>
        <div>
          <h1>Alphashoes</h1>

          <div>
            <strong>Meu carrinho</strong>
            <span>1 item</span>
          </div>
        </div>
      </header>

      <main>
        <ul>
          {products.map(product => (
            <li key={product?.id}>
              <strong>{product?.title}</strong>
              <span>R$ {product?.price}</span>

              <button type="button" onClick={() => addProduct(product?.id)}>
                Adicionar ao carrinho
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home;