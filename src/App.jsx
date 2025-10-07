import { useEffect, useState } from "react";

const tagColors = {
  Lutador: "#E74C3C",
  Mago: "#8E44AD",
  Atirador: "#3498DB",
  Suporte: "#1ABC9C",
  Assassino: "#F1C40F",
  Tanque: "#95A5A6",
};

function App() {
  const [champions, setChampions] = useState([]);
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllChampions = async () => {
      try {
        const res = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.19.1/data/pt_BR/champion.json"
        );
        const data = await res.json();
        const championsArray = Object.values(data.data);

        championsArray.forEach((c) => {
          const img = new Image();
          img.src = `https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${c.id}.png`;
        });

        setChampions(championsArray);

        const randomChampion =
          championsArray[Math.floor(Math.random() * championsArray.length)];
        setChampion(randomChampion);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar campeões:", err);
      }
    };

    fetchAllChampions();
  }, []);

  const fetchChampion = () => {
    if (champions.length === 0) return;
    const randomChampion = champions[Math.floor(Math.random() * champions.length)];
    setChampion(randomChampion);
  };

  if (loading || !champion)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#1a1a1a",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Carregando...</h2>
      </div>
    );

  const mainTag = champion.tags?.[0];
  const bgColor = tagColors[mainTag] || "#333";

  const statColor = (stat) => {
    switch (stat) {
      case "attack":
        return "#e74c3c";
      case "defense":
        return "#3498db";
      case "magic":
        return "#9b59b6";
      case "difficulty":
        return "#f1c40f";
      default:
        return "#fff";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#111",
        padding: "0",
      }}
    >
      <div
        style={{
          width: "650px",
          maxWidth: "95%",
          padding: "25px",
          borderRadius: "20px",
          backgroundColor: bgColor,
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          boxShadow: "0 0 35px rgba(0,0,0,0.8)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${champion.id}.png`}
            alt={champion.name}
            style={{
              width: "200px",
              borderRadius: "15px",
              border: "4px solid #fff",
              boxShadow: "0 0 30px rgba(255,255,255,0.8)",
            }}
          />
          <h1 style={{ fontSize: "2.2rem", margin: 0 }}>{champion.name}</h1>
          <p style={{ fontStyle: "italic", margin: 0 }}>{champion.title}</p>
        </div>

        <h2 style={{ marginTop: "20px" }}>Resumo</h2>
        <p>{champion.blurb}</p>

        <h2>Stats</h2>
        {["attack", "defense", "magic", "difficulty"].map((stat) => (
          <div key={stat} style={{ marginBottom: "8px" }}>
            <strong style={{ textTransform: "capitalize" }}>{stat}: </strong>
            <div
              style={{
                background: "#fff",
                height: "12px",
                borderRadius: "6px",
                overflow: "hidden",
                marginTop: "2px",
              }}
            >
              <div
                style={{
                  width: `${champion.info?.[stat] * 20}%`,
                  height: "100%",
                  backgroundColor: statColor(stat),
                  transition: "width 0.5s",
                }}
              />
            </div>
          </div>
        ))}

        <div style={{ marginTop: "25px" }}>
          <button
            onClick={fetchChampion}
            style={{
              padding: "12px 25px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#fff",
              color: bgColor,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Sortear outro campeão
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
