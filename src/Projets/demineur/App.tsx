import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { IBlock } from "./IBlock";
import { useRef } from 'react';

import { GestionAffichagesBlocksOnClickSurGrille } from './GestionAffichagesBlocksOnClickSurGrille';
import { SelectionJeu } from './SelectionJeu';
import { INiveau } from './Niveau';
import { niveauxTab } from './Niveau';
import { GenererGrille } from './GenererGrille';
import { StatsJeu } from './Statsjeu';
import { ResultatJeu } from './ResultatsJeu';
import { LeaderBord } from './LeaderBord';


export function App() {
  const [ grille, setGrille ] = useState<IBlock[]>([]);
  const [ niveau, setNiveau ] = useState<INiveau>({difficulte:"facile", dimensions: 8, qtMines: 10, pointsBase:500}); 
  const [ niveauActif, setNiveauActif ] = useState<string>("facile");
  const [ niveauSelectionne, setNiveauSelectionne ] = useState(niveau);
  const [ enJeu, setEnJeu ] = useState<boolean>(true);
  const [ premierClick, setPremierClick ] = useState<boolean>(true);
  const [ nbClicks, setNbClicks ] = useState<number>(0);
  const [ drapeauxAPlacer, setDrapeauxAPlacer ] = useState<number>(0);
  const [ minesTrouvees, setMineTrouvees ] = useState<number>(0);
  const [ timer, setTimer ] = useState<number>(0);
  
  
  const maxTime = 600;
  function demarrerTimer() {
    if (timer < maxTime && premierClick) {
      timerRef.current = window.setTimeout(() => {
        setTimer(timerPrecedent => timerPrecedent + 1);
        demarrerTimer();         
      }, 1000);
    }
  };

  const timerRef = useRef<number | null>(null);
  function arreterTimer() {
    if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }
  };

  function handleNiveauSelect(niveau: string) {
    setNiveauActif(niveau);
    const niveauChoisi = niveauxTab.find((diff) => diff.difficulte === niveau);

    if (niveauChoisi) {
      setNiveauSelectionne(niveauChoisi);          
    }
    console.log("Niveau Selectioné: ");
    console.log("difficulte: "+niveauChoisi?.difficulte);
    console.log("dimensions: "+niveauChoisi?.dimensions);
    console.log("Qt mines: "+niveauChoisi?.qtMines);
    console.log("Points de base: "+niveauChoisi?.pointsBase);
  };

  function handelGenererNouvelleGrille(niveau: INiveau) {
    arreterTimer();
    if (!enJeu) setEnJeu(true);   // temp pour enlever soulignement const useState   
    setNiveau(niveauSelectionne);
    setGrille(GenererGrille(niveau));  
    setDrapeauxAPlacer(niveau.qtMines);
    setMineTrouvees(0);
    setTimer(0);
    setPremierClick(true);
    console.log("Niveau Nouvelle grille générée: ");
    console.log("difficulte: "+niveau?.difficulte);
    console.log("dimensions: "+niveau?.dimensions);
    console.log("Qt mines: "+niveau?.qtMines);
    console.log("Points de base: "+niveau?.pointsBase);
  }

  function handleClickGauche(id: number) {       
    const blocClick = grille.find(block => block.id === id);

    let nouvelleGrille;
    if (blocClick?.mine) {
        setEnJeu(false);
        arreterTimer();
        nouvelleGrille = grille.map(block => ({ ...block, cache: false }));
    } 
    else {
      nouvelleGrille = grille.map(block =>
          block.id === id && !block.drapeau ? { ...block, cache: false } : block
      );
    }

    setGrille(nouvelleGrille);
    demarrerTimer();
    setPremierClick(false);
    setNbClicks(prevNbClicks => prevNbClicks + 1);
}
  
function handleClickDroit(id: number) {        
  const blocClick = grille.find(block => block.id === id);
  if (!blocClick) return;

  const nouvelleGrille = grille.map(block =>
      block.id === id ? { ...block, drapeau: !block.drapeau } : block
  );

  setGrille(nouvelleGrille);

  let nouveauxDrapeauxAPlacer = drapeauxAPlacer;
  let nouvellesMinesTrouvees = minesTrouvees;

  if (!blocClick.drapeau) {  
      --nouveauxDrapeauxAPlacer;
      if (blocClick.mine) {
        ++nouvellesMinesTrouvees;
      }
  } else {
      ++nouveauxDrapeauxAPlacer;
      if (blocClick.mine) {
          --nouvellesMinesTrouvees;
      }
  }
  setDrapeauxAPlacer(nouveauxDrapeauxAPlacer);
  setMineTrouvees(nouvellesMinesTrouvees);
  demarrerTimer();
  setPremierClick(false);
  setNbClicks(prevNbClicks => prevNbClicks + 1);

  if (nouvellesMinesTrouvees === niveau.qtMines) {
      setEnJeu(false);
      arreterTimer();
  }
  console.log("Drapeaux à placer: " + nouveauxDrapeauxAPlacer);
  console.log("Mines trouvées: " + nouvellesMinesTrouvees);
} 

  return (
    <div style={{height: '620px',backgroundImage: "url('../../images/demineur/noMansLand.png')",backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <Container>
      <Row>
        <Col xs={3}>
          <h3>Test affichage grid:</h3>
          <p>-Test de changements d'états des blocks fonctionnels<br />
          -Ce côté va être la zone d'interface pour générer le jeux.<br />
          -Affichage mines et valeurs fonctionnelles!<br />
          -Trouver comment éviter un réaffichage à la sélection de la difficulté lorsque le jeu est en cours.</p>
          <SelectionJeu
            niveaux={niveauxTab}
            niveauActif={niveauActif}
            onNiveauSelect={handleNiveauSelect}
            onLancerJeu={handelGenererNouvelleGrille}
          />
        </Col>
        <Col xs={6} >                
          <StatsJeu temps={timer} nbMine={drapeauxAPlacer}/>   
          <div className="d-flex justify-content-center" >          
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${niveau.dimensions}, 20px)`}}>
            {grille.map((block) => (
              <div key={block.id} style={{ width: "20px", height: "20px", cursor: block.cache ? 'url(../../images/demineur/curseurDemineur.png), auto' : 'auto' }}

                onClick={() => {handleClickGauche(block.id)}}

                onMouseOver={() =>console.log("x: "+block.x+"\n"+                           // Diag test valeurs au mouseOver console.log()
                                              "y: "+block.y+"\n"+                           //
                                              "id: "+block.id+"\n"+                         //
                                              "valeur: "+block.valeur+"\n"+                 //
                                              "caché: "+block.cache+"\n"+                   //
                                              "drapeau: "+block.drapeau+"\n"+               //
                                              "mine: "+block.mine)}                         //

                onContextMenu={(e) => { e.preventDefault(); handleClickDroit(block.id);}}>
                {GestionAffichagesBlocksOnClickSurGrille(block)}                
              </div>
            ))}
          </div> 
          </div>                    
        </Col>
        <Col xs={3}>
            <Row>
              <ResultatJeu              /**** NE PAS OUBLIER DE REVOIR LES PARAMETRES POUR LES VRAIS ****/
                niveau={niveau} 
                nbMinesTrouves={minesTrouvees} 
                tempsSecondes={timer} 
                nbClicks={nbClicks} 
                estEnJeu={enJeu}
              />
            </Row>
            <Row>
              <LeaderBord               /**** NE PAS OUBLIER DE REVOIR LES PARAMETRES AVEC REQUETE API ****/
              />            
            </Row>            
        </Col>
      </Row>
    </Container>
    </div>
  );
}
