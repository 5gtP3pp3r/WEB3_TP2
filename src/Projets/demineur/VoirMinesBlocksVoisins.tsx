import { IBlock } from './IBlock';
import { INiveau } from './INiveau';

export function voirNordMine(block: IBlock, grille: IBlock[]): number {
    if (block.y > 0) {
        const blockNord: IBlock = grille.find(b => b.x === block.x && b.y === block.y - 1) ?? block;    
        if (blockNord.mine) {
            return 1;
        }
    }    
    return 0;    
}

export function voirNordEstMine(niveau: INiveau, block: IBlock, grille: IBlock[]): number {
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;
    if (block.y > 0 && block.x < maxAxe) {
        const blockNordEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y - 1) ?? block;  
        if (blockNordEst.mine) {
            return 1;
        }        
    } 
    return 0;
}

export function voirEstMine(niveau: INiveau, block: IBlock, grille: IBlock[]): number {
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;
    if (block.x < maxAxe) {
        const blockEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y) ?? block; 
        if (blockEst.mine) {
            return 1;
        }
    }  
    return 0;
} 
  
export function voirSudEstMine(niveau: INiveau, block: IBlock, grille: IBlock[]): number {   
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;    
    if (block.x < maxAxe && block.y < maxAxe) {
        const blockSudEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y + 1) ?? block; 
        if (blockSudEst.mine) {
            return 1;
        }
    }  
    return 0;
} 

export function voirSudMine(niveau: INiveau, block: IBlock, grille: IBlock[]): number {   
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;
    if (block.y < maxAxe) {
        const blockSud: IBlock = grille.find(b => b.x === block.x && b.y === block.y + 1) ?? block; 
        if (blockSud.mine) {
            return 1;
        }
    }  
    return 0;
}
    
export function voirSudOuestMine(niveau: INiveau, block: IBlock, grille: IBlock[]): number {   
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;
    if (block.y < maxAxe && block.x > 0) {
        const blockSudOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y + 1) ?? block; 
        if (blockSudOuest.mine) {
            return 1;
        }
    }  
    return 0;
}
 
export function voirOuestMine(block: IBlock, grille: IBlock[]): number { 
    if (block.x > 0) {
        const blockOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y) ?? block; 
        if (blockOuest.mine) {
            return 1;
        }
    }  
    return 0;
}

export function voirNordOuestMine(block: IBlock, grille: IBlock[]): number {
    if (block.x > 0 && block.y > 0) {
        const blockNordOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y - 1) ?? block; 
        if (blockNordOuest.mine) {
            return 1;
        }
    }  
    return 0;
}
