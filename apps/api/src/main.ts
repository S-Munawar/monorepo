import express from 'express';
import * as path from 'path';
import { API_URL } from '@monorepo/api-interface';
import { get } from 'http';
import { games } from './game';
import { getReviewsById, createReview } from './review';
import { getCart, addItemToCart, updateItemInCart, removeItemFromCart } from './cart';

const app = express();
app.use(express.json());

app.get('/api/reviews/:game', getReviewsById);
app.post('/api/reviews', createReview);
app.get('/api/games', games);

app.get('/api/cart', getCart);
app.post('/api/cart', addItemToCart);
app.put('/api/cart', updateItemInCart);
app.put('/api/cart/remove', removeItemFromCart);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}${API_URL}`);
});
server.on('error', console.error);
