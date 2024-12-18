// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Kitchen } from "../../../server/restaurantServices";
// // import { isValidObjectId } from "./RestaurantsDetails"; // Assuming this function is available

// interface AddKitchenModalProps {
//   show: boolean;
//   handleClose: () => void;
//   onSubmit: (data: Omit<Kitchen, "_id">) => void;
// }

// const AddKitchenModal: React.FC<AddKitchenModalProps> = ({
//   show,
//   handleClose,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<Omit<Kitchen, "_id">>({
//     kitchen_id: "",
//     f_name: "",
//     l_name: "",
//     username: "",
//     password: "",
//     phone_no: 0,
//     order_id: "", // Optional, if applicable
//     image_url: "",
//     location_id: 0,
//     description : "",
//      created_by: "",
//     created_at: new Date(),
//     updated_by: "",
//     updated_at: new Date(),
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "phone_no" || name === "location_id" ? Number(value) : value,
//     });
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.f_name.trim()) newErrors.f_name = "First name is required.";
//     if (!formData.l_name.trim()) newErrors.l_name = "Last name is required.";
//     if (!formData.username.trim()) newErrors.username = "Username is required.";
//     if (!formData.password.trim()) newErrors.password = "Password is required.";
//     // if (!formData.created_by || !isValidObjectId(formData.created_by)) {
//     //   newErrors.created_by = "Valid creator ID is required.";
//     // }
//     // if (
//     //   formData.updated_by &&
//     //   !isValidObjectId(formData.updated_by)
//     // ) {
//     //   newErrors.updated_by = "Updated by ID must be a valid ObjectId.";
//     // }
//     // if (
//     //   formData.order_id &&
//     //   !isValidObjectId(formData.order_id)
//     // ) {
//     //   newErrors.order_id = "Order ID must be a valid ObjectId.";
//     // }

//     // setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       console.log("Form data before submit:", formData);
//       onSubmit(formData);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Kitchen</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="formKitchenID">
//             <Form.Label>Kitchen ID</Form.Label>
//             <Form.Control
//               type="text"
//               name="kitchen_id"
//               value={formData.kitchen_id}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formFirstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="f_name"
//               value={formData.f_name}
//               onChange={handleChange}
//               isInvalid={!!errors.f_name}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.f_name}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formLastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="l_name"
//               value={formData.l_name}
//               onChange={handleChange}
//               isInvalid={!!errors.l_name}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.l_name}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formdescription">
//             <Form.Label>Description</Form.Label>
//             <Form.Control 
//               type="text" 
//               name="description" 
//               value={formData.description || ''} // Handle undefined value
//               onChange={handleChange} 
//               required 
//             />
//             </Form.Group>

//           <Form.Group controlId="formUsername">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               isInvalid={!!errors.username}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.username}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               isInvalid={!!errors.password}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.password}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formPhoneNo">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="phone_no"
//               value={formData.phone_no}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formImageUrl">
//             <Form.Label>Image URL</Form.Label>
//             <Form.Control
//               type="text"
//               name="image_url"
//               value={formData.image_url}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formLocationId">
//             <Form.Label>Location ID</Form.Label>
//             <Form.Control
//               type="number"
//               name="location_id"
//               value={formData.location_id}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formCreatedBy">
//             <Form.Label>Created By</Form.Label>
//             <Form.Control
//               type="text"
//               name="created_by"
//               value={formData.created_by}
//               onChange={handleChange}
//               isInvalid={!!errors.created_by}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.created_by}
//             </Form.Control.Feedback>
//           </Form.Group>
//           {/* <Form.Group controlId="formOrderId">
//             <Form.Label>Order ID</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_id"
//               value={formData.order_id}
//               onChange={handleChange}
//               isInvalid={!!errors.order_id}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.order_id}
//             </Form.Control.Feedback>
//           </Form.Group> */}
//           <Form.Group controlId="formUpdatedBy">
//             <Form.Label>Updated By</Form.Label>
//             <Form.Control
//               type="text"
//               name="updated_by"
//               value={formData.updated_by}
//               onChange={handleChange}
//               isInvalid={!!errors.updated_by}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.updated_by}
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddKitchenModal;

// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Kitchen } from "../../../server/restaurantServices";

// interface AddKitchenModalProps {
//   show: boolean;
//   handleClose: () => void;
//   onSubmit: (data: Omit<Kitchen, "_id">) => void;
// }

