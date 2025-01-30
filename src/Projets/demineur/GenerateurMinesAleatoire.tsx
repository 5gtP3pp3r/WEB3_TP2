import { INiveau } from "./Niveau";


export function GenerateurMinesAleatoire({dimensions, qtMines}: INiveau):number[] {
    const qtBlocks: number = Math.sqrt(dimensions);
    const minesTab: number[] = [];
    for (let index = 0; index < qtBlocks; ++index) {
        let indexMine: number = Math.floor(Math.random() * (qtMines - 0 + 1)) + 0;
        while (!minesTab.includes(indexMine)) {
            indexMine = Math.floor(Math.random() * (qtMines - 0 + 1)) + 0;
            minesTab.push(indexMine);
        }        
    }    
    return minesTab;
}