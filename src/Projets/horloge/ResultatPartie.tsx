import { Paquet } from './Horloge'

interface ResultatPartieProps {
    estGagnee: boolean;
    estPerdue: boolean
}

export function ResultatPartie(props: ResultatPartieProps) {
    const { estGagnee, estPerdue } = props;
    let resultat: string = "";
    let classeAlerte: string = "";
    if(estGagnee) {
        resultat = "Partie gagnée!";
        classeAlerte = "Alert Alert-success";
    } else if(estPerdue) {
        resultat = "Partie perdue!";
        classeAlerte = "Alert Alert-danger";
    }
    return (
        <div className={classeAlerte}>{resultat}</div>
    );
}