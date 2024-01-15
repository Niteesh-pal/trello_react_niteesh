export const initialState = {
  data: [],
  error: false,
  loading: false,
  open: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, data: action.payload, loading: false, error: false };

    case 'LOADING':
      return { ...state, loading: true, error: false };

    case 'ERROR':
      return { ...state, loading: false, error: true };

    case 'TOGGLE_OPEN':
      return { ...state, open: action.payload };

    case 'ADD_DATA':
      return { ...state, data: [...state.data, action.payload] };

    case 'DELETE_DATA':
      return { ...state, data: state.data.filter(({ id }) => id !== action.payload) };

    case 'UPDATE_DATA':
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
