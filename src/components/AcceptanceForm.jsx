import {Form, Container, Button} from 'react-bootstrap';

//default form 
const AcceptanceForm = () => {
    return (
        <Container className="mt-5">
            <Form>
                {/* Phone Number Input */}
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        className="w-100"
                        type="phone number"
                        placeholder="Phone number"
                        autoFocus
                    />
                </Form.Group>
                {/* Message Input */}
                <Form.Group
                    className="mb-3"
                    controlId="formMessage"
                >
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        className="w-100"
                        as="textarea" 
                        rows={5} 
                        style={{ minHeight: '100px' }}
                        placeholder="Write your message"
                    />
                </Form.Group>

                {/* Accept Button */}
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Accept Request
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
export default AcceptanceForm