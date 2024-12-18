// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// import {FoodProduct,updateFoodProduct} from "../../../server/foodProductsServices";
// import {  getKitchens } from "../../../server/restaurantServices";

// import { ToastContainer, Toast } from 'react-bootstrap';

// interface UpdateFoodModalProps {
//   show: boolean;
//   onHide: () => void;
//   foodItem: FoodProduct;
//   onUpdateFood: (updatedFood: FoodProduct) => void;
// }

// const UpdateFoodModal: React.FC<UpdateFoodModalProps> = ({ show, onHide, foodItem, onUpdateFood }) => {
//   const [formData, setFormData] = useState<Partial<FoodProduct>>(foodItem);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [organizations, setOrganizations] = useState<{ _id: string, name: string }[]>([]);
//   const [kitchens, setKitchens] = useState<{ _id: string, name: string }[]>([]);
//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [toastMessage, setToastMessage] = useState<string>('');
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // const companiesData = await fetchCompanyApi(1, 10);
//         const kitchensData = await getKitchens(1,10);

//         // const adaptedCompanies = companiesData.data.map((company: any) => ({
//         //   _id: company._id,
//         //   name: company.company_name,
//         // }));

//         const adaptedKitchens = kitchensData.data.map((kitchen: any) => ({
//           _id: kitchen._id,
//           name: kitchen.f_name,
//         }));

