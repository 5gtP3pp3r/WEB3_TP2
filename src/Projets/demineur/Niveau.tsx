
export interface INiveau {
    difficulte: string,
    dimensions: number,
    qtMines: number
}

export const niveauxTab: INiveau[] = [
    {
        difficulte: "facile",
        dimensions: 8,
        qtMines: 10
    },
    {
        difficulte: "intermediaire",
        dimensions: 16,
        qtMines: 40
    },
    {
        difficulte: "expert",
        dimensions: 24,
        qtMines: 99
    }
]
