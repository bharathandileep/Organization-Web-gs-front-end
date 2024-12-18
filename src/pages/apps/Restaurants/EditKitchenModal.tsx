// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Kitchen } from "../../../server/restaurantServices";

// interface EditKitchenModalProps {
//   show: boolean;
//   handleClose: () => void;
//   kitchen: Kitchen;
//   onSubmit: (id: string, data: Partial<Kitchen>) => void;
// }

// const EditKitchenModal: React.FC<EditKitchenModalProps> = ({ show, handleClose, kitchen, onSubmit }) => {
//   const [formData, setFormData] = useState<Partial<Kitchen>>({
//     f_name: "",
//     l_name: "",
//     location_id: 0,
//     created_by: "",
//     image_url: ""
//   });

//   useEffect(() => {
//     if (kitchen) {
//       setFormData({
//         f_name: kitchen.f_name,
//         l_name: kitchen.l_name,
//         location_id: kitchen.location_id,
//         created_by: kitchen.created_by,
//         image_url: kitchen.image_url
//       });
//     }
//   }, [kitchen]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData({ ...formData, image_url: reader.result as string });
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(kitchen._id, formData);
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Kitchen</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formLogo">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" name="image_url" accept="image/*" onChange={handleFileChange} />
//           </Form.Group>
//           <Form.Group controlId="formFName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control type="text" name="f_name" value={formData.f_name} onChange={handleChange} required />
//           </Form.Group>
//           <Form.Group controlId="formLName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control type="text" name="l_name" value={formData.l_name} onChange={handleChange} required />
//           </Form.Group>
//           <Form.Group controlId="formLocationId">
//             <Form.Label>Location ID</Form.Label>
//             <Form.Control type="text" name="location_id" value={formData.location_id} onChange={handleChange} required />
//           </Form.Group>
//           <Form.Group controlId="formCreatedBy">
//             <Form.Label>Created By</Form.Label>
//             <Form.Control type="text" name="created_by" value={formData.created_by} onChange={handleChange} required />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Save Changes
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditKitchenModal;


import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Kitchen } from "../../../server/restaurantServices";

interface EditKitchenModalProps {
  show: boolean;
  handleClose: () => void;
  kitchen: Kitchen | null; // Allow null if no kitchen is selected
  onSubmit: (id: string, data: Partial<Kitchen>) => void
}

const EditKitchenModal: React.FC<EditKitchenModalProps> = ({ show, handleClose, kitchen, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Kitchen>>({
    f_name: "",
    l_name: "",
    location_id: 0,
    created_by: "",
    image_url: ""
  });

  useEffect(() => {
    if (kitchen) {
      setFormData({
        f_name: kitchen.f_name,
        l_name: kitchen.l_name,
        location_id: kitchen.location_id,
        created_by: kitchen.created_by,
        image_url: kitchen.image_url,
        description: kitchen.description, 
        username:kitchen.username,
        password:kitchen.password,
        phone_no:kitchen.phone_no
      });
    }
  }, [kitchen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({ ...prevData, image_url: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'location_id' ? Number(value) : value, // Convert location_id to number
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (kitchen) {
      // Assign updated_at and updated_by
      const updatedEmployee = {
        ...formData,
        updated_at: new Date(), // Set current date and time
        updated_by: "66a79aacd02d4640444ccf0c", // Replace with function to get current user's ObjectId
      };
      await onSubmit(kitchen._id,updatedEmployee);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Kitchen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image_url" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group controlId="formFName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              name="f_name" 
              value={formData.f_name || ''} // Handle undefined value
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formFName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              name="l_name" 
              value={formData.l_name || ''} // Handle undefined value
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formdescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              name="description" 
              value={formData.description || ''} // Handle undefined value
              onChange={handleChange} 
              required 
            />
            </Form.Group>
                      <Form.Group controlId="formFName">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              value={formData.username || ''} // Handle undefined value
              onChange={handleChange} 
              required 
            />
            </Form.Group>
                      <Form.Group controlId="formFName">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              value={formData.password || ''} // Handle undefined value
              onChange={handleChange} 
              required 
            />

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
          <Form.Group controlId="formLocationId">
            <Form.Label>Location ID</Form.Label>
            <Form.Control 
              type="number" 
              name="location_id" 
              value={formData.location_id || ''} // Handle undefined value
              onChange={handleChange} 
              required 
            />
          </Form.Group>
        
          <br />
          <Button variant="primary" type="submit" style={{marginLeft:"170px"}}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditKitchenModal;