// const AddKitchenModal: React.FC<AddKitchenModalProps> = ({
//   show,
//   handleClose,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<Omit<Kitchen, "_id">>({
//     kitchen_id: "",
//     f_name: "",
//     l_name: "",
//     username: "",
//     password: "",
//     phone_no: 0,
//     order_id: "", // Optional, if applicable
//     image_url: "",
//     location_id: 0,
//     description: "",
//     created_by: "",
//     created_at: new Date(),
//     updated_by: "",
//     updated_at: new Date(),
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "phone_no" || name === "location_id" ? Number(value) : value,
//     });
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.f_name.trim()) newErrors.f_name = "First name is required.";
//     if (!formData.l_name.trim()) newErrors.l_name = "Last name is required.";
//     if (!formData.username.trim()) newErrors.username = "Username is required.";
//     if (!formData.password.trim()) newErrors.password = "Password is required.";

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = () => {
//   //   if (validateForm()) {
//   //     console.log("Form data before submit:", formData);
//   //     onSubmit(formData);
//   //   }
//   // };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
      
//       console.log("Submitting form data:", formData);
//       try {
//         await onSubmit(formData);
//         console.log("Form submitted successfully");
//       } catch (error) {
//         console.error("Form submission error:", error);
//       }
//     }
    
//   };
  
//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Kitchen</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
        
//         <Form onSubmit={handleSubmit}>
//           {/* <Form.Group controlId="formKitchenID">
//             <Form.Label>Kitchen ID</Form.Label>
//             <Form.Control
//               type="text"
//               name="kitchen_id"
//               value={formData.kitchen_id}
//               onChange={handleChange}
//             />
//           </Form.Group> */}
//           <Form.Group controlId="formFirstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="f_name"
//               value={formData.f_name}
//               onChange={handleChange}
//               isInvalid={!!errors.f_name}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.f_name}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formLastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="l_name"
//               value={formData.l_name}
//               onChange={handleChange}
//               isInvalid={!!errors.l_name}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.l_name}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formDescription">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formUsername">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               isInvalid={!!errors.username}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.username}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               isInvalid={!!errors.password}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.password}
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="formPhoneNo">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               name="phone_no"
//               value={formData.phone_no}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formImageUrl">
//             <Form.Label>Image URL</Form.Label>
//             <Form.Control
//               type="text"
//               name="image_url"
//               value={formData.image_url}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formLocationId">
//             <Form.Label>Location ID</Form.Label>
//             <Form.Control
//               type="number"
//               name="location_id"
//               value={formData.location_id}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddKitchenModal;


import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Kitchen } from "../../../server/restaurantServices";

interface AddKitchenModalProps {
  show: boolean;
  handleClose: () => void;
  onSubmit: (data: Omit<Kitchen, "_id">) => Promise<void>;
}

const AddKitchenModal: React.FC<AddKitchenModalProps> = ({
  show,
  handleClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Kitchen>>({
    f_name: "",
    l_name: "",
    username: "",
    password: "",
    phone_no: 0,
    image_url: "",
    location_id: 0,
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone_no" || name === "location_id" ? Number(value) : value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.f_name?.trim()) newErrors.f_name = "First name is required.";
    if (!formData.l_name?.trim()) newErrors.l_name = "Last name is required.";
    if (!formData.username?.trim()) newErrors.username = "Username is required.";
    if (!formData.password?.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Assign default values for created_at and created_by
      const additionalData = {
        created_at: new Date(),
        created_by: "66a79aacd02d4640444ccf0c", // Replace with actual current user ID or username
      };

      const completeData = { ...formData, ...additionalData };

      console.log("Submitting form data:", completeData);
      try {
        await onSubmit(completeData as Omit<Kitchen, "_id">);
        console.log("Form submitted successfully");
        setFormData({}); // Optionally reset form data after submission
        handleClose(); // Close modal after submission
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Kitchen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="f_name"
              value={formData.f_name || ""}
              onChange={handleChange}
              isInvalid={!!errors.f_name}
              required
              style={{ marginBottom: "1rem" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.f_name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="l_name"
              value={formData.l_name || ""}
              onChange={handleChange}
              isInvalid={!!errors.l_name}
              required
              style={{ marginBottom: "1rem" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.l_name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              isInvalid={!!errors.username}
              required
              style={{ marginBottom: "1rem" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
              style={{ marginBottom: "1rem" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPhoneNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_no"
              value={formData.phone_no || ""}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>
          <Form.Group controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image_url"
              value={formData.image_url || ""}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>
          <Form.Group controlId="formLocationId">
            <Form.Label>Location ID</Form.Label>
            <Form.Control
              type="number"
              name="location_id"
              value={formData.location_id || 0}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>
          <div className="text-center mt-4">
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                padding: "0.3rem 1rem",
                borderRadius: "0.25rem",
                fontWeight: "bold",
                transition: "background-color 0.2s ease-in-out",
                fontSize: "0.875rem",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Add Kitchen
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddKitchenModal;
