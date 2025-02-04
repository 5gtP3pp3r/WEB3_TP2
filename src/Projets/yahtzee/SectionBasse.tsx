import { Row, Table } from "react-bootstrap";

export function SectionBasse() {
    return (
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
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td><strong>Carré</strong></td>
                        <td>Additionne tout les dés</td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td><strong>Main pleine</strong></td>
                        <td>25 points</td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td><strong>Petite suite</strong></td>
                        <td>Séquence de quatres dés</td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td><strong>Grande suite</strong></td>
                        <td>Séquence de cinq dés</td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td><strong>Yahtzee</strong></td>
                        <td>Cinq dés pareil</td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td><strong>Chance</strong></td>
                        <td>Total des cinq dés</td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td><strong>Yahtzee Bonus</strong></td>
                        <td>+100 pour chaque Yahtzee</td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                        <td><input type="number" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><strong>Total</strong></td>
                        <td>joueur.total</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </Row>
    )
};