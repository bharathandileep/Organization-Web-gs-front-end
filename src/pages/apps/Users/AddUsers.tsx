import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Users } from "./data";

interface AddUsersModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (restaurant: Users) => void;
}

const AddUsersModal: React.FC<AddUsersModalProps> = ({ show, onHide, onSubmit }) => {
  const [formData, setFormData] = useState<Users>({
    id: 0,
    name: "",
    MobNumber: "",
    address: "",
    email: "",
    orders: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: 0,
      name: "",
      MobNumber: "",
      address: "",
      email: "",
      orders: "",
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formNumer">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="text" name="MobNumber" value={formData.MobNumber} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Orders</Form.Label>
            <Form.Control type="text" name="address" value={formData.orders} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUsersModal;
