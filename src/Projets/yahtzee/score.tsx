export const calculateScore = (diceValues: number[], category: string): number => {
    const counts = diceValues.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    switch (category) {
        case "As":
            return diceValues.filter(die => die === 1).reduce((sum, die) => sum + die, 0);
        case "Deux":
            return diceValues.filter(die => die === 2).reduce((sum, die) => sum + die, 0);
        case "Trois":
            return diceValues.filter(die => die === 3).reduce((sum, die) => sum + die, 0);
        case "Quatre":
            return diceValues.filter(die => die === 4).reduce((sum, die) => sum + die, 0);
        case "Cinq":
            return diceValues.filter(die => die === 5).reduce((sum, die) => sum + die, 0);
        case "Six":
            return diceValues.filter(die => die === 6).reduce((sum, die) => sum + die, 0);
        case "Brelan":
            return Object.values(counts).some(count => count >= 3) ? diceValues.reduce((a, b) => a + b, 0) : 0;
        case "Carré":
            return Object.values(counts).some(count => count >= 4) ? diceValues.reduce((a, b) => a + b, 0) : 0;
        case "Full House":
            return Object.values(counts).includes(3) && Object.values(counts).includes(2) ? 25 : 0;
        case "Petite suite":
            return [1, 2, 3, 4].every(n => counts[n]) || [2, 3, 4, 5].every(n => counts[n]) || [3, 4, 5, 6].every(n => counts[n]) ? 30 : 0;
        case "Grande suite":
            return [1, 2, 3, 4, 5].every(n => counts[n]) || [2, 3, 4, 5, 6].every(n => counts[n]) ? 40 : 0;
        case "Yahtzee":
            return Object.values(counts).some(count => count === 5) ? 50 : 0;
        case "Chance":
            return diceValues.reduce((a, b) => a + b, 0);
        default:
            return 0;
    }
};
