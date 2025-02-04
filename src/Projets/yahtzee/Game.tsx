import { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { TablePointage } from './TablePointage';
import { Des } from './models/Des';

const imagesDes = [
  '/images/yahtzee/de1.png',
  '/images/yahtzee/de2.png',
  '/images/yahtzee/de3.png',
  '/images/yahtzee/de4.png',
  '/images/yahtzee/de5.png',
  '/images/yahtzee/de6.png',
];

export function Game() {

  const [mainDes, setMainDes] = useState<Des[]>([
    { valeur: genererNombreAleatoire(1, 6), estGarder: false },
    { valeur: genererNombreAleatoire(1, 6), estGarder: false },
    { valeur: genererNombreAleatoire(1, 6), estGarder: false },
    { valeur: genererNombreAleatoire(1, 6), estGarder: false },
    { valeur: genererNombreAleatoire(1, 6), estGarder: false },
  ]);

  function genererNombreAleatoire(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function selectionneDe(index: number) {
    const nouvelleMain = [...mainDes];
    nouvelleMain[index].estGarder = !nouvelleMain[index].estGarder;
    setMainDes(nouvelleMain);
  }

  function relancerDesNonSelectionnes() {
    setMainDes(mainDes.map(die =>
      !die.estGarder ? { ...die, valeur: genererNombreAleatoire(1, 6) } : die
    ));
  }

  return (
    <Container>
      <Row>
        <Col>
          <TablePointage />
        </Col>
      </Row>
      <div className='d-flex justify-content-around m-3'>
        <Row>
          <Col>
            {mainDes.map((die, index) => (
              <td key={index}>
                <img
                  src={imagesDes[die.valeur - 1]}
                  alt={`Dé ${die.valeur}`}
                  onClick={() => selectionneDe(index)}
                  style={{ cursor: 'pointer', border: die.estGarder ? '3px solid green' : 'none', borderRadius: '20px' }}
                />
              </td>
            ))}
          </Col>
        </Row>
      </div>
      <Row>
        <ButtonGroup>
          <Button
            variant='warning'
            className='mb-3'
            onClick={relancerDesNonSelectionnes}>
            <strong>Brasser la main</strong>
          </Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
};