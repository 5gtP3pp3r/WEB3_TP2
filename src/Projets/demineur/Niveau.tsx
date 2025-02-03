
export interface INiveau {
    difficulte: string,
    dimensions: number,
    qtMines: number,
    pointsBase: number
}

export const niveauxTab: INiveau[] = [
    {
        difficulte: "facile",
        dimensions: 8,
        qtMines: 10,
        pointsBase: 500
    },
    {
        difficulte: "intermédiaire",
        dimensions: 16,
        qtMines: 40,
        pointsBase: 1000
    },
    {
        difficulte: "expert",
        dimensions: 24,
        qtMines: 99,
        pointsBase: 1500
    }
]
