// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import {FoodProduct,addFoodProduct } from "../../../server/foodProductsServices";
// import {  getKitchens } from "../../../server/restaurantServices";
// import "react-toastify/dist/ReactToastify.css";
// import {  toast } from "react-toastify";
// import LoaderModal from '../../../server/LoaderModal'; // Adjust the path as needed


// interface AddFoodModalProps {
//   show: boolean;
//   onHide: () => void;
//   onAddFood: (foodMenu: FoodProduct) => void;
// }

// const AddFoodModal: React.FC<AddFoodModalProps> = ({ show, onHide, onAddFood }) => {
//   const [formData, setFormData] = useState<Omit<FoodProduct, '_id'>>({
//     food_id: '',
//     food_name: '',
//     food_price: 0,
//     food_description: '',
//     image_url: '',
//     kitchen_id: '',
//     created_by: '',
//     created_at: new Date(),
//     updated_by: '',
//     updated_at: new Date(),
//   });
//   const [showLoader, setShowLoader] = useState(false);

//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const [organizations, setOrganizations] = useState<{ _id: string, name: string }[]>([]);
//   const [kitchens, setKitchens] = useState<{ _id: string, name: string }[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // const companiesData = await fetchCompanyApi(1, 10);
//         const kitchensData = await getKitchens(1,10);

        

//         const adaptedKitchens = kitchensData.data.map((kitchen: any) => ({
//           _id: kitchen._id,
//           name: kitchen.f_name,
//         }));

//         // console.log('Fetched companies:', adaptedCompanies);
//         console.log('Fetched kitchens:', adaptedKitchens);

//         // setOrganizations(adaptedCompanies);
//         setKitchens(adaptedKitchens);
//       } catch (err) {
//         setError((err as Error).message);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'number' ? parseFloat(value) : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setShowLoader(true); // Show loader modal

//     try {
//       const newFood = await addFoodProduct(formData);
//       onAddFood(newFood);
//       onHide();
//       // toast.success("Food Product added successfully")
//     } catch (error) {
//       // toast.error("Failed to add food products")
//       setError((error as Error).message);
//     } 
//       finally {
//         // Hide the loader modal after 10 seconds
//         setTimeout(() => {
//           setShowLoader(false);
//         }, 1000);
//     }
//   };


//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData((prevData) => ({ ...prevData, image_url: reader.result as string }));
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   <LoaderModal show={showLoader} />

//   return (
    
//     <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
//       <Modal.Header className="bg-light" closeButton>
//         <Modal.Title className="m-0">Add New Food</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="p-4">
//         {loading && <div>Loading...</div>}
//         {error && <div>Error: {error}</div>}
//         {!loading && !error && (
//           <form onSubmit={handleSubmit}>
//             <Form.Group controlId="formFoodId">
//               <Form.Label>Food ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="food_id"
//                 value={formData.food_id}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formFoodName">
//               <Form.Label>Food Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="food_name"
//                 value={formData.food_name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             {/* <Form.Group controlId="formOrganizationId">
//               <Form.Label>Organization</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="organization_id"
//                 value={formData.organization_id}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Organization</option>
//                 {organizations.map((org) => (
//                   <option key={org._id} value={org._id}>
//                     {org.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group> */}
//             <Form.Group controlId="formImage">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" name="image_url" accept="image/*" onChange={handleFileChange} />
//           </Form.Group>
          
//             <Form.Group controlId="formFoodPrice">
//               <Form.Label>Food Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="food_price"
//                 value={formData.food_price}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formFoodDescription">
//               <Form.Label>Food Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="food_description"
//                 value={formData.food_description}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formKitchenId">
//               <Form.Label>Kitchen</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="kitchen_id"
//                 value={formData.kitchen_id}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Kitchen</option>
//                 {kitchens.map((kitchen) => (
//                   <option key={kitchen._id} value={kitchen._id}>
//                     {kitchen.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formCreatedBy">
//               <Form.Label>Created By</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="created_by"
//                 value={formData.created_by}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formCreatedAt">
//               <Form.Label>Created At</Form.Label>
//               <Form.Control
//                 type="datetime-local"
//                 name="created_at"
//                 value={new Date(formData.created_at).toISOString().slice(0, 16)}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formUpdatedBy">
//               <Form.Label>Updated By</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="updated_by"
//                 value={formData.updated_by}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formUpdatedAt">
//               <Form.Label>Updated At</Form.Label>
//               <Form.Control
//                 type="datetime-local"
//                 name="updated_at"
//                 value={new Date(formData.updated_at).toISOString().slice(0, 16)}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <div className="text-end">
//               <Button variant="success" type="submit" className="waves-effect waves-light me-1">
//                 Save
//               </Button>
//               <Button variant="danger" className="waves-effect waves-light" onClick={onHide}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         )}
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddFoodModal;



