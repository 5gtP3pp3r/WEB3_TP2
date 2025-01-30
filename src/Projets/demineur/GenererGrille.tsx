import { INiveau } from "./Niveau";
import { IBlock } from "./IBlock";
import { GenerateurMinesAleatoire } from "./GenerateurMinesAleatoire";

export function GenererGrille(niveau: INiveau): IBlock[] {

    const minesTab = GenerateurMinesAleatoire(niveau);
    const grid: IBlock[] = [];   
    const qtBlock = Math.sqrt(niveau.dimensions);
    const valeur = 0;
    const cache = true;             // Mettre dans un Fichier à part pour être appelé avec un bouton 
    const drapeau = false;
    let mine = false;    
    for (let id = 0; id < qtBlock; ++id) {
        const x = id % niveau.dimensions; 
        const y = Math.floor(id / niveau.dimensions); 
        mine = minesTab.includes(id) ? true : false;      
        // Je crois que je vais ajouter une fonction externe qui va me retourné des id aléatoires -> CHECK
        // pour passer mine à vrai. à voir comment implanter `ca vers ici avant le grid.push -> CHECK
        // Vérifications des mines des voisins ici pour modifier la "valeur". -> TODO
        grid.push({
            x,
            y,
            id,
            valeur,   
            cache,
            drapeau,
            mine,
        });
    }    
    return grid;
}
