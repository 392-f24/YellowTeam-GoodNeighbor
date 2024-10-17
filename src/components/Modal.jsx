import { Modal } from 'react-bootstrap';
import { AcceptanceForm } from "./Form";
import { calcTime } from './CountdownTimer';

const AcceptRequestModal = ({show, handleClose, currentRequest}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{ background: '#EEEEEE' }} closeButton>
                <Modal.Title>{currentRequest.username} ({calcTime(currentRequest.timer)} remaining)</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p>{currentRequest.description}</p>
                <AcceptanceForm request={currentRequest} handleClose={handleClose} />
            </Modal.Body>
        </Modal>
    )
};

export default AcceptRequestModal