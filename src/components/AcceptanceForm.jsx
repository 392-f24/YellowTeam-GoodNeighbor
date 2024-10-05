import Form from 'react-bootstrap/Form';

const AcceptanceForm = () => (
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
            type="email"
            placeholder="name@example.com"
            autoFocus
        />
        </Form.Group>
        <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
        >
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
        </Form.Group>
    </Form>
);

export default AcceptanceForm