//         //console.log('Fetched companies:', adaptedCompanies);
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     if (foodItem._id) {
//       try {
//         const updatedFood = await updateFoodProduct(foodItem._id, formData);
//         onUpdateFood(updatedFood);
//         setToastMessage('Food item updated successfully!');
//         setShowToast(true);
//         onHide();
//       } catch (error) {
//         console.error('Error updating food item:', error);
//         setError('Error updating food item');
//         setToastMessage('Error updating food item');
//         setShowToast(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <React.Fragment>
//       <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
//         <Modal.Header className="bg-light" closeButton>
//           <Modal.Title className="m-0">Update Food Item</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="p-4">
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formFoodName">
//               <Form.Label>Food Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="food_name"
//                 value={formData.food_name || ''}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formFoodPrice">
//               <Form.Label>Food Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="food_price"
//                 value={formData.food_price || ''}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formFoodDescription">
//               <Form.Label>Food Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="food_description"
//                 value={formData.food_description || ''}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             {/* <Form.Group controlId="formOrganizationId">
//               <Form.Label>Organization</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="organization_id"
//                 value={formData.organization_id || ''}
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
//             <Form.Group controlId="formKitchenId">
//               <Form.Label>Kitchen</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="kitchen_id"
//                 value={formData.kitchen_id || ''}
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
//             <div className="text-end">
//               <Button variant="success" type="submit" className="waves-effect waves-light me-1">
//                 Save Changes
//               </Button>
//               <Button variant="danger" className="waves-effect waves-light" onClick={onHide}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <ToastContainer 
//         position="top-end" 
//         className="p-3" 
//         style={{ 
//           position: 'fixed', 
//           top: '50%', 
//           left: '50%', 
//           transform: 'translate(-50%, -50%)', 
//           zIndex: 9999 
//         }}
//       >
//         <Toast 
//           show={showToast} 
//           onClose={() => setShowToast(false)} 
//           delay={3000} 
//           autohide 
//           style={{ 
//             backgroundColor: '#28a745', // Green background for success
//             color: '#fff' // White text color
//           }}
//         >
//           <Toast.Header>
//             <strong className="me-auto">Notification</strong>
//           </Toast.Header>
//           <Toast.Body>{toastMessage}</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </React.Fragment>
//   );
// };

// export default UpdateFoodModal;


// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { FoodProduct, updateFoodProduct } from "../../../server/foodProductsServices";
// import { getKitchens } from "../../../server/restaurantServices";
// import { ToastContainer, Toast } from 'react-bootstrap';

// interface UpdateFoodModalProps {
//   show: boolean;
//   onHide: () => void;
//   foodItem: FoodProduct;
//   onSubmit: (foodProduct: FoodProduct) => void; // Add this line
// }

// const UpdateFoodModal: React.FC<UpdateFoodModalProps> = ({ show, onHide, foodItem,onSubmit}) => {
//   const [formData, setFormData] = useState<Partial<FoodProduct> | null>(null);
//   const [kitchens, setKitchens] = useState<{ _id: string, name: string }[]>([]);

//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [toastMessage, setToastMessage] = useState<string>('');
//   const API_URL = 'http://localhost:5000/api'; // Ensure this matches your actual API URL
//   const [error, setError] = useState<string | null>(null);


//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData((prevData) => ({ ...prevData, image_url: reader.result as string }));
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   useEffect(() => {
//     const fetchKitchens = async () => {
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
//     fetchKitchens();
//   }, []);

//   useEffect(() => {
//     setFormData(foodItem);
//   }, [foodItem]);

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
//     const updatedFoodData: Partial<FoodProduct> = { ...formData ,
//       updated_at: new Date(),
//       updated_by: "66a79aacd02d4640444ccf0c",
//     };
//     if (kitchens) {
//       const kitchenName = formData.kitchen_id as string;

//       const kitchensArray = kitchens as { _id: string; name: string; }[];
//       const kitchensMap = new Map<string, string>(
//         kitchensArray.map(kitchen => [kitchen.name, kitchen._id])
//       );
      
//       // Find corresponding ids
//       const kitchenId = kitchensMap.get(kitchenName);
      

//       if (kitchenId) updatedFoodData.kitchen_id= kitchenId;
//     }
//       // try {
//       //   const updatedFood = await updateFoodProduct(foodItem._id, formData);
//       //   onSubmit(updatedFood);
//       //   setShowToast(true);
//       //   onHide();
//       // } catch (error) {
//       //   console.error('Error updating food item:', error);
        
//       // }
//       await onSubmit(updatedFoodData as FoodProduct);
//     setFormData({});
//     onHide();
     
    
//   };

//   return (
//     <React.Fragment>
//       <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
//         <Modal.Header className="bg-light" closeButton>
//           <Modal.Title className="m-0">Update Food Item</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="p-4">
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formFoodName">
//               <Form.Label>Food Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="food_name"
//                 value={formData.food_name || ''}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formFoodPrice">
//               <Form.Label>Food Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="food_price"
//                 value={formData.food_price || ''}
//                 onChange={handleChange}
//                 required
//               />
//               <Form.Group controlId="image_url">
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="image_url"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 style={{ marginBottom: "1rem" }}
//               />
//             </Form.Group>
//             </Form.Group>
//             <Form.Group controlId="formFoodDescription">
//               <Form.Label>Food Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="food_description"
//                 value={formData.food_description || ''}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formKitchenId">
//               <Form.Label>Kitchen</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="kitchen_id"
//                 value={formData.kitchen_id || ''}
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
//             <br />
//             <div className="text-end">
//               <Button variant="success" type="submit" className="waves-effect waves-light me-1">
//                 Save Changes
//               </Button>
//               <Button variant="danger" className="waves-effect waves-light" onClick={onHide}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <ToastContainer 
//         position="top-end" 
//         className="p-3" 
//         style={{ 
//           position: 'fixed', 
//           top: '50%', 
//           left: '50%', 
//           transform: 'translate(-50%, -50%)', 
//           zIndex: 9999 
//         }}
//       >
//         <Toast 
//           show={showToast} 
//           onClose={() => setShowToast(false)} 
//           delay={3000} 
//           autohide 
//           style={{ 
//             backgroundColor: '#28a745', // Green background for success
//             color: '#fff' // White text color
//           }}
//         >
//           <Toast.Header>
//             <strong className="me-auto">Notification</strong>
//           </Toast.Header>
//           <Toast.Body>{toastMessage}</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </React.Fragment>
//   );
// };

// export default UpdateFoodModal;
// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { FoodProduct } from "../../../server/foodProductsServices";
// import { getKitchens } from "../../../server/restaurantServices";
// import { Kitchen } from "../../../server/restaurantServices";

// interface UpdateFoodModalProps {
//   show: boolean;
//   onHide: () => void;
//   foodItem: FoodProduct | null;
//   onSubmit: (updatedFoodProduct: FoodProduct) => Promise<void>;
// }

// const UpdateFoodModal: React.FC<UpdateFoodModalProps> = ({
//   show,
//   onHide,
//   foodItem,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<Partial<FoodProduct> | null>(null);
//   const [kitchens, setKitchens] = useState<Kitchen[]>([]);
//   const [kitchenMap, setKitchenMap] = useState<Map<string, string>>(); // Kitchen ID to Name map

//   useEffect(() => {
//     const fetchKitchens = async () => {
//       try {
//         const kitchenList = await getKitchens(1, 1000); // Adjust page and limit if needed
//         setKitchens(kitchenList.data); // Adjust based on your response structure
//         setKitchenMap(new Map(kitchenList.data.map((kitchen) => [kitchen._id, kitchen.f_name])));
//       } catch (error) {
//         console.error("Error fetching kitchens:", error);
//       }
//     };

//     fetchKitchens();
//   }, []);

//   useEffect(() => {
//     if (foodItem) {
//       setFormData({
//         ...foodItem,
//         updated_by: "system", // Set default value for updated_by
//         updated_at: new Date(), // Set default value for updated_at
//       });
//     }
//   }, [foodItem]);

//   if (!formData) {
//     return null; // Prevent rendering if formData is not set
//   }

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevState) =>
//       prevState ? { ...prevState, [name]: value } : null
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Convert selected IDs to names
//     const updatedFoodData: Partial<FoodProduct> = { ...formData };

//     if (kitchenMap) {
//       const kitchenId = formData.kitchen_id as string;

//       // Find corresponding names
//       const kitchenName = kitchenMap.get(kitchenId);

//       if (kitchenName) updatedFoodData.kitchen_id = kitchenId;
//     }

//     await onSubmit(updatedFoodData as FoodProduct);
//     setFormData(null);
//     onHide();
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Update Food Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="food_name">
//             <Form.Label>Food Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="food_name"
//               value={formData.food_name || ""}
//               onChange={handleChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="food_price">
//             <Form.Label>Food Price</Form.Label>
//             <Form.Control
//               type="number"
//               name="food_price"
//               value={formData.food_price || ""}
//               onChange={handleChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="food_description">
//             <Form.Label>Food Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="food_description"
//               value={formData.food_description || ""}
//               onChange={handleChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="kitchen_id">
//             <Form.Label>Kitchen Name</Form.Label>
//             <Form.Control
//               as="select"
//               name="kitchen_id"
//               value={formData.kitchen_id || ""}
//               onChange={handleChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             >
//               {kitchens.map((kit)=>(
//               <option value="">{kit.f_name}</option>

//               ))}
//               {kitchens.map((kitchen) => (

//                 <option key={kitchen._id} value={kitchen._id}>
//                   {kitchen.f_name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <div className="text-center mt-4">
//             <Button
//               variant="primary"
//               type="submit"
//               style={{
//                 backgroundColor: "#007bff",
//                 borderColor: "#007bff",
//                 padding: "0.3rem 1rem",
//                 borderRadius: "0.25rem",
//                 fontWeight: "bold",
//                 transition: "background-color 0.2s ease-in-out",
//                 fontSize: "0.875rem",
//               }}
//               onMouseOver={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#0056b3")
//               }
//               onMouseOut={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#007bff")
//               }
//             >
//               Update Food Product
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateFoodModal;
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FoodProduct } from "../../../server/foodProductsServices"; // Adjust the path if needed

interface UpdateMenuModalProps {
  show: boolean;
  onHide: () => void;
  foodItem: FoodProduct; // The food item to be edited
  onSubmit: (menu: Omit<FoodProduct, "_id" | "created_by" | "created_at">) => Promise<void>;
}

const UpdateMenuModal: React.FC<UpdateMenuModalProps> = ({
  show,
  onHide,
  foodItem,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Omit<FoodProduct, "_id" | "created_by" | "created_at">>>({
    food_name: foodItem.food_name,
    food_price: foodItem.food_price,
    food_description: foodItem.food_description,
    image_url: foodItem.image_url,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.food_name || !formData.food_price || !formData.food_description) {
      alert("Please fill all required fields.");
      return;
    }

    const additionalData = {
      updated_at: new Date(),
      updated_by: "66a79aacd02d4640444ccf0c", // Replace with actual current user ID or username
    };

    const completeData = { ...formData, ...additionalData };

    await onSubmit(completeData as Omit<FoodProduct, "_id" | "created_by" | "created_at">);
    onHide(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Menu Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMenuName">
            <Form.Label>Menu Name</Form.Label>
            <Form.Control
              type="text"
              name="food_name"
              value={formData.food_name || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formMenuPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="food_price"
              value={formData.food_price || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formMenuDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="food_description"
              value={formData.food_description || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }} // Inline style for spacing
            />
          </Form.Group>
          <Form.Group controlId="formMenuImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image_url"
              value={formData.image_url || ""}
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
              Update Menu Item
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateMenuModal;
