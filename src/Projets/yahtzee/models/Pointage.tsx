import { Des } from './Des';

export function calculerPoint(dice: Des[], categorie: string): number {
  const values = dice.map(die => die.valeur).sort();
  const counts = compterValeur(values);

  switch (categorie) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
      return calculerNombrePoint(values, parseInt(categorie));
    case 'Brelan':
      return calculerBrelan(counts, values);
    case 'Carré':
      return calculerCarre(counts, values);
    case 'Full':
      return calculerMainPleine(counts);
    case 'Petite Suite':
      return calculerPetiteMain(values);
    case 'Grande Suite':
      return calculerGrandeMain(values);
    case 'Yahtzee':
      return calculerYahtzee(counts);
    case 'Chance':
      return calculerChance(values);
    default:
      return 0;
  }
}

function compterValeur(values: number[]): { [value: number]: number } {
  const counts: { [value: number]: number } = {};
  for (const value of values) {
    counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
}

function calculerNombrePoint(values: number[], target: number): number {
  return values.filter(value => value === target).reduce((sum, value) => sum + value, 0);
}

function calculerBrelan(counts: { [value: number]: number }, values: number[]): number {
  for (const count in counts) {
    if (counts[count] >= 3) {
      return values.reduce((sum, value) => sum + value, 0);
    }
  }
  return 0;
}

function calculerCarre(counts: { [value: number]: number }, values: number[]): number {
  for (const count in counts) {
    if (counts[count] >= 4) {
      return values.reduce((sum, value) => sum + value, 0);
    }
  }
  return 0;
}

function calculerMainPleine(counts: { [value: number]: number }): number {
  let hasThree = false;
  let hasTwo = false;
  for (const count in counts) {
    if (counts[count] === 3) {
      hasThree = true;
    } else if (counts[count] === 2) {
      hasTwo = true;
    }
  }
  return hasThree && hasTwo ? 25 : 0;
}

function calculerPetiteMain(values: number[]): number {
  const uniqueValues = [...new Set(values)];
  if (uniqueValues.length < 4) return 0;
  for (let i = 0; i <= uniqueValues.length - 4; i++) {
    if (uniqueValues[i + 3] - uniqueValues[i] === 3) {
      return 30;
    }
  }
  return 0;
}

function calculerGrandeMain(values: number[]): number {
  const uniqueValues = [...new Set(values)];
  if (uniqueValues.length < 5) return 0;
  if (uniqueValues[4] - uniqueValues[0] === 4) {
    return 40;
  }
  return 0;
}

function calculerYahtzee(counts: { [value: number]: number }): number {
  for (const count in counts) {
    if (counts[count] === 5) {
      return 50;
    }
  }
  return 0;
}

function calculerChance(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}