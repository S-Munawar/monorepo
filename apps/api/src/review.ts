import { dummyGames } from "./game";
import { Request, Response } from "express";

export function getReviewsById(req: Request, res: Response){
    const gameId = req.body.id;
    try{
        const game = dummyGames.map((game) => game.id === gameId ? game : "null")
        return game ? res.status(200).json(game) : res.status(404).json({message: "Game not found"});
    }
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

export function createReview(req: Request, res: Response){
    const { gameId, review } = req.body;
    try{
        const index = dummyGames.findIndex((game) => game.id === gameId);
        if (index !== -1){
            dummyGames[index].reviews?.push(review);
            return res.status(201).json({message: "Review added successfully"});
        }
    }
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}