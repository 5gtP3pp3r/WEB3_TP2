import { IBlock } from "./IBlock";
import { INiveau } from "./INiveau";
import { ChercherNbMinesVoisins } from "./ChercherNbMinesVoisins";
import { GenerateurMinesAleatoire } from "./GenerateurMinesAleatoire";

export function GenererGrille(niveau: INiveau): IBlock[] {
    const minesTab = GenerateurMinesAleatoire(niveau);
    const grille: IBlock[] = [];   
    const qtBlock = Math.pow(niveau.dimensions,2);
    let valeur = 0;
    const cache = true;             
    const drapeau = false;
    let mine = false;    
    for (let id = 0; id < qtBlock; ++id) {
        const x = id % niveau.dimensions; 
        const y = Math.floor(id / niveau.dimensions); 
        mine = minesTab.includes(id) ? true : false;     
        valeur = mine ? 9 : 0;   
        grille.push({
            x,
            y,
            id,
            valeur,   
            cache,
            drapeau,
            mine,
        });
    }    
    grille.forEach(block => {
        if (!block.mine) {
            block.valeur = ChercherNbMinesVoisins(niveau, block, grille);
        }
    });
    return grille;
}
