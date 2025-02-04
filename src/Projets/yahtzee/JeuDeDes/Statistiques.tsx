import { StatsDes } from "./StatsDes";
import { TotalMains } from "./TotalMain";

interface StatistiquesProps{
    mainDes: number[]
}

export function Statistiques(props : StatistiquesProps){
    return (
        <>
            <TotalMains mainDes={props.mainDes}/>
            <StatsDes mainDes={props.mainDes}/>
        </>
    );
}