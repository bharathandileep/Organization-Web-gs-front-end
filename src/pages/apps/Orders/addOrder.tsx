// import React from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Order } from "../../../server/orderDetailsServices"; // Import your Order type

// interface AddOrderModalProps {
//   show: boolean;
//   onHide: () => void;
//   onSubmit: (Order: Order) => Promise<void>;
// }

// const AddOrderModal: React.FC<AddOrderModalProps> = ({ show, onHide, onSubmit }) => {
//   const [formData, setFormData] = React.useState<Partial<Order>>({});

//   // Use a more specific event type
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // if (!formData.f_name || !formData.l_name || !formData.email) {
//     //   // Handle form validation errors
//     //   alert("Please fill all required fields.");
//     //   return;
//     // }
//     await onSubmit(formData as Order);
//     // Optionally reset form data after submission
//     setFormData({});
//     onHide(); // Close modal after submission
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formOrder_id">
//             <Form.Label>Order Id</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_id"
//               value={formData.order_id|| ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>

//           <Form.Group controlId="employee_id">
//             <Form.Label>employee_id</Form.Label>
//             <Form.Control
//               type="text"
//               name="employee_id"
//                value={formData.employee_id || ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="food_id">
//             <Form.Label>food_id </Form.Label>
//             <Form.Control
//               type="text"
//               name="food_id"
//               // value={formData.l_name || ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="quantity">
//             <Form.Label>quality</Form.Label>
//             <Form.Control
//               type="number"
//               name="quantity"
//               value={formData.quantity || ''}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="order_date">
//   <Form.Label>order_date</Form.Label>
//   <Form.Control
//     type="date"
//     name="order_date"
//     value={
//       formData.order_date instanceof Date
//         ? formData.order_date.toISOString().split('T')[0]
//         : formData.order_date || ''
//     }
//     onChange={handleInputChange}
//     style={{ marginBottom: '1rem' }} // Inline style for spacing
//   />
// </Form.Group>

//           <Form.Group controlId="order_status">
//             <Form.Label>order_status</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_status"
//               value={formData.order_status || ''}
//               onChange={handleInputChange}
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//           </Form.Group>
//           <Form.Group controlId="supply_date_time">
//             <Form.Label>supply_date_time</Form.Label>
//             <Form.Control
//               type="date"
//               name="supply_date_time"
//               value={formData.supply_date_time instanceof Date
//                 ? formData.supply_date_time.toISOString().split('T')[0]
//                 : formData.supply_date_time || '' }// Inline style for spacing
//                 onChange={handleInputChange}
//                 style={{ marginBottom: '1rem' }} // Inline style for spacing
            
//             />
//           </Form.Group>
//           <Form.Group controlId="created_by">
//             <Form.Label>created_by</Form.Label>
//             <Form.Control
//               type="text"
//               name="created_by"
//               value={formData.created_by || ''}
//               onChange={handleInputChange}
//               style={{ marginBottom: '1rem' }} // Inline style for spacing
//             />
//                       </Form.Group>

//           <Form.Group controlId="created_at">
//             <Form.Label>created_at</Form.Label>
//             <Form.Control
//               type="date"
//               name="created_at"
//               value={formData.created_at instanceof Date
//                 ? formData.created_at.toISOString().split('T')[0]
//                 : formData.created_at || '' }// Inline style for spacing
//                 onChange={handleInputChange}
//                 style={{ marginBottom: '1rem' }} // Inline style for spacing
            
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
//               Add Order
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddOrderModal;
// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Order } from "../../../server/orderDetailsServices";
// import { getEmployees } from "../../../server/employeeServices"; // Adjust the import path as needed
// import { getFoodProducts } from "../../../server/foodProductsServices"; // Adjust the import path as needed
// import { Employee } from "../../../server/employeeServices"; // Import Employee type
// import { FoodProduct } from "../../../server/foodProductsServices"; // Import FoodProduct type

