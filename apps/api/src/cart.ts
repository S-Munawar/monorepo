import { Request, Response } from 'express';
import { CartItem } from '@monorepo/api-interface';
import { dummyGames } from './game';

const cart: CartItem[] = [];

export function getCart(req: Request, res: Response){
    try{
        return res.status(200).json(cart);
    }
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

export function addItemToCart(req: Request, res: Response){
    try{
        const { game, quantity} = req.body;
        const gameIndex = dummyGames.findIndex((g) => g.name === game);
        if (gameIndex === -1) return res.status(404).json({message: "Game not found"});
        const cartIndex = cart.findIndex((items) => dummyGames[gameIndex].name === items.game.name);
        if (cartIndex !== -1) cart[cartIndex].quantity += quantity;
        else cart.push({game: dummyGames[gameIndex], quantity});
        return res.status(201).json({message: "Item added to cart successfully", cart});
    }
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

export function updateItemInCart(req: Request, res: Response){
    const { game, quantity } = req.body;
    try{
        const cartIndex = cart.findIndex((items) => items.game.name === game.name);
        if (cartIndex === -1) return res.status(404).json({message: "Item not found in cart"});
        cart[cartIndex].quantity = quantity;
        return res.status(200).json({message: "Cart item updated successfully", cart});
    }
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

export function removeItemFromCart(req: Request, res: Response){
    const { game } = req.body;
    try{
        const cartIndex = cart.findIndex((items) => items.game.name === game.name);
        if (cartIndex === -1) return res.status(404).json({message: "Item not found in cart"});
        cart.splice(cartIndex, 1);
        return res.status(200).json({message: "Item removed from cart successfully", cart});
    }
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}