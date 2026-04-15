import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import '../context/styles/Hero.css';
import { useState, createContext,  } from 'react';


function Hero() {

    const [proposta, setProposta] = useState("");
    const [resultados, setResultados] = useState([]);

    // const propostaContext = new createContext();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('https://dadosabertos.camara.leg.br/api/v2/proposicoes?keywords=' + proposta + '&ordem=ASC&ordenarPor=id')
        .then(result => result.json())
        .then(data => {
            console.log(data);
            setResultados(data.dados);
        })
    }


    return (
        <div className="Hero">
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '30%', marginTop: 6} }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <h1 className="title">Procure por uma proposta da Câmara de Deputados Federal</h1>
              <TextField
                id="outlined-textarea"
                label="Insira uma palavra-chave"
                placeholder="Aposta"
                className='input-text'
                onChange={(e) => {  
                  setProposta(e.target.value);
                }}
              />
            </div>
          </Box>
           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 3, justifyContent: 'center' }}>
                {resultados.map((item) => (
                    <Card key={item.id} sx={{ width: 340, borderRadius: 3, boxShadow: 3 }}>
                        <CardContent>
                            {/* Cabeçalho com tipo e número */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Chip label={item.siglaTipo} color="primary" size="small" />
                                <Typography variant="body2" color="text.secondary">
                                    Nº {item.numero} — {item.ano}
                                </Typography>
                            </Box>
                            {/* Ementa */}
                            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                                {item.ementa}
                            </Typography>
                            {/* Data */}
                            <Typography variant="caption" color="text.secondary">
                                Apresentado em: {new Date(item.dataApresentacao).toLocaleDateString('pt-BR')}
                            </Typography>
                            {/* Link */}
                            <Box sx={{ mt: 1 }}>
                                <a href={item.uri} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
                                    Ver detalhes na API
                                </a>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </div>
  );
}

export default Hero;