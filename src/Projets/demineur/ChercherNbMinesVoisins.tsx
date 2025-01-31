import { IBlock } from './IBlock';
import { INiveau } from './Niveau';


export function ChercherNbMinesVoisins(niveau: INiveau, block: IBlock, grille: IBlock[]): number {
    const { dimensions } = niveau;
    const maxX: number = dimensions - 1;
    const maxY: number = dimensions - 1;
    let nbMines: number = 0;
       
    if (block.y > 0) {
        const blockNord: IBlock = grille.find(b => b.x === block.x && b.y === block.y - 1) ?? block;    // enlevé soulignement "undefined possible"
        if (blockNord.mine) {
            ++nbMines;
        }
    }           
    if (block.y > 0 && block.x < maxX) {
        const blockNordEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y - 1) ?? block;  
        if (blockNordEst.mine) {
            ++nbMines;
        }
    }    
    if (block.x < maxX) {
        const blockEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y) ?? block; 
        if (blockEst.mine) {
            ++nbMines;
        }
    }    
    if (block.x < maxX && block.y < maxY) {
        const blockSudEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y + 1) ?? block; 
        if (blockSudEst.mine) {
            ++nbMines;
        }
    }
    if (block.y < maxY) {
        const blockSud: IBlock = grille.find(b => b.x === block.x && b.y === block.y + 1) ?? block; 
        if (blockSud.mine) {
            ++nbMines;
        }
    }    
    if (block.y < maxY && block.x > 0) {
        const blockSudOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y + 1) ?? block; 
        if (blockSudOuest.mine) {
            ++nbMines;
        }
    }    
    if (block.x > 0) {
        const blockOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y) ?? block; 
        if (blockOuest.mine) {
            ++nbMines;
        }
    }
    if (block.x > 0 && block.y > 0) {
        const blockNordOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y - 1) ?? block; 
        if (blockNordOuest.mine) {
            ++nbMines;
        }
    }

     return nbMines;   
}