// interface AddOrderModalProps {
//   show: boolean;
//   onHide: () => void;
//   onSubmit: (order: Order) => Promise<void>;
// }

// const AddOrderModal: React.FC<AddOrderModalProps> = ({
//   show,
//   onHide,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<Partial<Order>>({});
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [foodProducts, setFoodProducts] = useState<FoodProduct[]>([]);
//   const [employeeMap, setEmployeeMap] = useState<Map<string, string>>(); // employee name to id mapping
//   const [foodProductMap, setFoodProductMap] = useState<Map<string, string>>(); // food name to id mapping


// const API_URL = 'http://localhost:5000/api/employee'; // Update with your actual API URL


//   const getEmployees = async (): Promise<Employee[]> => {
//     try {
//       const response = await fetch(`${API_URL}`, { // Adjust URL to match your route
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch employees");
//       }
  
//       const data = await response.json();
//       return data.data; // Adjust based on your backend response structure
//     } catch (error) {
//       console.error("Error fetching employees from API:", error);
//       throw error;
//     }
//   };
  
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const employeeList = await getEmployees();
//       setEmployees(employeeList);
//       // Create a map of employee names to their ids
//       setEmployeeMap(new Map(employeeList.map(emp => [emp.f_name, emp._id])));
//     };

//     const fetchFoodProducts = async () => {
//       const foodProductList = await getFoodProducts();
//       setFoodProducts(foodProductList);
//       // Create a map of food names to their ids
//       setFoodProductMap(new Map(foodProductList.map(food => [food.food_name, food._id])));
//     };

//     fetchEmployees();
//     fetchFoodProducts();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Convert selected names to ids
//     const orderData: Partial<Order> = { ...formData };

//     if (employeeMap && foodProductMap) {
//       const employeeName = formData.employee_id;
//       const foodName = formData.food_id as string;

//       // Find corresponding ids
//       // const employeeId = employeeMap.get(employeeName);
//       // const foodId = foodProductMap.get(foodName);

//       // if (employeeId) orderData.employee_id = employeeId;
//       // if (foodId) orderData.food_id = foodId;
//     }

//     // Call onSubmit with the updated data
//     await onSubmit(orderData as Order);
//     setFormData({});
//     onHide();
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formOrder_id">
//             <Form.Label>Order Id</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_id"
//               value={formData.order_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="employee_id"> 
//             <Form.Label>Employee Name</Form.Label>
//             <Form.Control
//               as="select"
//               name="employee_id"
//               value={formData.employee_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             >
//               <option value="">Select Employee</option>
//               {employees.map((employee) => (
//                 <option value={employee._id}>
//                   {employee.f_name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="food_id">
//             <Form.Label>Food Name</Form.Label>
//             <Form.Control
//               as="select"
//               name="food_id"
//               value={formData.food_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             >
//               <option value="">Select Food</option>
//               {foodProducts.map((food) => (
//                 <option key={food.food_id} value={food._id}>
//                   {food.food_name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="quantity">
//             <Form.Label>Quantity</Form.Label>
//             <Form.Control
//               type="number"
//               name="quantity"
//               value={formData.quantity || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//            <Form.Group controlId="order_date">
//             <Form.Label>Order Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="order_date"
//               value={
//                 formData.order_date instanceof Date
//                   ? formData.order_date.toISOString().split("T")[0]
//                   : formData.order_date || ""
//               }
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group> 

//           <Form.Group controlId="order_status">
//             <Form.Label>Order Status</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_status"
//               value={formData.order_status || ""}
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           {/* <Form.Group controlId="supply_date_time">
//             <Form.Label>Supply Date & Time</Form.Label>
//             <Form.Control
//               type="date"
//               name="supply_date_time"
//               value={
//                 formData.supply_date_time instanceof Date
//                   ? formData.supply_date_time.toISOString().split("T")[0]
//                   : formData.supply_date_time || ""
//               }
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group> */}

