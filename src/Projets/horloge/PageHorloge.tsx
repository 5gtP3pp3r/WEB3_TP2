import { PageTemplate } from '../../PageTemplate';
import { App } from './App';  

export function PageHorloge() {
  return (
    <PageTemplate title="Jeu Horloge" previous="/projets/demineur" nextPage="/projets/yahtzee">
      {<App />}
    </PageTemplate>
  );
}
