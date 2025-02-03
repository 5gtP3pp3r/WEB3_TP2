import { INiveau } from "./Niveau";

interface ResultatJeuProps {
    niveau: INiveau;
    nbMinesTrouves: number;
    tempsSecondes: number;
    nbClicks: number;
    estEnJeu: boolean;
    
}

// Logique personnelle de calcule de points. Chaque niveau a une quantité de point de base.
// À se pointage on soustrait le temp de complétion du jeux.
// plus on prend de temps plus de points son perdus.
// Ensuite, si le résultat est toujours positif, on soustrait le nombres de clicks, autant gauche (découvrir block) que droit (mettre un drapeau).
// Mettre et enlever un drapeau à répétitions sur un même block réduit donc les points d'avantage.
// On ajoute une pénalitée pour avoir touché une mine. On perd le nombres de mines non trouvées * 10 points
// En dernier on ajoute le nombre de mines découvertes. 

export function ResultatJeu({niveau, nbMinesTrouves, tempsSecondes, nbClicks, estEnJeu}: ResultatJeuProps): JSX.Element {
    const { difficulte, pointsBase, qtMines } = niveau;

    const minute: number = tempsSecondes > 59 ? Math.floor(tempsSecondes / 60) : 0;  
    const seconde: number = tempsSecondes % 60;
    const minuteString: string = minute > 0 ? " minutes, " : "";

    const pointsApresTemps = Math.max(pointsBase - tempsSecondes, 0);
    const pointsApresClicks = Math.max(pointsApresTemps - nbClicks, 0);
    const penaliteMinesManquantes = (qtMines - nbMinesTrouves) * 50;
    const pointsApresPenalite = Math.max(pointsApresClicks - penaliteMinesManquantes, 0);
    const pointsTotal = pointsApresPenalite + (nbMinesTrouves * 5);

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
                <li>Points total: {pointsTotal}</li>
            </ul>        
        </div>
    );
}
