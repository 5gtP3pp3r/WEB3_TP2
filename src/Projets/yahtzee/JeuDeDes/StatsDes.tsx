
interface StatsProps {
    mainDes: number[];
}

export function StatsDes(props : StatsProps){
    const stats: { [valeur: number]: number } = {};
    props.mainDes.forEach((valeur) => {
        stats[valeur] = (stats[valeur] || 0) + 1;
    });

    return (
        <ul>
            {Object.entries(stats).map(([valeur, count]) => (
                <li key={valeur}>
                    Nombre de {valeur}: {count}
                </li>
            ))}
        </ul>
    );
};