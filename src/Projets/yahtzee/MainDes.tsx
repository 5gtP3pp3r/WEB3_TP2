import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

interface MainDesProps {
    handleClick: (index: number) => void;
    main: number[]
}

export function MainDes(props: MainDesProps) {
    const imagesDes = [
        '/images/yahtzee/de1.png',
        '/images/yahtzee/de2.png',
        '/images/yahtzee/de3.png',
        '/images/yahtzee/de4.png',
        '/images/yahtzee/de5.png',
        '/images/yahtzee/de6.png',
    ];

    return (
        <div>
            <Table bordered>
                <tbody>
                    {props.main.map((valeur, index) => (
                        <td>
                            <img
                                key={index}
                                src={imagesDes[valeur - 1]}
                                alt={`Dé ${valeur}`}
                                onClick={() => props.handleClick(index)}
                                style={{ cursor: 'pointer', margin: '5px' }}
                            />
                        </td>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}