import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FoodProduct, addFoodProduct,getFoodProducts } from "../../../server/foodProductsServices";
import { getKitchens } from "../../../server/restaurantServices";
import { Kitchen } from "../../../server/restaurantServices";
import { toast } from "react-toastify";
import LoaderModal from '../../../server/LoaderModal'; // Adjust the path as needed

interface AddFoodModalProps {
  show: boolean;
  onHide: () => void;
  onAddFood: (food: FoodProduct) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  show,
  onHide,
  onAddFood,
}) => {
  // const [formData, setFormData] = useState<Omit<FoodProduct, '_id'>>({
  //   food_id: '',
  //   food_name: '',
  //   food_price: 0,
  //   food_description: '',
  //   image_url: '',
  //   kitchen_id: '',
  //   created_by: '', // Optional but will be set before submission
  //   created_at: new Date().toISOString(), // Default to current time
  // });
  const [formData, setFormData] = useState<Partial<FoodProduct>>({});

  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const kitchenList = await getKitchens(1, 1000); // Adjust limit as needed
        setKitchens(kitchenList.data); // Adjust based on your response structure
      } catch (error) {
        console.error("Error fetching kitchens:", error);
      }
    };

    fetchKitchens();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({ ...prevData, image_url: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoader(true);

    const foodProductData: Partial<FoodProduct> = {
      ...formData,
      created_at: new Date(),
      created_by: "66a79aacd02d4640444ccf0c", // Replace with actual user ID or logic to get current user
    };
    try {
      const newFood = await addFoodProduct(foodProductData as FoodProduct);
      
      onAddFood(newFood as FoodProduct);
      setTimeout(() => {
        toast.success("Food Product added successfully");

        setShowLoader(false);
      }, 1000);
      onHide();
    } catch (error) {
      setTimeout(() => {
        toast.error("Failed to add food product");

        setShowLoader(false);
      }, 1000);
      setError((error as Error).message);
    }
  };

  return (
    <>
      <LoaderModal show={showLoader} />
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div>Error: {error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="food_name">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                name="food_name"
                value={formData.food_name || ""}
                onChange={handleInputChange}
                required
                style={{ marginBottom: "1rem" }}
              />
            </Form.Group>

            <Form.Group controlId="image_url">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image_url"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: "1rem" }}
              />
            </Form.Group>

            <Form.Group controlId="food_price">
              <Form.Label>Food Price</Form.Label>
              <Form.Control
                type="number"
                name="food_price"
                value={formData.food_price || ""}
                onChange={handleInputChange}
                required
                style={{ marginBottom: "1rem" }}
              />
            </Form.Group>

            <Form.Group controlId="food_description">
              <Form.Label>Food Description</Form.Label>
              <Form.Control
                type="text"
                name="food_description"
                value={formData.food_description || ""}
                onChange={handleInputChange}
                required
                style={{ marginBottom: "1rem" }}
              />
            </Form.Group>

            <Form.Group controlId="kitchen_id">
              <Form.Label>Kitchen</Form.Label>
              <Form.Control
                as="select"
                name="kitchen_id"
                value={formData.kitchen_id || ""}
                onChange={handleInputChange}
                required
                style={{ marginBottom: "1rem" }}
              >
                <option value="">Select Kitchen</option>
                {kitchens.map((kitchen) => (
                  <option key={kitchen._id} value={kitchen._id}>
                    {kitchen.f_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />

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
                Add Food
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddFoodModal;
