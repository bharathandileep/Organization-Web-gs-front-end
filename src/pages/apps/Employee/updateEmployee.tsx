// import React from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Employee, updateEmployee } from "../../../server/employeeServices"; // Import updateEmployee function

// interface UpdateEmployeeModalProps {
//   show: boolean;
//   onHide: () => void;
//   employee: Employee;
//   onSubmit: () => Promise<void>;
// }

// const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
//   show,
//   onHide,
//   employee,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = React.useState<Employee>(employee);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Assuming `updateEmployee` needs employee ID and updated data
//       await updateEmployee(employee._id, formData); // Update with correct arguments
//       await onSubmit(); // Call onSubmit prop after successful update
//       onHide(); // Close modal
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Employee</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formEmployeeId">
//             <Form.Label>Employee Id</Form.Label>
//             <Form.Control
//               type="text"
//               name="employee_id"
//               value={formData.employee_id || ''}
//               onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formFirstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="f_name"
//               value={formData.f_name || ''}
//               onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formLastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="l_name"
//               value={formData.l_name || ''}
//               onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email || ''}
//               onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formPhone">
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="text"
//               name="phone"
//               value={formData.phone || ''}
//               onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formHireDate">
//             <Form.Label>Hire Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="hire_date"
//               value={formData.hire_date ? new Date(formData.hire_date).toISOString().slice(0, 10) : ''}
//               onChange={handleDateChange as React.ChangeEventHandler<HTMLInputElement>}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formJobTitle">
//             <Form.Label>Job Title</Form.Label>
//             <Form.Control
//               type="text"
//               name="job_title"
//               value={formData.job_title || ''}
//               onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
//               required
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Save Changes
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateEmployeeModal;

// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Employee } from "../../../server/employeeServices";

// interface UpdateEmployeeModalProps {
//   show: boolean;
//   onHide: () => void;
//   employee: Employee | null;
//   onSubmit: (updatedEmployee: Employee) => Promise<void>;
// }

// const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
//   show,
//   onHide,
//   employee,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<Employee | null>(null);

//   useEffect(() => {
//     setFormData(employee);
//   }, [employee]);

//   if (!formData) {
//     return null; // Prevent rendering if formData is not set
//   }

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevState) =>
//       prevState ? { ...prevState, [name]: value } : null
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData) {
//       await onSubmit(formData);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Update Employee</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formFirstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="f_name"
//               value={formData.f_name}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formLastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="l_name"
//               value={formData.l_name}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formPhone">
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formJobTitle">
//             <Form.Label>Job Title</Form.Label>
//             <Form.Control
//               type="text"
//               name="job_title"
//               value={formData.job_title}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Update Employee
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateEmployeeModal;


import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Employee } from "../../../server/employeeServices";

interface UpdateEmployeeModalProps {
  show: boolean;
  onHide: () => void;
  employee: Employee | null;
  onSubmit: (employee: Employee) => Promise<void>;

}

const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
  show,
  onHide,
  employee,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Employee | null>(null);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  if (!formData) {
    return null; // Prevent rendering if formData is not set
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) =>
      prevState ? { ...prevState, [name]: value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      // Assign updated_at and updated_by
      const updatedEmployee = {
        ...formData,
        updated_at: new Date(), // Set current date and time
        updated_by: "66a79aacd02d4640444ccf0c", // Replace with function to get current user's ObjectId
      };
      await onSubmit(updatedEmployee);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="f_name"
              value={formData.f_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="l_name"
              value={formData.l_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formJobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" style={{marginLeft:"150px"}}>
            Update Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Mock function to get current user's ObjectId
function getCurrentUserId() {
  // Replace with actual logic to fetch the current user's ObjectId
  return "60d9f5c9f9a8e72f88f7a1f2"; // Example ObjectId string
}

export default UpdateEmployeeModal;