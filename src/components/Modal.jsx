import { Modal } from 'react-bootstrap';
import { AcceptanceForm } from "./Form";

const AcceptRequestModal = ({show, handleClose, currentRequest}) => {
    const calcTime = (timer) => {
        const day = Math.floor(timer / (60*24));
        const hour = Math.floor(timer / 24);
        if (day > 0) {
            return (
                `${day} day(s)`
            );
        }
        else {
            if (hour > 0) {
                return(
                    `${hour} hour(s)`
                );
            }
            else{
                return(`${timer} minute(s)`)
            }
        }
    }
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