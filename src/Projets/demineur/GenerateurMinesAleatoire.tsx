import { INiveau } from "./Niveau";


export function GenerateurMinesAleatoire({dimensions, qtMines}: INiveau):number[] {
    const qtBlocks: number = Math.pow(dimensions,2);
    const minesTab: number[] = [qtBlocks];

    while (minesTab.length < qtMines) {
        const indexMine = Math.floor(Math.random() * qtBlocks);
        if (!minesTab.includes(indexMine)) {
            minesTab.push(indexMine);
        }
    }   

    return minesTab.sort();
}
