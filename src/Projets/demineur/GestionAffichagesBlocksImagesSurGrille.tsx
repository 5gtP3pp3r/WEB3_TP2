import { IBlock } from "./IBlock";

export function GestionAffichagesBlocksImagesSurGrille(block: IBlock) {
    if (block.cache) {
        if (block.drapeau) {
          return <img src="../../images/demineur/herbeDrapeau.png" alt="herbeDrapeau" />;
        } else {
          return <img src="../../images/demineur/herbe.png" alt="herbe" />;
        }
    } else {
        return <img src={`../../images/demineur/terre${block.valeur}.png`} alt="terre" />;
    }
};