//           {/* <Form.Group controlId="created_by">
//             <Form.Label>Created By</Form.Label>
//             <Form.Control
//               type="text"
//               name="created_by"
//               value={ ""}
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>
//  */}
//           {/* <Form.Group controlId="created_at">
//             <Form.Label>Created At</Form.Label>
//             <Form.Control
//               type="date"
//               name="created_at"
//               value={
//                 formData.created_at instanceof Date
//                   ? formData.created_at.toISOString().split("T")[0]
//                   : formData.created_at || ""
//               }
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group> */}

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
//               Add Order
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddOrderModal;


// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Order } from "../../../server/orderDetailsServices";
// import { getEmployees } from "../../../server/employeeServices"; // Adjust the import path as needed
// import { getFoodProducts } from "../../../server/foodProductsServices"; // Adjust the import path as needed
// import { Employee } from "../../../server/employeeServices"; // Import Employee type
// import { FoodProduct } from "../../../server/foodProductsServices"; // Import FoodProduct type

// interface AddOrderModalProps {
//   show: boolean;
//   onHide: () => void;
//   onSubmit: (order: Order) => Promise<void>;
// }

// const AddOrderModal: React.FC<AddOrderModalProps> = ({
//   show,
//   onHide,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<Partial<Order>>({});
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [foodProducts, setFoodProducts] = useState<FoodProduct[]>([]);
//   const [employeeMap, setEmployeeMap] = useState<Map<string, string>>(); // employee name to id mapping
//   const [foodProductMap, setFoodProductMap] = useState<Map<string, string>>(); // food name to id mapping

//   const API_URL = "http://localhost:5000/api"; // Update with your actual API URL

//   const getEmployees = async (): Promise<Employee[]> => {
//     try {
//       const response = await fetch(`${API_URL}/employee`, {
//         // Adjust URL to match your route
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch employees");
//       }

//       const data = await response.json();
//       return data.data; // Adjust based on your backend response structure
//     } catch (error) {
//       console.error("Error fetching employees from API:", error);
//       return []; // Return an empty array in case of error to prevent map issues
//     }
//   };

//   const getFoodProducts = async (): Promise<FoodProduct[]> => {
//     try {
//       const response = await fetch(`${API_URL}/foodproducts`, {
//         // Adjust URL to match your route
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch food products");
//       }

//       const data = await response.json();
//       return data.data; // Ensure this matches the actual structure of your API response
//     } catch (error) {
//       console.error("Error fetching food products from API:", error);
//       return []; // Return an empty array in case of error to prevent map issues
//     }
//   };

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const employeeList = await getEmployees();
//       setEmployees(employeeList);
//       // Create a map of employee names to their ids
//       setEmployeeMap(new Map(employeeList.map((emp) => [emp.f_name, emp._id])));
//     };

//     const fetchFoodProducts = async () => {
//       const foodProductList = await getFoodProducts();
//       console.log(foodProductList); // Log the response to verify the structure
//       setFoodProducts(foodProductList);
//       // Create a map of food names to their ids
//       setFoodProductMap(
//         new Map(foodProductList.map((food) => [food.food_name, food._id]))
//       );
//     };

//     fetchEmployees();
//     fetchFoodProducts();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Convert selected names to ids
//     const orderData: Partial<Order> = { ...formData };

//     if (employeeMap && foodProductMap) {
//       const employeeName = formData.employee_id;
//       const foodName = formData.food_id as string;

//       // Find corresponding ids
//       // const employeeId = employeeMap.get(employeeName);
//       // const foodId = foodProductMap.get(foodName);

//       // if (employeeId) orderData.employee_id = employeeId;
//       // if (foodId) orderData.food_id = foodId;
//     }

//     // Call onSubmit with the updated data
//     await onSubmit(orderData as Order);
//     setFormData({});
//     onHide();
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           {/* <Form.Group controlId="formOrder_id">
//             <Form.Label>Order Id</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_id"
//               value={formData.order_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group> */}

