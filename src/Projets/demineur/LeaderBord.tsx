import { Table } from "react-bootstrap";
export function LeaderBord(): JSX.Element {


    return (
        <div className="d-flex-justify-content-center">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={2}><h4>Leader Bord</h4></th>
                    </tr>                   
                </thead>
                <tbody>
                    <tr>
                        <td><strong className="text-success">Niveau facile</strong></td>                                                                         
                    </tr>    
                    {}                                
                    <tr>
                        <td><strong className="text-warning">Niveau intermédiaire</strong></td>                                            
                    </tr>
                    {}
                    <tr>
                        <td><strong className="text-danger">Niveau expert</strong></td>
                    </tr>
                    {}
                </tbody>
            </Table>
        </div>
    );
}