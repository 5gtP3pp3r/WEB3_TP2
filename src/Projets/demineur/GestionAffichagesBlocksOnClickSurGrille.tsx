import { IBlock } from "./IBlock";

export function GestionAffichagesBlocksOnClickSurGrille(block: IBlock) {
    if (block.cache) {
        if (block.drapeau) {
          // Si le bloc est caché et a un drapeau, on affiche l'image du drapeau
          return <img src="../../images/demineur/herbeDrapeau.png" alt="herbeDrapeau" />;
        } else {
          // Si le bloc est caché et n'a pas de drapeau, on affiche l'herbe sans drapeau
          return <img src="../../images/demineur/herbe.png" alt="herbe" />;
        }
    } else {
        // Si le bloc n'est pas caché, on affiche l'image correspondant à la valeur du bloc
        return <img src={`../../images/demineur/terre${block.valeur}.png`} alt="terre" />;
    }
};
