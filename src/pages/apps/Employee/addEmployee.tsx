// import React from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Employee } from "../../../server/employeeServices"; // Import your Employee type

// interface AddEmployeeModalProps {
//   show: boolean;
//   onHide: () => void;
//   onSubmit: (employee: Employee) => Promise<void>;
// }

// const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ show, onHide, onSubmit }) => {
//   const [formData, setFormData] = React.useState<Partial<Employee>>({});

//   // Use a more specific event type
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.f_name || !formData.l_name || !formData.email) {
//       // Handle form validation errors
//       alert("Please fill all required fields.");
//       return;
//     }
//     await onSubmit(formData as Employee);
//     // Optionally reset form data after submission
//     setFormData({});
//     onHide(); // Close modal after submission
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Employee</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//         {/* <Form.Group controlId="formFirstName">
//             <Form.Label>Employee Id</Form.Label>
//             <Form.Control
//               type="text"
//               name="employee_id"
//               // value={formData.employee_id || ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group> */}

//           <Form.Group controlId="formFirstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="f_name"
//               value={formData.f_name || ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="formLastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="l_name"
//               value={formData.l_name || ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="formEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email || ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="formPhone">
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="text"
//               name="phone"
//               value={formData.phone || ''}
//               onChange={handleInputChange}
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="formJobTitle">
//             <Form.Label>Job Title</Form.Label>
//             <Form.Control
//               type="text"
//               name="job_title"
//               value={formData.job_title || ''}
//               onChange={handleInputChange}
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <div className="text-center mt-4">
//             <Button
//               variant="primary"
//               type="submit"
//               style={{
//                 backgroundColor: '#007bff', // Primary color
//                 borderColor: '#007bff',
//                 padding: '0.3rem 1rem', // Reduced padding for a smaller button
//                 borderRadius: '0.25rem',
//                 fontWeight: 'bold',
//                 transition: 'background-color 0.2s ease-in-out',
//                 fontSize: '0.875rem' // Smaller font size
//               }}
//               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} // Darker blue on hover
//               onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
//             >
//               Add Employee
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddEmployeeModal;


import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Employee } from "../../../server/employeeServices"; // Import your Employee type

interface AddEmployeeModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (employee: Employee) => Promise<void>;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<Partial<Employee>>({});

  // Use a more specific event type
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.f_name || !formData.l_name || !formData.email) {
      // Handle form validation errors
      alert("Please fill all required fields.");
      return;
    }

    // Assign default values for created_at and created_by
    const additionalData = {
      created_at: new Date(),
      created_by: "66a79aacd02d4640444ccf0c", // Replace with the actual current user ID or username
    };

    const completeData = { ...formData, ...additionalData };

    await onSubmit(completeData as Employee);
    // Optionally reset form data after submission
    setFormData({});
    onHide(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="f_name"
              value={formData.f_name || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="l_name"
              value={formData.l_name || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formJobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="job_title"
              value={formData.job_title || ""}
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <div className="text-center mt-4">
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#007bff", // Primary color
                borderColor: "#007bff",
                padding: "0.3rem 1rem", // Reduced padding for a smaller button
                borderRadius: "0.25rem",
                fontWeight: "bold",
                transition: "background-color 0.2s ease-in-out",
                fontSize: "0.875rem", // Smaller font size
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              } // Darker blue on hover
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Add Employee
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeModal;
