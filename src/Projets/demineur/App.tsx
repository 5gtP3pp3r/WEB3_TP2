import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { IBlock } from "./IBlock";

import { SelectionJeu } from './SelectionJeu';
import { INiveau } from './Niveau';
import { niveauxTab } from './Niveau';
import { GenerateurMinesAleatoire } from './GenerateurMinesAleatoire';


export function App() {
  const [ niveau, setNiveau ] = useState<INiveau>({difficulte:"facile", dimensions: 8, qtMines: 10}); 
  const [ niveauActif, setNiveauActif ] = useState<string>("facile");
  const [ minesTab, setMinesTab ] = useState<number[]>([0]);

  const handleNiveauSelect = (niveau: string) => {
    setNiveauActif(niveau);
    const niveauChoisi = niveauxTab.find((diff) => diff.difficulte === niveau);
    if (niveauChoisi) {
      setNiveau(niveauChoisi)
    }
  };
  const remplirMinesTab = () => {
    setMinesTab(GenerateurMinesAleatoire(niveau));
  }
  
  //minesTab = GenerateurAleatoire({difficulte, });
  // pour l'istant, crée une grille générique de 10x10 sans mines aléatoire. 
  // ne vérifie donc pas les block autour pour placer la valeurs en 
  // conséquence de la proximité d'un block avec block.mine = vrai.

  // Créer un nouveau tableau vide, ajouter la valeur "id" avec une boucle -> CHECK 
  // à chaque itération calculer les valeurs de x: valeur id modulo largeur -> CHECK 
  // y: id divisé par largeur arrondi à la baisse car les résultats seront float la majorité du temps -> CHECK
  // Pour l'instant mine est générique à faux. Va faloir ajouter un random vs dimension grille. -> CHECK
  // Pour l'instant valeur générique 0. Va faloir vérifier les voisins et 
  // ajuster la valeur à terre${nb block voisin.mine = vrai} "terre1, terre2..." -> TODO
  const [grille, setGrille] = useState<IBlock[]>(() => {
    const grid: IBlock[] = [];   
    const qtBlock = Math.sqrt(niveau.dimensions);
    remplirMinesTab();
    const valeur = 0;
    const cache = true;             // Mettre dans un Fichier à part pour être appelé avec un bouton 
    const drapeau = false;
    let mine = false;    
    for (let id = 0; id < qtBlock; ++id) {
      const x = id % niveau.dimensions; 
      const y = Math.floor(id / niveau.dimensions); 
      mine = minesTab.includes(id) ? true : false;      
      // Je crois que je vais ajouter une fonction externe qui va me retourné des id aléatoires -> CHECK
      // pour passer mine à vrai. à voir comment implanter `ca vers ici avant le grid.push -> CHECK
      // Vérifications des mines des voisins ici pour modifier la "valeur". -> TODO
      grid.push({
        x,
        y,
        id,
        valeur,   
        cache,
        drapeau,
        mine,
      });
    }    
    return grid;
  });
  // méthode temporaire pour changer l'image herbe à terre -> block.cache: true/false
  const handleLeftClick = (id: number) => {   
    setGrille((prevGrille) =>
      prevGrille.map((block) =>
        block.id === id ? { ...block, cache: false } : block
      )
    );
  };
  // méthode temporaire pour changer l'image herbe à herbeFlag -> block.drapeau: true/false
  const handleRightClick = (id: number) => {   
    setGrille((prevGrille) =>
      prevGrille.map((block) =>
        block.id === id ? { ...block, drapeau: true } : block
      )
    );
  };

  return (
    <div style={{height: '620px',backgroundImage: "url('../../images/demineur/noMansLand.png')",backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <Container>
      <Row>
        <Col xs={4}>
          <h1>Test affichage grid:</h1>
          <p>Pour l'instant, dimension grille hard codé à 10x10:<br />Test de changements d'états des blocks:<br />
          Clique gauche, tourne en terre si herbe.<br />Clique droit, plante un flag si herbe.<br />
          Clique gauche ou droit de fait rien sur terre.<br />Ce côté va être la zone d'interface pour générer le jeux.</p>
          <SelectionJeu
            niveaux={niveauxTab}
            onNiveauSelect={handleNiveauSelect}
            niveauActif={niveauActif}
          />
        </Col>
        <Col xs={8} className='d-flex justify-content-start'>          
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${niveau.dimensions}, 20px)`}}>
            {grille.map((block) => (
              <div key={block.id} style={{ width: "20px", height: "20px", cursor: block.cache ? 'url(../../images/demineur/curseurDemineur.png), auto' : 'auto' } }

                onClick={() => {handleLeftClick(block.id)}}

                onMouseOver={() =>console.log("x: "+block.x+"\n"+                           // Diag test valeurs au mouseOver console.log()
                                              "y: "+block.y+"\n"+
                                              "id: "+block.id+"\n"+
                                              "valeur: "+block.valeur+"\n"+
                                              "caché: "+block.cache+"\n"+
                                              "drapeau: "+block.drapeau+"\n"+
                                              "mine: "+block.mine)}  

                onContextMenu={(e) => { e.preventDefault(); handleRightClick(block.id);}}>

                {block.cache ? (                                                            // Conditions temporaires pour changer les états 
                  block.drapeau ? (                                                         // "cache" et "drapeau" sur clique gauche et droit.
                    <img src="../../images/demineur/herbeDrapeau.png" alt="herbeDrapeau" />    // Revoir les conditions pour enlever le flag avec un rightClick.
                  ) : (                                                                     // Revoir les conditions pour ne pas pouvoir faire de leftClick si flag.
                    <img src="../../images/demineur/herbe.png" alt="herbe" />
                  )
                ) : (
                  <img src={`../../images/demineur/terre${block.valeur}.png`} alt="terre" />
                )}

              </div>
            ))}
          </div>          
        </Col>
      </Row>
    </Container>
    </div>
  );
}
