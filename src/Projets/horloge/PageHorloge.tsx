import { PageTemplate } from '../../PageTemplate';
import { HorlogeSolitaire } from './HorlogeSolitaire';
import './css/pageHorloge.css'

export function PageHorloge() {
  return (
    <div className='ArrierePlan'>
      <PageTemplate title="Jeu Horloge" previous="/projets/demineur" nextPage="/projets/yahtzee">
        {<HorlogeSolitaire />}
      </PageTemplate>
    </div>
  );
}