//           <Form.Group controlId="employee_id">
//             <Form.Label>Employee Name</Form.Label>
//             <Form.Control
//               as="select"
//               name="employee_id"
//               value={formData.employee_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             >
//               <option value="">Select Employee</option>
//               {employees.map((employee) => (
//                 <option key={employee._id} value={employee._id}>
//                   {employee.f_name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="food_id">
//             <Form.Label>Food Name</Form.Label>
//             <Form.Control
//               as="select"
//               name="food_id"
//               value={formData.food_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             >
//               <option value="">Select Food</option>
//               {foodProducts.map((food) => (
//                 <option key={food.food_id} value={food._id}>
//                   {food.food_name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="quantity">
//             <Form.Label>Quantity</Form.Label>
//             <Form.Control
//               type="number"
//               name="quantity"
//               value={formData.quantity || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="order_date">
//             <Form.Label>Order Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="order_date"
//               value={
//                 formData.order_date instanceof Date
//                   ? formData.order_date.toISOString().split("T")[0]
//                   : formData.order_date || ""
//               }
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="order_status">
//             <Form.Label>Order Status</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_status"
//               value={formData.order_status || ""}
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>
//           <Form.Group controlId="supply_date">
//             <Form.Label>Supply Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="supply_date_time"
//               value={
//                 formData.supply_date_time instanceof Date
//                   ? formData.supply_date_time.toISOString().split("T")[0]
//                   : formData.supply_date_time || ""
//               }
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
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
//               Add Order
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddOrderModal;
// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { Order } from "../../../server/orderDetailsServices";
// import { getEmployees } from "../../../server/employeeServices"; // Adjust the import path as needed
// import { getFoodProducts } from "../../../server/foodProductsServices"; // Adjust the import path as needed
// import { Employee } from "../../../server/employeeServices"; // Import Employee type
// import { FoodProduct } from "../../../server/foodProductsServices"; // Import FoodProduct type

// interface AddOrderModalProps {
//   show: boolean;
//   onHide: () => void;
//   onSubmit: (order: Order) => Promise<void>;
// }

// const AddOrderModal: React.FC<AddOrderModalProps> = ({
//   show,
//   onHide,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<Partial<Order>>({});
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [foodProducts, setFoodProducts] = useState<FoodProduct[]>([]);

//   useEffect(() => {
//     const fetchAllEmployees = async () => {
//       try {
//         let allEmployees: Employee[] = [];
//         let page = 1;
//         let morePagesAvailable = true;

//         while (morePagesAvailable) {
//           const employeeResponse = await getEmployees(page, 100); // fetch large number to ensure getting all employees
//           allEmployees = allEmployees.concat(employeeResponse.data);

//           // Check if more pages are available
//           if (employeeResponse.pagination?.currentPage < employeeResponse.pagination?.totalPages) {
//             page++;
//           } else {
//             morePagesAvailable = false;
//           }
//         }

//         setEmployees(allEmployees);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     const fetchFoodProducts = async () => {
//       try {
//         const foodProductList = await getFoodProducts();
//         setFoodProducts(foodProductList.data); // Assuming it returns an array
//       } catch (error) {
//         console.error("Error fetching food products:", error);
//       }
//     };

//     fetchAllEmployees();
//     fetchFoodProducts();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Add default values for created_at and created_by
//     const orderData: Partial<Order> = {
//       ...formData,
//       created_at: new Date().toISOString(), // or use your preferred date format
//       created_by: "currentUserId", // Replace with actual user ID or logic to get current user
//     };

