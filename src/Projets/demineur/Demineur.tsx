import { useRef } from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import { IBlock } from "./IBlock";
import { IJoueur } from './IJoueur';
import { StatsJeu } from './StatsJeu';
import { LeaderBord } from './LeaderBord';
import { ResultatJeu } from './ResultatsJeu';
import { SelectionJeu } from './SelectionJeu';
import { GenererGrille } from './GenererGrille';
import { ChoisirNomJoueur } from './ChoisirNomJoueur';
import { INiveau, niveauxTab } from './INiveau';
import { RevelerBlockRecursif } from './RevelerBlockRecursif';
import { GestionAffichagesBlocksOnClickSurGrille } from './GestionAffichagesBlocksOnClickSurGrille';

export function Demineur() {
  /*********** Constantes *************/
  const niveauDefaut: INiveau = {difficulte:"facile", dimensions: 8, qtMines: 10, pointsBase:500};
  const JoueurActifDefaut: IJoueur = {nom: "none", niveau: "none", points: 0};
  const maxTime = 600;
  const timerRef = useRef<number | null>(null);

  /************* États ***************/
  const [ grille, setGrille ] = useState<IBlock[]>([]);
  const [ niveau, setNiveau ] = useState<INiveau>(niveauDefaut); 
  const [ niveauActif, setNiveauActif ] = useState<string>("");
  const [ niveauSelectionne, setNiveauSelectionne ] = useState(niveau);
  const [ enJeu, setEnJeu ] = useState<boolean>(true);
  const [ premierClick, setPremierClick ] = useState<boolean>(true);
  const [ nbClicks, setNbClicks ] = useState<number>(0);
  const [ drapeauxAPlacer, setDrapeauxAPlacer ] = useState<number>(0);
  const [ minesTrouvees, setMineTrouvees ] = useState<number>(0);
  const [ timer, setTimer ] = useState<number>(0);
  const [ victoire, setVictoire ] = useState<boolean>(false);
  const [ pointage, setPointage ] = useState<number>(0);
  const [ joueurActif, setJoueurActif ] = useState<IJoueur>(JoueurActifDefaut);
  const [ listeJoueurs, setListeJoueurs ] = useState<IJoueur[]>([]);

  /*********** Fonctions *************/
  function demarrerTimer(): void {
    if (timer < maxTime && premierClick) {
      timerRef.current = window.setTimeout(() => {
        setTimer(timerPrecedent => timerPrecedent + 1);
        demarrerTimer();         
      }, 1000);
    }
  }
 
  function arreterTimer(): void {
    if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }
  }

  function miseAJourJoueurJeu(): void {
    const joueurMisAJour: IJoueur = {...joueurActif, niveau: niveauActif, points: pointage };
    setJoueurActif(joueurMisAJour);
    setListeJoueurs((listePrecedente) => [...listePrecedente, joueurMisAJour]);
    /**********  Diag tests **********/
    /**/console.log("Stats Joueur Actif avec niveau et pointage:");
    /**/console.log(joueurActif.nom);
    /**/console.log(joueurActif.niveau);
    /**/console.log(joueurActif.points);
    /**/console.log("Liste des joueurs qui ont joués:");
    /**/console.log(listeJoueurs);
    /*********************************/
  }

  function selectionNiveau(niveau: string): void {
    setNiveauActif(niveau);
    const niveauChoisi = niveauxTab.find((diff) => diff.difficulte === niveau);

    if (niveauChoisi) {
      setNiveauSelectionne(niveauChoisi);          
    }
    /**********  Diag tests **********/
    /**/console.log("Niveau Selectioné: ");
    /**/console.log("difficulte: "+niveauChoisi?.difficulte);
    /**/console.log("dimensions: "+niveauChoisi?.dimensions);
    /**/console.log("Qt mines: "+niveauChoisi?.qtMines);
    /**/console.log("Points de base: "+niveauChoisi?.pointsBase);
    /*********************************/
  }

  function genererNouvelleGrille(niveau: INiveau): void {
    arreterTimer();
    setEnJeu(true);    
    setNiveau(niveauSelectionne);
    setGrille(GenererGrille(niveau));  
    setDrapeauxAPlacer(niveau.qtMines);
    setMineTrouvees(0);
    setTimer(0);
    setPremierClick(true);
    /**********  Diag tests **********/
    /**/console.log("Niveau Nouvelle grille générée: ");
    /**/console.log("difficulte: "+niveau?.difficulte);
    /**/console.log("dimensions: "+niveau?.dimensions);
    /**/console.log("Qt mines: "+niveau?.qtMines);
    /**/console.log("Points de base: "+niveau?.pointsBase);
    /*********************************/
  }

  function handleClickGauche(id: number): void {
    let nouvelleGrille = RevelerBlockRecursif(niveau, id, grille);
    const estUneMine = grille.find(block => block.id === id)?.mine ?? false;

    if (estUneMine) {
      miseAJourJoueurJeu();
      setEnJeu(false);
      arreterTimer(); 
      setVictoire(false);
      nouvelleGrille = grille.map(block => ({ ...block, cache: false })); 
  } else {
      if (premierClick) {
          demarrerTimer();
          setPremierClick(false);
      }
  }

  setGrille(nouvelleGrille);
  setNbClicks(NbClicksPrecedent => NbClicksPrecedent + 1);
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
  setNbClicks(NbClicksPrecedent => NbClicksPrecedent + 1);  
  /**********  Diag tests **********/
  /**/console.log("Stats conditions victoire:");
  /**/console.log("Mines trouvées: " + nouvellesMinesTrouvees);
  /**/console.log(nouvellesMinesTrouvees === niveau.qtMines);
  /**/console.log("Drapeaux à placer: " + nouveauxDrapeauxAPlacer);
  /**/console.log(drapeauxAPlacer === 0);
  /*********************************/

  if (nouvellesMinesTrouvees === niveau.qtMines && nouveauxDrapeauxAPlacer === 0) {
    miseAJourJoueurJeu();
    setEnJeu(false);
    arreterTimer();
    setVictoire(true);
  }  
} 

  /*********** Affichage *************/
  return (
    <div style={{
      backgroundImage: "url('../../images/demineur/noMansLand.png')",
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '650px'
    }}>
      <Container>
        <Row>
          <Col md={12} lg={4} xl={2}>
            <Row>            
              <div className='mt-5 mb-3'>             
                <ChoisirNomJoueur
                  listeJoueurs={listeJoueurs}
                  setJoueur={setJoueurActif} 
                /> 
              </div>
            </Row>            
            <Row>
              <SelectionJeu
                estJoueurActif={joueurActif.nom == "none" ? true : false}
                niveaux={niveauxTab}
                niveauActif={niveauActif}
                onNiveauSelect={selectionNiveau}
                onLancerJeu={genererNouvelleGrille}
              />
            </Row>
          </Col>
          <Col md={12} lg={8} xl={7}>                
            <StatsJeu temps={timer} nbMine={drapeauxAPlacer}/>   
              <div className="d-flex justify-content-center mb-5" >          
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${niveau.dimensions}, 22px)`}}>
                  {grille.map((block) => (
                    <div key={block.id} style={{ width: "22px", height: "22px", cursor: block.cache ? 'url(../../images/demineur/curseurDemineur.png), auto' : 'auto' }}

                      onClick={() => {handleClickGauche(block.id)}}

                      /****** Diag test valeurs au mouseOver console.log() ******/
                      /**/onMouseOver={() =>console.log("x: "+block.x+"\n"+                           
                      /**/                              "y: "+block.y+"\n"+                           
                      /**/                              "id: "+block.id+"\n"+                         
                      /**/                              "valeur: "+block.valeur+"\n"+                 
                      /**/                              "caché: "+block.cache+"\n"+                   
                      /**/                              "drapeau: "+block.drapeau+"\n"+               
                      /**/                              "mine: "+block.mine)}                         
                      /**********************************************************/
                    
                      onContextMenu={(e) => { e.preventDefault(); handleClickDroit(block.id);}}>
                      {GestionAffichagesBlocksOnClickSurGrille(block)}                
                    </div>
                  ))}
                </div> 
              </div>                    
          </Col>
          <Col md={12} lg={0} xl={3}>
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
