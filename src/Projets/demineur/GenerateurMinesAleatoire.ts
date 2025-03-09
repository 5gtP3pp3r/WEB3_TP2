import { INiveau } from "./INiveau";


export function GenerateurMinesAleatoire({dimensions, qtMines}: INiveau):number[] {
    const qtBlocks: number = Math.pow(dimensions,2);
    const minesTab: number[] = [];

    while (minesTab.length < qtMines) {
        const indexMine = Math.floor(Math.random() * (qtBlocks - 1));
        if (!minesTab.includes(indexMine)) {
            minesTab.push(indexMine);
        }
    }  
    /**********  Diag tests **********/
    //console.log("Valeurs dans le générateur de mines: ");
    //console.log("Dimensions: "+dimensions);
    //console.log("Qt mines: "+qtMines);
    //console.log("qt blocks: "+qtBlocks);
    //console.log("Tableau de mines: "+minesTab.sort());
    /*********************************/

    return minesTab;
}
