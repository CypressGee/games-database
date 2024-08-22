import { useEffect, useState } from "react";

export default function App() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    name: "",
    publisher: "",
    date: 0,
  });

  function handleChange(event) {
  const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    getGames();
  }, []);

  async function getGames() {
    const response = await fetch(
      "https://games-database-q2av.onrender.com/games"
    );

    const data = await response.json();

    setGames(data);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form is submitted");
    console.log(form);

    await fetch("https://games-database-q2av.onrender.com/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    setForm({
      name: "",
      publisher: "",
      date: 0,
    });
    getGames();
  }

  return (
    <div>
      <h1> Games for life (Eat, Game, No Sleep)</h1>
      <p> Here are some of my go to games</p>

      <h2>Add new Game</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          onChange={handleChange}
          value={form.name}
        />
        <input
          name="publisher"
          placeholder="publisher"
          onChange={handleChange}
          value={form.publisher}
        />
        <input
          name="date"
          placeholder="date"
          type="number"
          onChange={handleChange}
          value={form.date}
        />
        <button> Submit </button>
      </form>

      <h2> Games </h2>
      {games.map(function (game) {
        return (
          <h3 key={game.name} style={{ publisher: game.publisher }} >
            {" "}
              {game.name} - {game.date}
          </h3>
        );
      })}
    </div>
  );
}
