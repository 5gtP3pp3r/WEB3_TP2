import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { IBlock } from "./IBlock";

const largeur = 10;
const hauteur = 10;

export function App() {
  // pour l'istant, crée une grille générique de 10x10 sans mines aléatoire. 
  // ne vérifie donc pas les blocka autour pour placer la valeurs en 
  // conséquence de la proximité d'un block avec block.mine = vrai.
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
  // méthode temporaire pour changer herbe à terre block.cache: true/false
  const handleLeftClick = (id: number) => {   
    setGrille((prevGrille) =>
      prevGrille.map((block) =>
        block.id === id ? { ...block, cache: false } : block
      )
    );
  };
  // méthode temporaire pour afficher le flag block.drapeau: true/false
  const handleRightClick = (id: number) => {   
    setGrille((prevGrille) =>
      prevGrille.map((block) =>
        block.id === id ? { ...block, drapeau: true } : block
      )
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Test affichage grid:</h1>
          <p>Pour l'instant, dimension grille hard codé à 10x10:<br />Test de changement d'état des blocks:<br />
          Clique gauche, tourne en terre si herbe.<br />Clique droit, plante un flag si herbe.<br />
          Clique gauche ou droit de fait rien sur terre.<br />Ce côté va être la zone d'interface pour générer le jeux.</p>
        </Col>
        <Col>          
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${largeur}, 20px)`}}>
            {grille.map((block) => (
              <div key={block.id} style={{ width: "20px", height: "20px" }}

                onClick={() => {handleLeftClick(block.id)}}
                onMouseOver={() =>console.log("x: "+block.x+"\n"+                           // Diag test valeur au mouseOver console.log()
                                              "y: "+block.y+"\n"+
                                              "id: "+block.id+"\n"+
                                              "valeur: "+block.valeur+"\n"+
                                              "caché: "+block.cache+"\n"+
                                              "drapeau: "+block.drapeau+"\n"+
                                              "mine: "+block.mine)}  
                onContextMenu={(e) => { e.preventDefault(); handleRightClick(block.id);}}>

                {block.cache ? (                                                            // Condition temporaire pour changer les états 
                  block.drapeau ? (                                                         // caché et drapeau sur clique gauche et droit.
                    <img src="../../images/demineur/herbeFlag.png" alt="herbeFlag" />       // Revoir les conditions pour enlever le flag avec un rightClick.
                  ) : (                                                                     // Revoir les conditions pour ne pas pouvoir faire de leftClick si flag.
                    <img src="../../images/demineur/herbe.png" alt="herbe" />
                  )
                ) : (
                  <img src="../../images/demineur/terre.png" alt="terre" />
                )}

              </div>
            ))}
          </div>          
        </Col>
      </Row>
    </Container>
  );
}
