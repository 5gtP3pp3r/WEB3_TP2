import { IBlock } from './IBlock';
import { INiveau } from './Niveau';
import { voirNordMine } from './VoirMinesBlocksVoisins';
import { voirNordEstMine } from './VoirMinesBlocksVoisins';
import { voirEstMine } from './VoirMinesBlocksVoisins';
import { voirSudEstMine } from './VoirMinesBlocksVoisins';
import { voirSudMine } from './VoirMinesBlocksVoisins';
import { voirSudOuestMine } from './VoirMinesBlocksVoisins';
import { voirOuestMine } from './VoirMinesBlocksVoisins';
import { voirNordOuestMine } from './VoirMinesBlocksVoisins';

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
