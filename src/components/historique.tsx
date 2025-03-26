import React, { useState } from "react";

const FiltreHistorique: React.FC<{ setFiltre: (value: string) => void }> = ({
  setFiltre,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFiltre(event.target.value);
  }

  return (
    <select onChange={handleChange} aria-label="Filtrer par">
      <option value="annee">Année</option>
      <option value="mois">Mois</option>
    </select>
  );
};

const Historique: React.FC = () => {
  const [filtre, setFiltre] = useState("annee");

  const message =
    filtre === "annee" ? "Affichage par année" : "Affichage par mois";

  return (
    <main className="historique">
      <h1>Historique</h1>
      <h2>{message}</h2>

      <div className="ecran_historique flex-column">
        <div className="filtrage">
          <FiltreHistorique setFiltre={setFiltre} />
        </div>
        <div className=" contenue flex-rows">
          <div>contenue</div>
          <div className="barre flex-column">
            <Article message={message} />
          </div>
        </div>
      </div>
    </main>
  );
};

const Article: React.FC<{ message: string }> = ({ message }) => (
  <article>
    <span>{message}</span>
  </article>
);

export default Historique;
