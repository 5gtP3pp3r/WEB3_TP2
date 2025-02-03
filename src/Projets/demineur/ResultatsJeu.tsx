import { INiveau } from "./Niveau";

interface ResultatJeuProps {
    niveau: INiveau;
    nbMinesTrouves: number;
    tempsSecondes: number;
    nbClicks: number;
    estEnJeu: boolean;
    
}

export function ResultatJeu({niveau, nbMinesTrouves, tempsSecondes, nbClicks, estEnJeu}: ResultatJeuProps): JSX.Element {
    const { difficulte, pointsBase } = niveau;

    const minute: number = tempsSecondes > 59 ? Math.floor(tempsSecondes / 60) : 0;  
    const seconde: number = tempsSecondes % 60;
    const minuteString: string = minute > 0 ? " minutes, " : "";

    const pointsTemps = pointsBase - tempsSecondes > 0 ? pointsBase - tempsSecondes : 0;
    const pointsClicks = pointsTemps - nbClicks > 0 ? pointsTemps - nbClicks : 0;
    const pontTotal = pointsClicks + nbMinesTrouves;

    return estEnJeu ? (
        <div className="d-flex-justify-content-center" style={{ height:'175px'}}>    
            <></>        
        </div>
    ) : (
        <div className="d-flex-justify-content-center" style={{ height:'175px'}}>    
            <h3>Résultats de la partie</h3>
            <ul>
                <li>Niveau: {difficulte}</li>
                <li>Mines trouvé:  {nbMinesTrouves}</li>
                <li>Temps: {minute}{minuteString}{seconde} secondes</li>
                <li>Points total: {pontTotal}</li>
            </ul>        
        </div>
    );
}