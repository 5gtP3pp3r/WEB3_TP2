import { Table } from "react-bootstrap";
import { INiveau } from "./Niveau";

interface ResultatJeuProps {
    niveau: INiveau;
    nbMinesTrouves: number;
    tempsSecondes: number;
    nbClicks: number;
    estEnJeu: boolean;
    victoire: boolean;
    
}

// Logique personnelle de calcule de points. Chaque niveau a une quantité de point de base.
// À se pointage on soustrait le temp de complétion du jeux.
// plus on prend de temps plus de points son perdus.
// Ensuite, si le résultat est toujours positif, on soustrait le nombres de clicks, autant gauche (découvrir block) que droit (mettre un drapeau).
// Mettre et enlever un drapeau à répétitions sur un même block réduit donc les points d'avantage.
// On ajoute une pénalitée pour avoir touché une mine. On perd le nombres de mines non trouvées * 10 points
// En dernier on ajoute le nombre de mines découvertes. 

export function ResultatJeu({niveau, nbMinesTrouves, tempsSecondes, nbClicks, estEnJeu, victoire}: ResultatJeuProps): JSX.Element {
    const { difficulte, pointsBase, qtMines } = niveau;

    const minute: number = tempsSecondes > 59 ? Math.floor(tempsSecondes / 60) : 0;  
    const seconde: number = tempsSecondes % 60;
    const minuteString: string = minute > 0 ? " minutes, " : "";

    const pointsApresTemps: number = Math.max(pointsBase - tempsSecondes, 0);
    const pointsApresClicks: number = Math.max(pointsApresTemps - nbClicks, 0);
    const penaliteMinesManquantes: number = (qtMines - nbMinesTrouves) * 50;
    const pointsApresPenalite: number = Math.max(pointsApresClicks - penaliteMinesManquantes, 0);
    const pointsTotal: number = pointsApresPenalite + (nbMinesTrouves * 5);

    const resultatPartie = victoire ? <h4 className='text-success'>VICTOIRE</h4> : <h4 className='text-danger'>DEFAITE</h4> ;

    return estEnJeu ? (
        <div className="d-flex-justify-content-center" style={{ height:'250px'}}>    
            <></>        
        </div>
    ) : (
        <div className="d-flex-justify-content-center" style={{ height:'250px'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={2}>{resultatPartie}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Niveau</strong></td>
                        <td>{difficulte}</td>                                                                         
                    </tr>
                    <tr>
                        <td><strong>Mines trouvé</strong></td>
                        <td>{nbMinesTrouves}</td>                                             
                    </tr>
                    <tr>
                        <td><strong>Temps</strong></td>
                        <td>{minute}{minuteString}{seconde} secondes</td>
                    </tr>
                    <tr>
                        <td><strong>Points total</strong></td>
                        <td>{pointsTotal}</td> 
                    </tr>
                </tbody>
            </Table>
        </div>   
    );
}
