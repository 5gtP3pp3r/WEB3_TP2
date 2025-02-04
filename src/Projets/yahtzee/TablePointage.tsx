import { Col, Container} from "react-bootstrap";
import { SectionHaute } from "./SectionHaute";
import { SectionBasse } from "./SectionBasse";
import { GrandTotal } from "./GrandTotal";

export function TablePointage() {

    return (
        <Container>
            <Col>
                <SectionHaute />
                <SectionBasse />
                <GrandTotal/>
            </Col>
        </Container>
    )
}
