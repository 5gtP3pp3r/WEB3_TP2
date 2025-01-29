//import { useState } from 'react'
// Ajouter les imports au besoin
import { useState } from 'react';
import { IBlock } from "./IBlock";

const largeur = 10;
const hauteur = 10;

export function App() {

  const [grille, setGrille] = useState<IBlock[]>(
    Array.from({ length: largeur * hauteur }, (_, id) => ({
      x: id % largeur,
      y: Math.floor(id / largeur),
      id,
      valeur: "terre",
      cache: true,
      drapeau: false,
      mine: false,
    }))
  );
  
  const handleLeftClick = (id: number) => {   // méthode temporaire pour changer herbe à terre
    setGrille((prevGrille) =>
      prevGrille.map((block) =>
        block.id === id ? { ...block, cache: false } : block
      )
    );
  };

  const handleRightClick = (id: number) => {   // méthode temporaire pour afficher le flag
    setGrille((prevGrille) =>
      prevGrille.map((block) =>
        block.id === id ? { ...block, drapeau: true } : block
      )
    );
  };


  return (
    <>
      <h1>Test affichage grid:</h1>
      <div className="d-flex justify-content-center">
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${largeur}, 20px)`}}>
          {grille.map((block) => (
            <div key={block.id} style={{ width: "20px", height: "20px" }}

              onClick={() => {handleLeftClick(block.id)}}
              onMouseOver={() =>console.log("x: "+block.x+"\n"+
                                            "y: "+block.y+"\n"+
                                            "id: "+block.id+"\n"+
                                            "valeur: "+block.valeur+"\n"+
                                            "caché: "+block.cache+"\n"+
                                            "drapeau: "+block.drapeau+"\n"+
                                            "mine: "+block.mine)}  
              onContextMenu={(e) => { e.preventDefault(); handleRightClick(block.id);}}>

              {block.cache ? (                                                      // Condition temporaire pour changer les états 
                block.drapeau ? (                                                   // caché et drapeau sur clique gauche et droit.
                  <img src="../../images/demineur/herbeFlag.png" alt="herbeFlag" />
                ) : (
                  <img src="../../images/demineur/herbe.png" alt="herbe" />
                )
              ) : (
                <img src="../../images/demineur/terre.png" alt="terre" />
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
