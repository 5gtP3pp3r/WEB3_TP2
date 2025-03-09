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
    const block = nouvelleGrille.find(block => block.id === id);

    if (!block || !block.cache || block.mine || block.drapeau) return nouvelleGrille;

    block.cache = false; 

    if (block.valeur === 0) {
        const voisins = [
            voirNordId(block, nouvelleGrille),
            voirNordEstId(niveau, block, nouvelleGrille),
            voirEstId(niveau, block, nouvelleGrille),
            voirSudEstId(niveau, block, nouvelleGrille),
            voirSudId(niveau, block, nouvelleGrille),
            voirSudOuestId(niveau, block, nouvelleGrille),
            voirOuestId(block, nouvelleGrille),
            voirNordOuestId(block, nouvelleGrille)
        ];

        voisins.forEach(voisinId => {
            if (typeof voisinId === "number" && voisinId >= 0) {
                nouvelleGrille = RevelerBlockRecursif(niveau, voisinId, nouvelleGrille);
            }
        });
    }

    return nouvelleGrille;
}
