
export interface IBlock {
    x: string;              // coordonnées
    y: string;
    id: number;             // id pour qt block à générer aléatoire
    valeur: string;         // Si caché faux: images terre1 à terre8
    cache: boolean;         // vrai image: herbe
    drapeau: boolean;       // Si caché vrai et rightclick: image herbeFlag
    mine: boolean;          // à la fin du jeu, présenter les mines: caché faux, image terre1 à terre8 ou mine vrai terreMine
}