import { IBlock } from './IBlock';
import { INiveau } from './INiveau';
import {  
    voirNordMine, 
    voirNordEstMine, 
    voirEstMine, 
    voirSudEstMine, 
    voirSudMine, 
    voirSudOuestMine, 
    voirOuestMine, 
    voirNordOuestMine
} from './VoirMinesBlocksVoisins';

export function ChercherNbMinesVoisins(niveau: INiveau, block: IBlock, grille: IBlock[]): number {
    return voirNordMine(block, grille) +
           voirNordEstMine(niveau, block, grille) +
           voirEstMine(niveau, block, grille) +
           voirSudEstMine(niveau, block, grille) +
           voirSudMine(niveau, block, grille) +
           voirSudOuestMine(niveau, block, grille) +
           voirOuestMine(block, grille) +
           voirNordOuestMine(block, grille);      
}
