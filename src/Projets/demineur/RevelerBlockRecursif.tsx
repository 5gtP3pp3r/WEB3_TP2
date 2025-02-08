import { IBlock } from "./IBlock";
import { INiveau } from './INiveau';
import { 
    voirNordId, 
    voirNordEstId, 
    voirEstId, 
    voirSudEstId, 
    voirSudId, 
    voirSudOuestId, 
    voirOuestId, 
    voirNordOuestId
 } from './VoirIdBlocksVoisins';
 

export function RevelerBlockRecursif(niveau: INiveau, id: number, grille: IBlock[]): IBlock[] {
    let nouvelleGrille = [...grille];
    const bloc = nouvelleGrille.find(block => block.id === id);

    if (!bloc || !bloc.cache || bloc.mine) return nouvelleGrille;

    bloc.cache = false; 

    if (bloc.valeur === 0) {
        const voisins = [
            voirNordId(bloc, nouvelleGrille),
            voirNordEstId(niveau, bloc, nouvelleGrille),
            voirEstId(niveau, bloc, nouvelleGrille),
            voirSudEstId(niveau, bloc, nouvelleGrille),
            voirSudId(niveau, bloc, nouvelleGrille),
            voirSudOuestId(niveau, bloc, nouvelleGrille),
            voirOuestId(bloc, nouvelleGrille),
            voirNordOuestId(bloc, nouvelleGrille)
        ];

        voisins.forEach(voisinId => {
            if (typeof voisinId === "number" && voisinId >= 0) {
                nouvelleGrille = RevelerBlockRecursif(niveau, voisinId, nouvelleGrille);
            }
        });
    }

    return nouvelleGrille;
}
