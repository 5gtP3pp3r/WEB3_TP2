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
        classeAlerte = "alert alert-success";
    } else if(estPerdue) {
        resultat = "Partie perdue!";
        classeAlerte = "alert alert-danger";
    }
    return (
        <div className={classeAlerte} style={{ width: '200px', height: '60px' }}>{resultat}</div>
    );
}