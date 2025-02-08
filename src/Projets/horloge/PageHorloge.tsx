import { PageTemplate } from '../../PageTemplate';
import { HorlogeSolitaire } from './HorlogeSolitaire';  

export function PageHorloge() {
  return (
    <PageTemplate title="Jeu Horloge" previous="/projets/demineur" nextPage="/projets/yahtzee">
      {<HorlogeSolitaire />} {/* Jenn je t'ai changé ça, pas besoin de div ici, géré à l'intérieur de ta page HorlogeSolitaire*/}
    </PageTemplate>
  );
}
