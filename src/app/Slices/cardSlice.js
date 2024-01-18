import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      const isolatedCards = action.payload.filter(
        (card) => !state.cards.some((existCard) => existCard.id === card.id)
      );

      state.cards = [...state.cards, ...isolatedCards];
    },
    addCards: (state, action) => {
      state.cards.push(action.payload);
      return state;
    },
    deleteCard: (state, action) => {
      return {
        ...state,
        cards: state.cards.filter(({ id }) => id !== action.payload),
      };
    },
  },
});

export const { setCards, addCards, deleteCard } = cardSlice.actions;

export default cardSlice;
