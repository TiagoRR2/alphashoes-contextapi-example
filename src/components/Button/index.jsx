import React, { useCallback, useContext } from 'react';
import { CartContext } from '../../providers/CartProvider'

function Button(props) {
  const { cart, addProduct, removeProduct } = useContext(CartContext)

  const handleAddProduct = useCallback(() => {
    addProduct('1')
  }, [addProduct])

  const handleRemoveProduct = useCallback(() => {
    removeProduct('2')
  }, [removeProduct])

  console.log(cart)
  
  return (
    <>
      <button onClick={handleAddProduct}>Adicionar produto</button>
      <button onClick={handleRemoveProduct}>Remover produto </button>
    </>
  )
}

export default Button;
