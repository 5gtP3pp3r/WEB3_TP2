import { PageTemplate } from '../../PageTemplate';
import { HorlogeSolitaire } from './HorlogeSolitaire';  

export function PageHorloge() {
  return (
    <PageTemplate title="Jeu Horloge" previous="/projets/demineur" nextPage="/projets/yahtzee">
      <div>{<HorlogeSolitaire />}</div>
    </PageTemplate>
  );
}
