import { useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useProposta } from './PropostaContext';
import PropostaCard from './Card';
import ErrorPortal from './ErrorPortal';
import '../context/styles/Hero.css';

function Hero() {
  const { state, dispatch } = useProposta();
  const { proposta, resultados, erro, loading } = state;

  const inputRef = useRef(null);

  function validar() {
    if (!proposta.trim()) {
      dispatch({ type: 'SET_ERRO', payload: 'O campo de busca é obrigatório.' });
      inputRef.current?.focus();
      return false;
    }
    if (proposta.trim().length < 3) {
      dispatch({ type: 'SET_ERRO', payload: 'Digite ao menos 3 caracteres.' });
      inputRef.current?.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    fetch('https://dadosabertos.camara.leg.br/api/v2/proposicoes?keywords=' + proposta + '&ordem=ASC&ordenarPor=id')
      .then(result => result.json())
      .then(data => {
        if (!data.dados || data.dados.length === 0) {
          dispatch({ type: 'SET_ERRO', payload: 'Nenhuma proposta encontrada para essa palavra-chave.' });
          dispatch({ type: 'SET_RESULTADOS', payload: [] });
        } else {
          dispatch({ type: 'SET_RESULTADOS', payload: data.dados });
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_ERRO', payload: 'Erro ao conectar com a API. Tente novamente.' });
      });
  }

  const cards = useMemo(() => (
    resultados.map(item => <PropostaCard key={item.id} item={item} />)
  ), [resultados]);

  return (
    <div className="Hero">
      <ErrorPortal message={erro} />

      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '30%', marginTop: 6 } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="title">Procure por uma proposta da Câmara de Deputados Federal</h1>
          <TextField
            inputRef={inputRef}
            id="outlined-textarea"
            label="Insira uma palavra-chave"
            placeholder="Aposta"
            className='input-text'
            error={!!erro}
            helperText={erro}
            onChange={(e) => dispatch({ type: 'SET_KEYWORD', payload: e.target.value })}
          />
          <Button type="submit" variant="contained" sx={{ mt: 7, ml: 1 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
          </Button>
        </div>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 3, justifyContent: 'center' }}>
        {cards}
      </Box>
    </div>
  );
}

export default Hero;