import { useState } from "react";

function Header() {
    const [fruit, setFruit] = useState("");
    const [data, setData] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!fruit) {
        alert("Digite uma fruta");
        return;
      }
  
      try {
        const response = await fetch(
          `https://www.fruityvice.com/api/fruit/${fruit}`
        );
  
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
  
    return (
      <header>
        <h1>Bananis Info</h1>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={fruit}
            onChange={(e) => setFruit(e.target.value)}
            placeholder="Digite uma fruta..."
          />
          <button type="submit">Buscar</button>
        </form>
  
        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>Calorias: {data.nutritions.calories}</p>
            <p>Açúcar: {data.nutritions.sugar}</p>
          </div>
        )}
      </header>
    );
  }
  
  export default Header;

