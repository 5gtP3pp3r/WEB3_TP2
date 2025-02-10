import { Table } from "react-bootstrap";

import { INiveau } from "./INiveau";

interface ResultatJeuProps {
    niveau: INiveau;
    nbMinesTrouves: number;
    tempsSecondes: number;
    nbClicks: number;
    estEnJeu: boolean;
    victoire: boolean;
    pointage: number;   
}

export function ResultatJeu({niveau, nbMinesTrouves, tempsSecondes, nbClicks, estEnJeu, victoire, pointage }: ResultatJeuProps): JSX.Element {
    const { difficulte } = niveau;

    const minute: number = tempsSecondes > 59 ? Math.floor(tempsSecondes / 60) : 0;  
    const seconde: number = tempsSecondes % 60;
    const minuteString: string = minute > 0 ? " minutes, " : "";
    const resultatPartie = victoire ? <h4 className='text-success'>VICTOIRE</h4> : <h4 className='text-danger'>DEFAITE</h4> ;

    return estEnJeu ? (
        <div className="d-flex-justify-content-center" style={{ height:'320px'}}>    
            <></>        
        </div>
    ) : (
        <div className="d-flex-justify-content-center" style={{ height:'320px', width:'330px'}}>
            <div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th colSpan={2}>{resultatPartie}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ width:'150px'}}><strong>Niveau</strong></td>
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
                        <td><strong>Nombre de clicks</strong></td>
                        <td>{nbClicks}</td>
                    </tr>
                    <tr>
                        <td><strong>Points total</strong></td>
                        <td>{pointage}</td> 
                    </tr>
                </tbody>
            </Table>
            </div>
        </div>   
    );
}
