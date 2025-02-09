import { Table } from "react-bootstrap";

import { IJoueur } from "./IJoueur";

interface ListeJoueursProps {
    listeJoueurs: IJoueur[];
}

export function LeaderBord({listeJoueurs}: ListeJoueursProps): JSX.Element {
    // Préfiltrage pour ne pas "polluer visuellement" le tableau dans le return
    // LeaderBord ne conserve pas les points à 0
    const listeFacile: IJoueur[] = listeJoueurs
        .filter((joueur) => (joueur.niveau === "facile" && joueur.points > 0)) 
        .sort((a, b) => b.points - a.points) 
        .slice(0, 3); 
    const listeIntermediaire: IJoueur[] = listeJoueurs
        .filter((joueur) => (joueur.niveau === "intermédiaire" && joueur.points > 0)) 
        .sort((a, b) => b.points - a.points) 
        .slice(0, 3);
    const listeExpert: IJoueur[] = listeJoueurs
        .filter((joueur) => (joueur.niveau === "expert" && joueur.points > 0)) 
        .sort((a, b) => b.points - a.points) 
        .slice(0, 3);

    return (
        <div className="d-flex-justify-content-center" style={{ width:'320px'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={2}><h4>Leader Bord</h4></th>
                    </tr>                   
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}><strong className="text-success">Niveau facile</strong></td>                                                                         
                    </tr>  
                        {listeFacile
                            .map((joueur, index) => (
                                <tr key={index}>
                                    <td>{joueur.nom}</td>
                                    <td>{joueur.points} pts</td>
                                </tr>
                            ))}   
                    <tr>
                        <td colSpan={2}><strong className="text-warning">Niveau intermédiaire</strong></td>                                            
                    </tr>
                        {listeIntermediaire
                            .map((joueur, index) => (
                                <tr key={index}>
                                    <td>{joueur.nom}</td>
                                    <td>{joueur.points}</td>
                                </tr>
                            ))}       
                    <tr>
                        <td colSpan={2}><strong className="text-danger">Niveau expert</strong></td>
                    </tr>
                        {listeExpert
                            .map((joueur, index) => (
                                <tr key={index}>
                                    <td>{joueur.nom}</td>
                                    <td>{joueur.points}</td>
                                </tr>
                            ))}   
                </tbody>
            </Table>
        </div>
    );
}