//     await onSubmit(orderData as Order);
//     setFormData({});
//     onHide();
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="employee_id">
//             <Form.Label>Employee Name</Form.Label>
//             <Form.Control
//               as="select"
//               name="employee_id"
//               value={formData.employee_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             >
//               <option value="">Select Employee</option>
//               {employees.map((employee) => (
//                 <option key={employee._id} value={employee._id}>
//                   {employee.f_name} {employee.l_name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="food_id">
//             <Form.Label>Food Name</Form.Label>
//             <Form.Control
//               as="select"
//               name="food_id"
//               value={formData.food_id || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             >
//               <option value="">Select Food</option>
//               {foodProducts.map((food) => (
//                 <option key={food._id} value={food._id}>
//                   {food.food_name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="quantity">
//             <Form.Label>Quantity</Form.Label>
//             <Form.Control
//               type="number"
//               name="quantity"
//               value={formData.quantity || ""}
//               onChange={handleInputChange}
//               required
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="order_date">
//             <Form.Label>Order Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="order_date"
//               value={
//                 formData.order_date instanceof Date
//                   ? formData.order_date.toISOString().split("T")[0]
//                   : formData.order_date || ""
//               }
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="order_status">
//             <Form.Label>Order Status</Form.Label>
//             <Form.Control
//               type="text"
//               name="order_status"
//               value={formData.order_status || ""}
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
//           </Form.Group>

//           <Form.Group controlId="supply_date">
//             <Form.Label>Supply Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="supply_date_time"
//               value={
//                 formData.supply_date_time instanceof Date
//                   ? formData.supply_date_time.toISOString().split("T")[0]
//                   : formData.supply_date_time || ""
//               }
//               onChange={handleInputChange}
//               style={{ marginBottom: "1rem" }}
//             />
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
//               Add Order
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddOrderModal;


import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Order } from "../../../server/orderDetailsServices";
import { getEmployees } from "../../../server/employeeServices";
import { getFoodProducts } from "../../../server/foodProductsServices";
import { Employee } from "../../../server/employeeServices";
import { FoodProduct } from "../../../server/foodProductsServices";

interface AddOrderModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (order: Order) => Promise<void>;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Order>>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [foodProducts, setFoodProducts] = useState<FoodProduct[]>([]);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeList = await getEmployees(1, 1000); // Adjust limit as needed
        setEmployees(employeeList.data); // Adjust based on your response structure
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchFoodProducts = async () => {
      try {
        const foodProductList = await getFoodProducts(1, 1000); // Adjust limit as needed
        setFoodProducts(foodProductList.data); // Adjust based on your response structure
      } catch (error) {
        console.error("Error fetching food products:", error);
      }
    };

    fetchEmployees();
    fetchFoodProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: Partial<Order> = {
      ...formData,
      created_at: new Date().toISOString(),
      created_by: "66a79aacd02d4640444ccf0c", // Replace with actual user ID or logic to get current user
    };

    await onSubmit(orderData as Order);
    setFormData({});
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="employee_id">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              as="select"
              name="employee_id"
              value={formData.employee_id || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.f_name} {employee.l_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="food_id">
            <Form.Label>Food Name</Form.Label>
            <Form.Control
              as="select"
              name="food_id"
              value={formData.food_id || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }}
            >
              <option value="">Select Food</option>
              {foodProducts.map((food) => (
                <option key={food._id} value={food._id}>
                  {food.food_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="order_date">
            <Form.Label>Order Date</Form.Label>
            <Form.Control
              type="date"
              name="order_date"
              value={
                formData.order_date instanceof Date
                  ? formData.order_date.toISOString().split("T")[0]
                  : formData.order_date || ""
              }
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="order_status">
            <Form.Label>Order Status</Form.Label>
            <Form.Control
              type="text"
              name="order_status"
              value={formData.order_status || ""}
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }}
            />
          </Form.Group>

          <Form.Group controlId="supply_date">
            <Form.Label>Supply Date</Form.Label>
            <Form.Control
              type="date"
              name="supply_date_time"
              value={
                formData.supply_date_time instanceof Date
                  ? formData.supply_date_time.toISOString().split("T")[0]
                  : formData.supply_date_time || ""
              }
              onChange={handleInputChange}
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
              Add Order
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddOrderModal;
