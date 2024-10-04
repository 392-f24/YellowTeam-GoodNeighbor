import React from 'react';
import { useFormData } from '../utilities/useFormData';
import { useDbAdd } from '../utilities/firebase';
import './RequestForm.css'
import { useAuthState } from '../utilities/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

// const validateCourseData = (key, val) => {
//   switch (key) {
//     case 'title':
//       return val.length >= 2 ? '' : 'must be at least two characters';
//     case 'meets':
//       const regex = /^(M|Tu|W|Th|F|Sa|Su){1,3} \d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
//       return val === '' || regex.test(val) ? '' : 'must contain days and start-end, e.g., MWF 12:00-13:20';
//     default:
//       return '';
//   }
// };
const InputField = ({ name, label, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    {name === 'description' ? (
      <textarea
        className={`form-control ${state.errors?.[name] ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={state.values?.[name] || ''}
        onChange={change}
        rows="4" // You can adjust this
        style={{ height: 'auto' }} 
      />
    ) : (
      <input
        className={`form-control ${state.errors?.[name] ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={state.values?.[name] || ''}
        onChange={change}
      />
    )}
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({ onCancel }) => (
  <div>
    <button type="submit" className="button">Submit</button>
    <button type="button" className="button" onClick={onCancel}>Cancel</button>
  </div>
);

const RequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const initialValues = {
    description: location.state?.description || '',
    expected_duration: '',
    timer: ''
  };

  const [formState, change] = useFormData(null, initialValues); // Pass initial values to useFormData
  const [add, result] = useDbAdd('requests');
  const [user] = useAuthState();

  const hardcodedData = {
    accept_status: false,
    accept_userid: "",
    location: "",
    post_time: new Date().toISOString(),
    request_id: 5,
    userid: user ? user.uid : "TESTING",
    username: user ? user.displayName || "Anonymous" : "Anonymous",
  };

  const submit = async (evt) => {
    evt.preventDefault();

    const errors = formState.errors || {};

    if (Object.keys(errors).length === 0) {
      try {
        await add({ ...formState.values, ...hardcodedData });
        console.log('Form submitted:', { ...formState.values, ...hardcodedData });
        navigate('/'); // Navigate back to homepage after successful submission
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Navigate back to homepage when cancel is clicked
  };

  return (
    <div className="requestform-page">
      <h4>New Request</h4>
      <form onSubmit={submit} noValidate className={formState.errors ? 'was-validated' : null}>
        <InputField name="description" label="Description" state={formState} change={change} />
        <InputField name="expected_duration" label="Expected Duration" state={formState} change={change} />
        <InputField name="timer" label="Timer" state={formState} change={change} />
        <ButtonBar onCancel={handleCancel} /> {/* Pass handleCancel to ButtonBar */}
        {result && result.error && <div className="alert alert-danger">{result.message}</div>}
        {result && !result.error && <div className="alert alert-success">{result.message}</div>}
      </form>
    </div>
  );
};

export default RequestForm;