import { Col, Row, Table } from "react-bootstrap";

export function SectionHaute() {
    return (
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
        </Col>
    )
};