import {Form, Container, Button} from 'react-bootstrap';
import { useDbData } from "../utilities/firebase";
import { ref, onValue, set } from 'firebase/database';
import { ref as sRef } from 'firebase/storage';

const AcceptanceForm = (request) => {
    console.log(request.request);
    const [data, error] = useDbData(`/requests/${request.request.request_id}`);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1>Loading data...</h1>;
    if (!data) return <h1>No data found</h1>;

    const AcceptRequest = (e) => {
        e.preventDefault();
        try{
            set(data, {...(request.request), description: "foo"})
            .then(() => {
                console.log("Description updated successfully!");
            })
            .catch((updateError) => {
                console.error("Error updating description:", updateError);
            });
        } 
        catch (error) {
            console.error("Error occurred:", error.message);
        //     setResult({ message: error.message, error: true });
        }
        return;
    }

    // const reqRef = sRef(data, `${userid}`);
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
                    <Button variant="primary" type="submit" onClick={AcceptRequest}>
                        Accept Request
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
export default AcceptanceForm