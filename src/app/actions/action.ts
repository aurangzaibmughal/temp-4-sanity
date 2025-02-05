"use client"
import { Product } from "../../../types/products";


export const addToCart = async (product: Product) => {
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductindex = cart.findIndex(item => item._id === product._id);

    if (existingProductindex > -1) {
        cart[existingProductindex].stockLevel += 1;
    }
    else {
        cart.push({ ...product, stockLevel: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const removeFromCart = (productId: string) => {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id! === productId)
    localStorage.setItem('cart', JSON.stringify(cart));

}

export const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === productId)

    if (productIndex > -1) {
        cart[productIndex].stockLevel = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const getCartItems = (): Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}
    
    



