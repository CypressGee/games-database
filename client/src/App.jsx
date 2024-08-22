import { useEffect, useState } from "react";

export default function App() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    name:"",
    publisher:"",
    date:0,
  });


useEffect(() => {
  getGames();
}, []);

async function getGames () {
  
  const response = await fetch("http://localhost:8080/games");
  
  const data = await response.json();
  
  setGames(data);
}

async function handlesubmit(event) {
  event.preventDafault();
  console.log("Form is submitted");
  console.log(form);
  
 await fetch("http://localhost:8080/games", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
   });
  setForm({
    name:"",
    publisher:"",
    date:0,
  });
  getGames();
}

return (
  <div>
    <h1> Games for life (Eat, Game, No Sleep)</h1>
    <p> Here are some of my go to games</p>

    <h2>Add new Game</h2>
    <form onSubmit={handlesubmit}>
      <input 
      name="Name"
      placeholder="Name"
      onChange={handleChange}
      value={form.name}
      />
      <input 
      name="Publisher"
      placeholder="Publisher"
      onChange={form.publisher}
      />
      <input 
      name="Date"
      placeholder="Date"
      type="number"
      onChange={handleChange}
      value={form.date}
      />
      <button> Submit </button>
    </form>
    
    
    <h2> Games </h2>
    {games.map(function (game) {
      return (
        <h3> key={game.name} style={{ publisher: game.publisher}}
        {game.name} - {game.date} 
        </h3>
      );
    })}
  </div>
);
}
  