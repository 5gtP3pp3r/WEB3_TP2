import { IBlock } from './IBlock';
import { INiveau } from './INiveau';

export function voirNordId(block: IBlock, grille: IBlock[]): number | null {
    if (block.y > 0) {
        const blockNord = grille.find(b => b.x === block.x && b.y === block.y - 1);
        return blockNord ? blockNord.id : null;
    }    
    return null;    
}

export function voirNordEstId(niveau: INiveau, block: IBlock, grille: IBlock[]): number | null {
    const { dimensions } = niveau;
    if (block.y > 0 && block.x < dimensions - 1) {
        const blockNordEst = grille.find(b => b.x === block.x + 1 && b.y === block.y - 1);
        return blockNordEst ? blockNordEst.id : null;
    } 
    return null;
}

export function voirEstId(niveau: INiveau, block: IBlock, grille: IBlock[]): number | null {
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;
    if (block.x < maxAxe) {
        const blockEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y) ?? block; 
        return blockEst ? blockEst.id : null;
    }  
    return null;
} 
  
export function voirSudEstId(niveau: INiveau, block: IBlock, grille: IBlock[]): number | null {   
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;    
    if (block.x < maxAxe && block.y < maxAxe) {
        const blockSudEst: IBlock = grille.find(b => b.x === block.x + 1 && b.y === block.y + 1) ?? block; 
        return blockSudEst ? blockSudEst.id : null;
    }  
    return null;
} 

export function voirSudId(niveau: INiveau, block: IBlock, grille: IBlock[]): number | null {   
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;
    if (block.y < maxAxe) {
        const blockSud: IBlock = grille.find(b => b.x === block.x && b.y === block.y + 1) ?? block; 
        return blockSud ? blockSud.id : null;
    }  
    return null;
}
    
export function voirSudOuestId(niveau: INiveau, block: IBlock, grille: IBlock[]): number | null {   
    const { dimensions } = niveau;
    const maxAxe: number = dimensions - 1;
    if (block.y < maxAxe && block.x > 0) {
        const blockSudOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y + 1) ?? block; 
        return blockSudOuest ? blockSudOuest.id : null;
    }  
    return null;
}
 
export function voirOuestId(block: IBlock, grille: IBlock[]): number | null { 
    if (block.x > 0) {
        const blockOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y) ?? block; 
        return blockOuest ? blockOuest.id : null;
    }  
    return null;
}

export function voirNordOuestId(block: IBlock, grille: IBlock[]): number | null {
    if (block.x > 0 && block.y > 0) {
        const blockNordOuest: IBlock = grille.find(b => b.x === block.x - 1 && b.y === block.y - 1) ?? block; 
        return blockNordOuest ? blockNordOuest.id : null;
    }  
    return null;
}
