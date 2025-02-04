import { Row, Table } from "react-bootstrap";

export function GrandTotal() {
    return (
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
    )
}