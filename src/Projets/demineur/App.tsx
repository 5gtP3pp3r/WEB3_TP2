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
  const [ enJeu, setEnjeu ] = useState<boolean>(true);
  const [ premierClick, setPremierClick ] = useState<boolean>(true);
  const [ nbClicks, setNbClicks ] = useState<number>(0);
  const [ drapeauxPlaces, setdrapeauxPlaces ] = useState<number>(0);
  const [ timer, setTimer ] = useState<number>(0);
  
  
  const maxTime = 600;
  const demarrerTimer = () => {
    if (timer < maxTime && premierClick) {
      timerRef.current = window.setTimeout(() => {
        setTimer(timerPrecedent => timerPrecedent + 1);
        demarrerTimer();         
      }, 1000);
    }
  };
  const timerRef = useRef<number | null>(null);
  const arreterTimer = () => {
    if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }
};

  const handleLeftClick = (id: number) => {   
    setGrille(grille.map((block) =>
        block.id === id && !block.drapeau ? { ...block, cache: false } : block
      )    
    );
    demarrerTimer(); 
    setPremierClick(false);
    setNbClicks(nbClicks + 1);
  };
  
  //const minDrapeau = 0;
  const handleRightClick = (id: number) => {   
    setGrille(grille.map((block) =>
        block.id === id ? { ...block, drapeau: !block.drapeau } : block
      )    
    );

    if (grille.find((block) => block.id === id)?.drapeau) {       
        setdrapeauxPlaces(drapeauxPlaces + 1);            
    } else {
      //if (drapeauxPlaces > minDrapeau) {
        setdrapeauxPlaces(drapeauxPlaces - 1);
      //}
    }
  
    setNbClicks(nbClicks + 1);
  };

  const handleNiveauSelect = (niveau: string) => {
    setNiveauActif(niveau);
    const niveauChoisi = niveauxTab.find((diff) => diff.difficulte === niveau);

    if (niveauChoisi) {
      setNiveauSelectionne(niveauChoisi);          
    }
  };

  const handelGenererNouvelleGrille = (niveau: INiveau) => {
    arreterTimer();
    if (!enJeu) setEnjeu(true);   // temp pour enlever soulignement const useState   
    setNiveau(niveauSelectionne);
    setGrille(GenererGrille(niveau));  
    setdrapeauxPlaces(niveau.qtMines);
    setTimer(0);
    setPremierClick(true);
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
          <StatsJeu temps={timer} nbMine={drapeauxPlaces}/>   
          <div className="d-flex justify-content-center" >          
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${niveau.dimensions}, 20px)`}}>
            {grille.map((block) => (
              <div key={block.id} style={{ width: "20px", height: "20px", cursor: block.cache ? 'url(../../images/demineur/curseurDemineur.png), auto' : 'auto' }}

                onClick={() => {handleLeftClick(block.id)}}

                onMouseOver={() =>console.log("x: "+block.x+"\n"+                           // Diag test valeurs au mouseOver console.log()
                                              "y: "+block.y+"\n"+                           //
                                              "id: "+block.id+"\n"+                         //
                                              "valeur: "+block.valeur+"\n"+                 //
                                              "caché: "+block.cache+"\n"+                   //
                                              "drapeau: "+block.drapeau+"\n"+               //
                                              "mine: "+block.mine)}                         //

                onContextMenu={(e) => { e.preventDefault(); handleRightClick(block.id);}}>
                {GestionAffichagesBlocksOnClickSurGrille(block)}                
              </div>
            ))}
          </div> 
          </div>                    
        </Col>
        <Col xs={3}>
            <Row>
              <ResultatJeu niveau={niveau} nbMinesTrouves={10} tempsSecondes={55} nbClicks={nbClicks} estEnJeu={false}/>
            </Row>
            <Row>
              <LeaderBord />
            </Row>            
        </Col>
      </Row>
    </Container>
    </div>
  );
}
