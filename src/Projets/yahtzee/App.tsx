import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Row, Table } from "react-bootstrap";
import { MainDes } from "./MainDes";

export function App() {
  const [mainDes, setMainDes] = useState<number[]>(brasserMainAleatoire());

  function genererNombreAleatoire(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function brasserMainAleatoire(): number[] {
    return [
      genererNombreAleatoire(1, 6),
      genererNombreAleatoire(1, 6),
      genererNombreAleatoire(1, 6),
      genererNombreAleatoire(1, 6),
      genererNombreAleatoire(1, 6)
    ]
  }

  function brasserDe(index: number) {
    const nouvelleMain = [...mainDes];
    nouvelleMain[index] = genererNombreAleatoire(1, 6);
    setMainDes(nouvelleMain);
  }

  return (
    <Container>
      <Col>
        <Row>
          <Table striped bordered>
            <thead>
              <h3>Section haute</h3>
              <tr>
                <th>#</th>
                <th>Comment faire des points</th>
                <th>Joueur 1</th>
                <th>Joueur 2</th>
                <th>Joueur 3</th>
                <th>Joueur 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Un</strong></td>
                <td>Additionne les uns</td>
                <td>score 1 P1</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Deux</strong></td>
                <td>Additionne les deux</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Trois</strong></td>
                <td>Additionne les trois</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Quatres</strong></td>
                <td>Additionne les quatres</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Cinq</strong></td>
                <td>Additionne les cinqs</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Six</strong></td>
                <td>Additionne les six</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>63+ Bonus 35 points</strong></td>
                <td><strong>Total</strong></td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Table striped bordered>
            <thead>
              <h3>Section basse</h3>
              <tr>
                <th>#</th>
                <th>Comment faire des points</th>
                <th>Joueur 1</th>
                <th>Joueur 2</th>
                <th>Joueur 3</th>
                <th>Joueur 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Brelan</strong></td>
                <td>Additionne tout les dés</td>
                <td>score 1 P1</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Carré</strong></td>
                <td>Additionne tout les dés</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Main pleine</strong></td>
                <td>25 points</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Petite suite</strong></td>
                <td>Séquence de quatres dés</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Grande suite</strong></td>
                <td>Séquence de cinq dés</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Yahtzee</strong></td>
                <td>Cinq dés pareil</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td><strong>Yahtzee Bonus</strong></td>
                <td>+100 pour chaque Yahtzee</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td></td>
                <td><strong>Total</strong></td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Table striped bordered>
            <thead>
              <tr>
                <th></th>
                <th>Joueur 1</th>
                <th>Joueur 2</th>
                <th>Joueur 3</th>
                <th>Joueur 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Grand total</strong></td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <MainDes main={mainDes} handleClick={brasserDe} />
        </Row>
        <Row>
          <ButtonGroup>
            <Button
              variant='warning'
              className='mb-3'
              onClick={() => setMainDes(brasserMainAleatoire())}>
              <strong>Brasser la main</strong>
            </Button>
          </ButtonGroup>
        </Row>
      </Col>
    </Container>
  )
}
