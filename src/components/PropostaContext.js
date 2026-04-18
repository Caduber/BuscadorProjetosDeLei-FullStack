import { createContext, useContext, useReducer } from 'react';

const initialState = {
  proposta: "",
  resultados: [],
  erro: null,
  loading: false,
};

function propostaReducer(state, action) {
  switch (action.type) {
    case 'SET_KEYWORD':
      return { ...state, proposta: action.payload, erro: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RESULTADOS':
      return { ...state, resultados: action.payload, loading: false };
    case 'SET_ERRO':
      return { ...state, erro: action.payload, loading: false };
    default:
      return state;
  }
}

export const PropostaContext = createContext(null);

export function PropostaProvider({ children }) {
  const [state, dispatch] = useReducer(propostaReducer, initialState);
  return (
    <PropostaContext.Provider value={{ state, dispatch }}>
      {children}
    </PropostaContext.Provider>
  );
}

export function useProposta() {
  return useContext(PropostaContext);
}