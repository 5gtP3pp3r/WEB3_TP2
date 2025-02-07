export interface Joueur {
    nom: string;
    point: number;
    pointages: { [category: string]: number | null };
}