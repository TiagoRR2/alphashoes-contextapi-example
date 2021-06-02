import React, { createContext, useState, useCallback, useEffect } from 'react'

export const CartContext = createContext({})

export const CartProvider = (props) => {
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem('@alphashoes:cart')

    if(storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const addProduct = useCallback(async (productId) => {
    const copyCart = cart.slice()

    const responseProduct = await fetch(`http://localhost:3333/products/${productId}`)
    const product = await responseProduct.json()

    const findProductInCartIndex = copyCart.findIndex(
      cartProduct => cartProduct.id === productId
    )

    if(findProductInCartIndex > -1) {
      const productInCart = copyCart[findProductInCartIndex]
      const updatedAmount = productInCart.amount + 1;

      copyCart[findProductInCartIndex] = {
        ...productInCart,
        amount: updatedAmount
      }

      localStorage.setItem('@alphashoes:cart', JSON.stringify(copyCart))

      setCart(copyCart)

      return;
    }

    copyCart.push({
      ...product,
      amount: 1
    })

    localStorage.setItem('@alphashoes:cart', JSON.stringify(copyCart))

    setCart(copyCart)
  }, [cart])

  const removeProduct = useCallback(productId => {
    console.log('removeProdct', productId)
  }, [])

  useEffect(() =>  {
    console.log(cart)
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct }}>
      {props.children}
    </CartContext.Provider>
  )
}
