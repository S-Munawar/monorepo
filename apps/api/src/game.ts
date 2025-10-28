import { Game } from '@monorepo/api-interface';
import { Request, Response } from 'express';

export const dummyGames : Game[] = [
    {
    name: "Adventure Quest",
    id: '1',
    image: "adventure_quest.jpg",
    description: "Embark on an epic adventure through mystical lands.",
    price: 49.99,
    rating: 4.5,
    reviews: [
        {
            game: "Adventure Quest",
            rating: 5,
            content: "An unforgettable journey!"
        },
        {
            game: "Adventure Quest",
            rating: 4,
            content: "Great gameplay but could use more side quests."
        }]
    },    
    {
    name: "Cyber Racer",
    id: '2',
    image: "cyber_racer.jpg",
    description: "Race through a futuristic cityscape at breakneck speeds.",
    price: 59.99,
    rating: 4.8,
    reviews: [
        {
            game: "Cyber Racer",
            rating: 5,
            content: "An adrenaline-pumping experience!"
        },
        {
            game: "Cyber Racer",
            rating: 4,
            content: "Great gameplay but could use more side quests."
        }]
    },
        {
    name: "Mystic Lands",
    id: '3',
    image: "mystic_lands.jpg",
    description: "Explore the enchanted realms filled with magic and mystery.",
    price: 49.99,
    rating: 4.5,
    reviews: [
        {
            game: "Mystic Lands",
            rating: 5,
            content: "An unforgettable journey!"
        },
        {
            game: "Mystic Lands",
            rating: 4,
            content: "Great gameplay but could use more side quests."
        }]
    }
];


export function games(req: Request, res: Response) {
    // Implementation for fetching games
    try{
        return dummyGames ? res.status(200).json(dummyGames) : res.status(404).json({message: "Games not found"});
    } 
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}