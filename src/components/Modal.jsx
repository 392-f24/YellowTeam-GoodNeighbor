import { Modal } from 'react-bootstrap';
import { AcceptanceForm } from "./Form";

const AcceptRequestModal = ({show, handleClose, currentRequest}) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ background: '#EEEEEE' }} closeButton>
            <Modal.Title>{currentRequest.username} ({currentRequest.expected_duration} min remaining)</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <p>{currentRequest.description}</p>
            <AcceptanceForm request={currentRequest} handleClose={handleClose} />
        </Modal.Body>
    </Modal>
);

export default AcceptRequestModal