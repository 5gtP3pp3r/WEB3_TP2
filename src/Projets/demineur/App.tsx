import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { IBlock } from "./IBlock";
import { useRef } from 'react';

import { GestionAffichagesBlocksOnClickSurGrille } from './GestionAffichagesBlocksOnClickSurGrille';
import { SelectionJeu } from './SelectionJeu';
import { INiveau } from './INiveau';
import { niveauxTab } from './INiveau';
import { GenererGrille } from './GenererGrille';
import { StatsJeu } from './StatsJeu';
import { ResultatJeu } from './ResultatsJeu';
import { LeaderBord } from './LeaderBord';
import { RevelerBlockRecursif } from './RevelerBlockRecursif';
import { IJoueur } from './IJoueur';
import { ChoisirNomJoueur } from './ChoisirNomJoueur';
//import { FecthListeNomsApi } from './FetchListeNomsApi';


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
  const [ victoire, setVictoire ] = useState<boolean>(false);
  const [ pointage, setPointage ] = useState<number>(0);
  const [ joueurActif, setJoueurActif ] = useState<IJoueur>({nom: "none", niveau: "none", points: 0});
  const [ listeJoueurs, setListeJoueurs ] = useState<IJoueur[]>([]);

  const maxTime = 600;
  function demarrerTimer(): void {
    if (timer < maxTime && premierClick) {
      timerRef.current = window.setTimeout(() => {
        setTimer(timerPrecedent => timerPrecedent + 1);
        demarrerTimer();         
      }, 1000);
    }
  };

  const timerRef = useRef<number | null>(null);
  function arreterTimer(): void {
    if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }
  };

  function miseAJourJoueurJeu(): void {
    joueurActif.niveau = niveauActif;
    joueurActif.points = pointage;
    setJoueurActif(joueurActif);
    // Diag tests
    console.log("Stats Joueur Actif avec niveau et pointage:");
    console.log(joueurActif.nom);
    console.log(joueurActif.niveau);
    console.log(joueurActif.points);
    console.log("Liste des joueurs qui ont joués:");
    console.log(listeJoueurs);
  }

  function handleNiveauSelect(niveau: string): void {
    setNiveauActif(niveau);
    const niveauChoisi = niveauxTab.find((diff) => diff.difficulte === niveau);

    if (niveauChoisi) {
      setNiveauSelectionne(niveauChoisi);          
    }
    // Diag tests
    console.log("Niveau Selectioné: ");
    console.log("difficulte: "+niveauChoisi?.difficulte);
    console.log("dimensions: "+niveauChoisi?.dimensions);
    console.log("Qt mines: "+niveauChoisi?.qtMines);
    console.log("Points de base: "+niveauChoisi?.pointsBase);
  };

  function handelGenererNouvelleGrille(niveau: INiveau): void {
    arreterTimer();
    setEnJeu(true);    
    setNiveau(niveauSelectionne);
    setGrille(GenererGrille(niveau));  
    setDrapeauxAPlacer(niveau.qtMines);
    setMineTrouvees(0);
    setTimer(0);
    setPremierClick(true);
    // Diag tests
    console.log("Niveau Nouvelle grille générée: ");
    console.log("difficulte: "+niveau?.difficulte);
    console.log("dimensions: "+niveau?.dimensions);
    console.log("Qt mines: "+niveau?.qtMines);
    console.log("Points de base: "+niveau?.pointsBase);
  }

  function handleClickGauche(id: number): void {
    let nouvelleGrille = RevelerBlockRecursif(niveau, id, grille);

    if (grille.find(block => block.id === id)?.mine) {
      miseAJourJoueurJeu();
      setEnJeu(false);
      arreterTimer();
      setVictoire(false);
      nouvelleGrille = grille.map(block => ({ ...block, cache: false })); 
    } 
    demarrerTimer();
    setPremierClick(false);
    setGrille(nouvelleGrille);
    setNbClicks(prevNbClicks => prevNbClicks + 1);
  }
  
  function handleClickDroit(id: number): void {        
    const blocClick = grille.find(block => block.id === id);

    const nouvelleGrille = grille.map(block =>
        block.id === id ? { ...block, drapeau: !block.drapeau } : block
    );

    setGrille(nouvelleGrille);

    let nouveauxDrapeauxAPlacer = drapeauxAPlacer;
    let nouvellesMinesTrouvees = minesTrouvees;

    if (!blocClick?.drapeau) {  
        --nouveauxDrapeauxAPlacer;
        if (blocClick?.mine) {
          ++nouvellesMinesTrouvees;
        }
    } 
    else {
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
  // Diag tests
  console.log("Stats conditions victoire:");
  console.log("Mines trouvées: " + nouvellesMinesTrouvees);
  console.log(nouvellesMinesTrouvees === niveau.qtMines);
  console.log("Drapeaux à placer: " + nouveauxDrapeauxAPlacer);
  console.log(drapeauxAPlacer === 0);

  if (nouvellesMinesTrouvees === niveau.qtMines && nouveauxDrapeauxAPlacer === 0) {
    miseAJourJoueurJeu();
    setEnJeu(false);
    arreterTimer();
    setVictoire(true);
  }  
} 

  return (
    <div style={{height: '620px',backgroundImage: "url('../../images/demineur/noMansLand.png')",backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <Container>
      <Row>
        <Col xs={3}>
          <Row>
            <h5>Les règles sont simples:</h5>
            <div className='mt-3 mb-3'>
              <h6>Choisir ou changer de joueur:</h6>
              <ChoisirNomJoueur
                listeJoueurs={listeJoueurs}
                setJoueur={setJoueurActif} 
                setListeJoueurs={setListeJoueurs}
              /> 
            </div>
          </Row>            
          <Row>
            <h6> Choisir un niveau:</h6>
            <SelectionJeu
              estJoueurActif={joueurActif.nom == "none" ? true : false}
              niveaux={niveauxTab}
              niveauActif={niveauActif}
              onNiveauSelect={handleNiveauSelect}
              onLancerJeu={handelGenererNouvelleGrille}
            />
          </Row>
        </Col>
        <Col xs={6} >                
          <StatsJeu temps={timer} nbMine={drapeauxAPlacer}/>   
          <div className="d-flex justify-content-center" >          
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${niveau.dimensions}, 20px)`}}>
            {grille.map((block) => (
              <div key={block.id} style={{ width: "20px", height: "20px", cursor: block.cache ? 'url(../../images/demineur/curseurDemineur.png), auto' : 'auto' }}

                onClick={() => {handleClickGauche(block.id)}}

                /****** Diag test valeurs au mouseOver console.log() ******/
                onMouseOver={() =>console.log("x: "+block.x+"\n"+                           
                                              "y: "+block.y+"\n"+                           
                                              "id: "+block.id+"\n"+                         
                                              "valeur: "+block.valeur+"\n"+                 
                                              "caché: "+block.cache+"\n"+                   
                                              "drapeau: "+block.drapeau+"\n"+               
                                              "mine: "+block.mine)}                         
                /**********************************************************/
                
                onContextMenu={(e) => { e.preventDefault(); handleClickDroit(block.id);}}>
                {GestionAffichagesBlocksOnClickSurGrille(block)}                
              </div>
            ))}
          </div> 
          </div>                    
        </Col>
        <Col xs={3}>
            <Row>
              <ResultatJeu              
                niveau={niveau} 
                nbMinesTrouves={minesTrouvees} 
                tempsSecondes={timer} 
                nbClicks={nbClicks} 
                estEnJeu={enJeu}
                victoire={victoire}
                setPointage={setPointage}
              />
            </Row>
            <Row>
              <LeaderBord listeJoueurs={listeJoueurs} />            
            </Row>            
        </Col>
      </Row>
    </Container>
    </div>
  );
}
