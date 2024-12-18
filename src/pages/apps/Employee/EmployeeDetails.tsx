// // import React, { useState, useEffect } from "react";
// // import { Card, Row, Col, Button } from "react-bootstrap";
// // import { Link } from "react-router-dom";
// // import classNames from "classnames";
// // import { Employee, getEmployees, deleteEmployee, addEmployee, updateEmployee } from "../../../server/employeeServices"; // Ensure correct path

// // import AddEmployeeModal from "./addEmployee";
// // import UpdateEmployeeModal from "./updateEmployee";

// // const CompanyDetails: React.FC = () => {
// //   const [employees, setEmployees] = useState<Employee[]>([]);
// //   const [showAddModal, setShowAddModal] = useState<boolean>(false);
// //   const [showEditModal, setShowEditModal] = useState<boolean>(false);
// //   const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     fetchEmployees();
// //   }, []);

// //   const fetchEmployees = async () => {
// //     try {
// //       const data = await getEmployees();
// //       setEmployees(data);
// //     } catch (error) {
// //       if (error instanceof Error) {
// //         console.error("Error fetching employees:", error.message);
// //       } else {
// //         console.error("Unknown error fetching employees:", error);
// //       }
// //     }
// //   };

// //   const onSearchData = (value: string) => {
// //     if (value === "") {
// //       fetchEmployees();
// //     } else {
// //       const modifiedEmployees = employees.filter(
// //         (employee) =>
// //           employee.f_name.toLowerCase().includes(value.toLowerCase()) ||
// //           employee.l_name.toLowerCase().includes(value.toLowerCase()) ||
// //           employee.email.toLowerCase().includes(value.toLowerCase()) ||
// //           employee.phone.toString().includes(value)
// //       );
// //       setEmployees(modifiedEmployees);
// //     }
// //   };

// //   const changeStatusGroup = (statusGroup: string) => {
// //     const updatedEmployees =
// //       statusGroup === "All"
// //         ? employees
// //         : employees.filter((employee) =>
// //             employee.job_title.includes(statusGroup)
// //           );
// //     setEmployees(updatedEmployees);
// //   };

// //   const onCloseAddModal = () => setShowAddModal(false);
// //   const onOpenAddModal = () => setShowAddModal(true);

// //   const onCloseEditModal = () => {
// //     setShowEditModal(false);
// //     setCurrentEmployee(null); // Reset currentEmployee when closing the modal
// //   };

// //   const onHandleAddSubmit = async (data: Omit<Employee, "_id">) => {
// //     try {
// //       await addEmployee(data);
// //       fetchEmployees();
// //       onCloseAddModal();
// //       setError(null);
// //     } catch (error) {
// //       if (error instanceof Error) {
// //         console.error("Error adding employee:", error.message);
// //         setError(error.message);
// //       } else {
// //         console.error("Unknown error adding employee:", error);
// //         setError("An unknown error occurred. Please try again.");
// //       }
// //     }
// //   };

// //   const handleDelete = async (id: string) => {
// //     try {
// //       await deleteEmployee(id);
// //       fetchEmployees();
// //     } catch (error) {
// //       if (error instanceof Error) {
// //         console.error("Error deleting employee:", error.message);
// //       } else {
// //         console.error("Unknown error deleting employee:", error);
// //       }
// //     }
// //   };

// //   const handleEdit = (employee: Employee) => {
// //     setCurrentEmployee(employee);
// //     setShowEditModal(true);
// //   };

// //   return (
// //     <>
// //       {error && <div className="alert alert-danger">{error}</div>}

// //       <Card className="mb-2">
// //         <Card.Body>
// //           <Row className="justify-content-between">
// //             <Col className="col-auto">
// //               <form className="d-flex flex-wrap align-items-center">
// //                 <label htmlFor="inputPassword2" className="visually-hidden">
// //                   Search
// //                 </label>
// //                 <div className="me-3">
// //                   <input
// //                     type="search"
// //                     className="form-control my-1 my-lg-0"
// //                     id="inputPassword2"
// //                     placeholder="Search..."
// //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                       onSearchData(e.target.value)
// //                     }
// //                   />
// //                 </div>
// //                 <label htmlFor="status-select" className="me-2">
// //                   Sort By
// //                 </label>
// //                 <div className="me-sm-3">
// //                   <select
// //                     className="form-select my-1 my-lg-0"
// //                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
// //                       changeStatusGroup(e.target.value)
// //                     }
// //                   >
// //                     <option defaultValue="All">All</option>
// //                     <option value="Manager">Manager</option>
// //                     <option value="Developer">Developer</option>
// //                     {/* Add more options as needed */}
// //                   </select>
// //                 </div>
// //               </form>
// //             </Col>
// //             <Col lg={4}>
// //               <div className="text-lg-end mt-3 mt-lg-0">
// //                 <Button
// //                   variant="success"
// //                   className="waves-effect waves-light me-1"
// //                 >
// //                   <i className="mdi mdi-cog"></i>
// //                 </Button>
// //                 <Button
// //                   variant="danger"
// //                   className="waves-effect waves-light"
// //                   onClick={onOpenAddModal}
// //                 >
// //                   <i className="mdi mdi-plus-circle me-1"></i> Add New
// //                 </Button>
// //               </div>
// //             </Col>
// //           </Row>
// //         </Card.Body>
// //       </Card>

// //       {employees.map((employee, index) => (
// //         // <Card className="mb-1 shadow-none border" key={employee._id}>
// //         //   <Card.Body className="p-3">
// //         //     <Row className="align-items-center">
// //         //       <Col className="col-auto">
// //         //         <div className="avatar-sm">
// //         //           <span
// //         //             className={classNames(
// //         //               "avatar-title",
// //         //               "bg-",
// //         //               "rounded"
// //         //             )}
// //         //           >
// //         //             {employee.f_name.charAt(0)}
// //         //             {employee.l_name.charAt(0)}
// //         //           </span>
// //         //         </div>
// //         //       </Col>
// //         //       <Col className="ps-0">
// //         //         <Link to="#" className="text-muted fw-bold">
// //         //           {employee.f_name} {employee.l_name}
// //         //         </Link>
// //         //         <p className="mb-0">{employee.job_title}</p>
// //         //       </Col>
// //         //       <Col xs={2}>
// //         //         <div>
// //         //           <Button
// //         //             variant="light"
// //         //             className="waves-effect waves-light"
// //         //             onClick={() => handleEdit(employee)}
// //         //           >
// //         //             <i className="mdi mdi-pencil"></i>
// //         //           </Button>
// //         //           <Button
// //         //             variant="danger"
// //         //             className="waves-effect waves-light"
// //         //             onClick={() => handleDelete(employee._id)}
// //         //           >
// //         //             <i className="mdi mdi-trash-can"></i>
// //         //           </Button>
// //         //         </div>
// //         //       </Col>
// //         //     </Row>
// //         //   </Card.Body>
// //         // </Card>
// //         <Card key={employee._id} className="mb-2">
// //       <Card.Body>
// //         <Row className="align-items-center">
// //           <Col sm={4}>
// //             <div className="d-flex align-items-start">
// //               <div className="avatar-sm">
// //                 <span
// //                   className={classNames(
// //                     "avatar-title",
// //                     "bg-",
// //                     "rounded-circle"
// //                   )}
// //                 >
// //                   {employee.f_name.charAt(0)}
// //                   {employee.l_name.charAt(0)}
// //                 </span>
// //               </div>
// //               <div className="w-100 ms-3">
// //                 <h4 className="mt-0 mb-2 font-16">{employee.f_name} {employee.l_name}</h4>
// //                 <p className="mb-1">
// //                   <b>Job Title:</b> {employee.job_title}
// //                 </p>
// //                 <p className="mb-0">
// //                   <b>Department:</b> {employee.hire_date}
// //                 </p>
// //               </div>
// //             </div>
// //           </Col>
// //           <Col sm={4}>
// //             <p className="mb-1 mt-3 mt-sm-0">
// //               <i className="mdi mdi-email me-1"></i> {employee.email}
// //             </p>
// //             <p className="mb-0">
// //               <i className="mdi mdi-phone-classic me-1"></i> {employee.phone}
// //             </p>
// //           </Col>
// //           <Col sm={2}>
// //             <div className="text-center mt-3 mt-sm-0">
// //             <div
// //                 className={classNames("badge", "font-14", "p-1", {
// //                   "bg-soft-info text-info": employee.parent_org === "SomeConditionForInfo", // Replace with actual condition
// //                   "bg-soft-danger text-danger": employee.status === "Leave", // Replace with actual condition
// //                 })}
// //               >
// //                 {employee.status}
// //               </div>
// //             </div>
// //           </Col>
// //           <Col sm={2}>
// //             <div className="text-sm-end">
// //               <Button
// //                 variant="light"
// //                 className="waves-effect waves-light me-1"
// //                 onClick={() => handleEdit(employee)}
// //               >
// //                 <i className="mdi mdi-pencil"></i>
// //               </Button>
// //               <Button
// //                 variant="danger"
// //                 className="waves-effect waves-light"
// //                 onClick={() => handleDelete(employee._id)}
// //               >
// //                 <i className="mdi mdi-trash-can"></i>
// //               </Button>
// //             </div>
// //           </Col>
// //         </Row>
// //       </Card.Body>
// //     </Card>
// //       ))}

// //       <AddEmployeeModal
// //         show={showAddModal}
// //         onHide={onCloseAddModal}
// //         onSubmit={onHandleAddSubmit}
// //       />

// //       {currentEmployee && (
// //         <UpdateEmployeeModal
// //           show={showEditModal}
// //           onHide={onCloseEditModal}
// //           employee={currentEmployee}
// //           onSubmit={async (updatedEmployee: Employee) => {
// //             try {
// //               await updateEmployee(updatedEmployee._id, updatedEmployee);
// //               fetchEmployees();
// //               onCloseEditModal();
// //               setError(null);
// //             } catch (error) {
// //               if (error instanceof Error) {
// //                 console.error("Error updating employee:", error.message);
// //                 setError(error.message);
// //               } else {
// //                 console.error("Unknown error updating employee:", error);
// //                 setError("An unknown error occurred. Please try again.");
// //               }
// //             }
// //           }}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default CompanyDetails;

// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import classNames from "classnames";
// import { Employee, getEmployees, deleteEmployee, addEmployee, updateEmployee } from "../../../server/employeeServices"; // Ensure correct path

// import AddEmployeeModal from "./addEmployee";
// import UpdateEmployeeModal from "./updateEmployee";

// const CompanyDetails: React.FC = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [showAddModal, setShowAddModal] = useState<boolean>(false);
//   const [showEditModal, setShowEditModal] = useState<boolean>(false);
//   const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [employeesPerPage] = useState<number>(4); // Set the number of items per page here

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const data = await getEmployees();
//       setEmployees(data);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error fetching employees:", error.message);
//       } else {
//         console.error("Unknown error fetching employees:", error);
//       }
//     }
//   };

//   const onSearchData = (value: string) => {
//     if (value === "") {
//       fetchEmployees();
//     } else {
//       const modifiedEmployees = employees.filter(
//         (employee) =>
//           employee.f_name.toLowerCase().includes(value.toLowerCase()) ||
//           employee.l_name.toLowerCase().includes(value.toLowerCase()) ||
//           employee.email.toLowerCase().includes(value.toLowerCase()) ||
//           employee.phone.toString().includes(value)
//       );
//       setEmployees(modifiedEmployees);
//     }
//   };

//   const changeStatusGroup = (statusGroup: string) => {
//     const updatedEmployees =
//       statusGroup === "All"
//         ? employees
//         : employees.filter((employee) =>
//             employee.job_title.includes(statusGroup)
//           );
//     setEmployees(updatedEmployees);
//   };

//   const onCloseAddModal = () => setShowAddModal(false);
//   const onOpenAddModal = () => setShowAddModal(true);

//   const onCloseEditModal = () => {
//     setShowEditModal(false);
//     setCurrentEmployee(null); // Reset currentEmployee when closing the modal
//   };

//   const onHandleAddSubmit = async (data: Omit<Employee, "_id">) => {
//     try {
//       await addEmployee(data);
//       fetchEmployees();
//       onCloseAddModal();
//       setError(null);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error adding employee:", error.message);
//         setError(error.message);
//       } else {
//         console.error("Unknown error adding employee:", error);
//         setError("An unknown error occurred. Please try again.");
//       }
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteEmployee(id);
//       fetchEmployees();
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error deleting employee:", error.message);
//       } else {
//         console.error("Unknown error deleting employee:", error);
//       }
//     }
//   };

//   const handleEdit = (employee: Employee) => {
//     setCurrentEmployee(employee);
//     setShowEditModal(true);
//   };

//   // Calculate pagination
//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   // Pagination handler
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <>
//       {error && <div className="alert alert-danger">{error}</div>}

//       <Card className="mb-2">
//         <Card.Body>
//           <Row className="justify-content-between">
//             <Col className="col-auto">
//               <form className="d-flex flex-wrap align-items-center">
//                 <label htmlFor="inputPassword2" className="visually-hidden">
//                   Search
//                 </label>
//                 <div className="me-3">
//                   <input
//                     type="search"
//                     className="form-control my-1 my-lg-0"
//                     id="inputPassword2"
//                     placeholder="Search..."
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       onSearchData(e.target.value)
//                     }
//                   />
//                 </div>
//                 <label htmlFor="status-select" className="me-2">
//                   Sort By
//                 </label>
//                 <div className="me-sm-3">
//                   <select
//                     className="form-select my-1 my-lg-0"
//                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//                       changeStatusGroup(e.target.value)
//                     }
//                   >
//                     <option defaultValue="All">All</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Developer">Developer</option>
//                     {/* Add more options as needed */}
//                   </select>
//                 </div>
//               </form>
//             </Col>
//             <Col lg={4}>
//               <div className="text-lg-end mt-3 mt-lg-0">
//                 <Button
//                   variant="success"
//                   className="waves-effect waves-light me-1"
//                 >
//                   <i className="mdi mdi-cog"></i>
//                 </Button>
//                 <Button
//                   variant="danger"
//                   className="waves-effect waves-light"
//                   onClick={onOpenAddModal}
//                 >
//                   <i className="mdi mdi-plus-circle me-1"></i> Add New
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {currentEmployees.map((employee) => (
//         <Card key={employee._id} className="mb-2">
//           <Card.Body>
//             <Row className="align-items-center">
//               <Col sm={4}>
//                 <div className="d-flex align-items-start">
//                   <div className="avatar-sm">
//                     <span
//                       className={classNames(
//                         "avatar-title",
//                         "bg-",
//                         "rounded-circle"
//                       )}
//                     >
//                       {employee.f_name.charAt(0)}
//                       {employee.l_name.charAt(0)}
//                     </span>
//                   </div>
//                   <div className="w-100 ms-3">
//                     <h4 className="mt-0 mb-2 font-16">{employee.f_name} {employee.l_name}</h4>
//                     <p className="mb-1">
//                       <b>Job Title:</b> {employee.job_title}
//                     </p>
//                     <p className="mb-0">
//                       <b>Department:</b> {employee.hire_date}
//                     </p>
//                   </div>
//                 </div>
//               </Col>
//               <Col sm={4}>
//                 <p className="mb-1 mt-3 mt-sm-0">
//                   <i className="mdi mdi-email me-1"></i> {employee.email}
//                 </p>
//                 <p className="mb-0">
//                   <i className="mdi mdi-phone-classic me-1"></i> {employee.phone}
//                 </p>
//               </Col>
//               <Col sm={2}>
//                 <div className="text-center mt-3 mt-sm-0">
//                 <div
//                     className={classNames("badge", "font-14", "p-1", {
//                       "bg-soft-info text-info": employee.parent_org === "SomeConditionForInfo", // Replace with actual condition
//                       "bg-soft-danger text-danger": employee.status === "Leave", // Replace with actual condition
//                     })}
//                   >
//                     {employee.status}
//                   </div>
//                 </div>
//               </Col>
//               <Col sm={2}>
//                 <div className="text-sm-end">
//                   <Button
//                     variant="light"
//                     className="waves-effect waves-light me-1"
//                     onClick={() => handleEdit(employee)}
//                   >
//                     <i className="mdi mdi-pencil"></i>
//                   </Button>
//                   <Button
//                     variant="danger"
//                     className="waves-effect waves-light"
//                     onClick={() => handleDelete(employee._id)}
//                   >
//                     <i className="mdi mdi-trash-can"></i>
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       ))}

//       {/* Pagination */}
//       <Row>
//         <Col>
//           <div className="text-end">
//             <ul className="pagination pagination-rounded justify-content-end">
//               <li className="page-item">
//                 <Link
//                   className="page-link"
//                   to="#"
//                   aria-label="Previous"
//                   onClick={() => paginate(currentPage - 1)}
//                 >
//                   <span aria-hidden="true">«</span>
//                   <span className="visually-hidden">Previous</span>
//                 </Link>
//               </li>
//               {Array.from(
//                 { length: Math.ceil(employees.length / employeesPerPage) },
//                 (_, i) => i + 1
//               ).map((pageNumber) => (
//                 <li
//                   key={pageNumber}
//                   className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
//                 >
//                   <Link
//                     className="page-link"
//                     to="#"
//                     onClick={() => paginate(pageNumber)}
//                   >
//                     {pageNumber}
//                   </Link>
//                 </li>
//               ))}
//               <li className="page-item">
//                 <Link
//                   className="page-link"
//                   to="#"
//                   aria-label="Next"
//                   onClick={() => paginate(currentPage + 1)}
//                 >
//                   <span aria-hidden="true">»</span>
//                   <span className="visually-hidden">Next</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </Col>
//       </Row>

      // <AddEmployeeModal
      //   show={showAddModal}
      //   onHide={onCloseAddModal}
      //   onSubmit={onHandleAddSubmit}
      // />

      // {currentEmployee && (
      //   <UpdateEmployeeModal
      //     show={showEditModal}
      //     onHide={onCloseEditModal}
      //     employee={currentEmployee}
      //     onSubmit={async (updatedEmployee: Employee) => {
      //       try {
      //         await updateEmployee(updatedEmployee._id, updatedEmployee);
      //         fetchEmployees();
      //         onCloseEditModal();
      //         setError(null);
      //       } catch (error) {
      //         if (error instanceof Error) {
      //           console.error("Error updating employee:", error.message);
      //           setError(error.message);
      //         } else {
      //           console.error("Unknown error updating employee:", error);
      //           setError("An unknown error occurred. Please try again.");
      //         }
      //       }
      //     }}
      //   />
      // )}
//     </>
//   );
// };

// export default CompanyDetails;
// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import classNames from "classnames";
// import { Employee, getEmployees, deleteEmployee, addEmployee, updateEmployee } from "../../../server/employeeServices"; // Ensure correct path

// import AddEmployeeModal from "./addEmployee";
// import UpdateEmployeeModal from "./updateEmployee";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CompanyDetails: React.FC = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [showAddModal, setShowAddModal] = useState<boolean>(false);
//   const [showEditModal, setShowEditModal] = useState<boolean>(false);
//   const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [employeesPerPage] = useState<number>(4); // Set the number of items per page here

//   const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
//   const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [showConfirmEdit, setShowConfirmEdit] = useState(false);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const data = await getEmployees();
//       setEmployees(data || []); // Ensure data is always an array
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error fetching employees:", error.message);
//         toast.error("Error fetching employees: " + error.message);
//       } else {
//         console.error("Unknown error fetching employees:", error);
//         toast.error("An unknown error occurred while fetching employees.");
//       }
//     }
//   };

//   const onHandleAddSubmit = async (data: Omit<Employee, "_id">) => {
//     try {
//       await addEmployee(data);
//       fetchEmployees();
//       onCloseAddModal();
//       setError(null);
//       toast.success("Employee added successfully!");
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error adding employee:", error.message);
//         setError(error.message);
//         toast.error("Error adding employee: " + error.message);
//       } else {
//         console.error("Unknown error adding employee:", error);
//         setError("An unknown error occurred. Please try again.");
//         toast.error("An unknown error occurred while adding the employee.");
//       }
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteEmployee(id);
//       fetchEmployees();
//       toast.success("Employee deleted successfully!");
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error deleting employee:", error.message);
//         toast.error("Error deleting employee: " + error.message);
//       } else {
//         console.error("Unknown error deleting employee:", error);
//         toast.error("An unknown error occurred while deleting the employee.");
//       }
//     }
//   };

//   const handleEdit = async (employee: Employee) => {
    
//       // Assuming you have an updateEmployee function to handle the update
//       setCurrentEmployee(employee);
//     setShowEditModal(true);
      
//     } 
//   const onSearchData = (value: string) => {
//     if (value === "") {
//       fetchEmployees();
//     } else {
//       const modifiedEmployees = employees.filter(
//         (employee) =>
//           (employee.f_name && employee.f_name.toLowerCase().includes(value.toLowerCase())) ||
//           (employee.l_name && employee.l_name.toLowerCase().includes(value.toLowerCase())) ||
//           (employee.email && employee.email.toLowerCase().includes(value.toLowerCase())) ||
//           (employee.phone && employee.phone.toString().includes(value))
//       );
//       setEmployees(modifiedEmployees);
//     }
//   };

//   const changeStatusGroup = (statusGroup: string) => {
//     const updatedEmployees =
//       statusGroup === "All"
//         ? employees
//         : employees.filter((employee) =>
//             employee.job_title && employee.job_title.includes(statusGroup)
//           );
//     setEmployees(updatedEmployees);
//   };

//   const onCloseAddModal = () => setShowAddModal(false);
//   const onOpenAddModal = () => setShowAddModal(true);

//   const onCloseEditModal = () => {
//     setShowEditModal(false);
//     setCurrentEmployee(null); // Reset currentEmployee when closing the modal
//   };

//   // const onHandleAddSubmit = async (data: Omit<Employee, "_id">) => {
//   //   try {
//   //     await addEmployee(data);
//   //     fetchEmployees();
//   //     onCloseAddModal();
//   //     setError(null);
     
//   //   } catch (error) {
//   //     if (error instanceof Error) {
//   //       console.error("Error adding employee:", error.message);
//   //       setError(error.message);
//   //     } else {
//   //       console.error("Unknown error adding employee:", error);
//   //       setError("An unknown error occurred. Please try again.");
//   //     }
//   //   }
//   // };

//   // const handleDelete = async (id: string) => {
//   //   try {
//   //     await deleteEmployee(id);
//   //     fetchEmployees();
//   //   } catch (error) {
//   //     if (error instanceof Error) {
//   //       console.error("Error deleting employee:", error.message);
//   //     } else {
//   //       console.error("Unknown error deleting employee:", error);
//   //     }
//   //   }
//   // };

//   // const handleEdit = (employee: Employee) => {
//   //   setCurrentEmployee(employee);
//   //   setShowEditModal(true);
//   // };

//   // Calculate pagination
//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   // Pagination handler
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <>
//       {error && <div className="alert alert-danger">{error}</div>}

//       <Card className="mb-2">
//         <Card.Body>
//           <Row className="justify-content-between">
//             <Col className="col-auto">
//               <form className="d-flex flex-wrap align-items-center">
//                 <label htmlFor="inputPassword2" className="visually-hidden">
//                   Search
//                 </label>
//                 <div className="me-3">
//                   <input
//                     type="search"
//                     className="form-control my-1 my-lg-0"
//                     id="inputPassword2"
//                     placeholder="Search..."
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       onSearchData(e.target.value)
//                     }
//                   />
//                 </div>
//                 <label htmlFor="status-select" className="me-2">
//                   Sort By
//                 </label>
//                 <div className="me-sm-3">
//                   <select
//                     className="form-select my-1 my-lg-0"
//                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//                       changeStatusGroup(e.target.value)
//                     }
//                   >
//                     <option defaultValue="All">All</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Developer">Developer</option>
//                     {/* Add more options as needed */}
//                   </select>
//                 </div>
//               </form>
//             </Col>
//             <Col lg={4}>
//               <div className="text-lg-end mt-3 mt-lg-0">
//                 <Button
//                   variant="success"
//                   className="waves-effect waves-light me-1"
//                 >
//                   <i className="mdi mdi-cog"></i>
//                 </Button>
//                 <Button
//                   variant="danger"
//                   className="waves-effect waves-light"
//                   onClick={onOpenAddModal}
//                 >
//                   <i className="mdi mdi-plus-circle me-1"></i> Add New
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {currentEmployees.map((employee) => {
        // const firstNameInitial = employee.f_name ? employee.f_name.charAt(0) : '';
        // const lastNameInitial = employee.l_name ? employee.l_name.charAt(0) : '';
//         return (
//           <Card key={employee._id} className="mb-2">
//             <Card.Body>
//               <Row className="align-items-center">
//                 <Col sm={4}>
//                   <div className="d-flex align-items-start">
//                     <div className="avatar-sm">
//                       <span
//                         className={classNames(
//                           "avatar-title",
//                           "bg-",
//                           "rounded-circle"
//                         )}
//                       >
//                         {firstNameInitial}
//                         {lastNameInitial}
//                       </span>
//                     </div>
//                     <div className="w-100 ms-3">
//                       <h4 className="mt-0 mb-2 font-16">{employee.f_name} {employee.l_name}</h4>
//                       <p className="mb-1">
//                         <b>Job Title:</b> {employee.job_title}
//                       </p>
//                       <p className="mb-0">
//                         <b>Department:</b> {employee.hire_date}
//                       </p>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col sm={4}>
//                   <p className="mb-1 mt-3 mt-sm-0">
//                     <i className="mdi mdi-email me-1"></i> {employee.email}
//                   </p>
//                   <p className="mb-0">
//                     <i className="mdi mdi-phone-classic me-1"></i> {employee.phone}
//                   </p>
//                 </Col>
//                 <Col sm={2}>
//                   <div className="text-center mt-3 mt-sm-0">
//                     <div
//                       className={classNames("badge", "font-14", "p-1", {
//                         "bg-soft-info text-info": employee.parent_org === "SomeConditionForInfo", // Replace with actual condition
//                         "bg-soft-danger text-danger": employee.status === "Leave", // Replace with actual condition
//                       })}
//                     >
//                       {employee.status}
//                     </div>
//                   </div>
//                 </Col>
//                 <Col sm={2}>
//                   <div className="text-sm-end">
//                     <Button
//                       variant="light"
//                       className="waves-effect waves-light me-1"
//                       onClick={() => handleEdit(employee)}
//                     >
//                       <i className="mdi mdi-pencil"></i>
//                     </Button>
//                     <Button
//                       variant="danger"
//                       className="waves-effect waves-light"
//                       onClick={() => handleDelete(employee._id)}
//                     >
//                       <i className="mdi mdi-trash-can"></i>
//                     </Button>
//                   </div>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         );
//       })}

//       {/* Pagination Component */}
      // <div className="pagination">
      //   <button
      //     onClick={() => paginate(currentPage - 1)}
      //     disabled={currentPage === 1}
      //   >
      //     &laquo;
      //   </button>
      //   {Array.from(
      //     { length: Math.ceil(employees.length / employeesPerPage) },
      //     (_, index) => (
      //       <button
      //         key={index + 1}
      //         onClick={() => paginate(index + 1)}
      //         className={currentPage === index + 1 ? "active" : ""}
      //       >
      //         {index + 1}
      //       </button>
      //     )
      //   )}
      //   <button
      //     onClick={() => paginate(currentPage + 1)}
      //     disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}
      //   >
      //     &raquo;
      //   </button>
      // </div>
//       <AddEmployeeModal
//         show={showAddModal}
//         onHide={onCloseAddModal}
//         onSubmit={onHandleAddSubmit}
//       />

//       {currentEmployee && (
//         <UpdateEmployeeModal
//           show={showEditModal}
//           onHide={onCloseEditModal}
//           employee={currentEmployee}
//           onSubmit={async (updatedEmployee: Employee) => {
//             try {
//               await updateEmployee(updatedEmployee._id, updatedEmployee);
//               fetchEmployees();
//               onCloseEditModal();
//               setError(null);
//               toast.success("Employee updated successfully!");

//             } catch (error) {
//               if (error instanceof Error) {
//                 toast.error("Error updating employee: " + error.message);

//                 console.error("Error updating employee:", error.message);
//                 setError(error.message);
//               } else {
//                 console.error("Unknown error updating employee:", error);
//                 setError("An unknown error occurred. Please try again.");
//               }
//             }
//           }}
//         />
        
//       )}

//     </>
//   );
// };

// export default CompanyDetails;

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Modal,Pagination ,Spinner} from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Employee,
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} from "../../../server/employeeServices"; // Ensure correct path

import AddEmployeeModal from "./addEmployee";
import UpdateEmployeeModal from "./updateEmployee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderModal from '../../../server/LoaderModal'; // Adjust the path as needed
const CompanyDetails: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [employeesPerPage] = useState<number>(4); // Set the number of items per page here

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);


  const [totalPages, setTotalPages] = useState<number>(1);
  //const employeesPerPage = 4; // Assuming 4 employees per page
  const [employeesPerPage] = useState(4); 
  const [loading, setLoading] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // const paginationItems = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   paginationItems.push(
  //     <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
  //       {i}
  //     </Pagination.Item>
  //   );
  // }

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageClick(i)}
        className="rounded-circle"
      >
        {i}
      </Pagination.Item>
    );
  }


  const fetchEmployees = async (page: number, limit: number) => {
    try {
      const response = await getEmployees(page, limit);
      console.log('API Response:', response);
  
      if (response && response.data && response.pagination) {
        const { data, pagination } = response;
        setEmployees(data || []);
        setTotalPages(pagination.totalPages || 0);
        console.log('Fetched Employees:', data);
        console.log('Pagination Info:', pagination);
      } else {
        console.error('Unexpected API Response Structure:', response);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  
  useEffect(() => {
    console.log(`Fetching data for page ${currentPage}`);
    fetchEmployees(currentPage, employeesPerPage);
  }, [currentPage, employeesPerPage]);  

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);


  useEffect(() => {
    console.log('Current Page:', currentPage);
    console.log('Employees State:', employees);
    console.log('Index of First Employee:', indexOfFirstEmployee);
    console.log('Index of Last Employee:', indexOfLastEmployee);
    console.log('Current Employees:', currentEmployees);
  }, [employees, currentPage]); // Add dependencies here
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onHandleAddSubmit = async (data: Omit<Employee, "_id">) => {
    setShowLoader(true); // Show loader modal
    
    try {
      const emp = await addEmployee(data);
      fetchEmployees(currentPage, employeesPerPage);
      onCloseAddModal();
      setError(null);
      setTimeout(() => {
        toast.success(`Employee added successfully!`);

        setShowLoader(false);
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding employee:", error.message);
        setError(error.message);
        setTimeout(() => {
          toast.error("Error adding employee: ");

          setShowLoader(false);
        }, 1000);
      } else {
        console.error("Unknown error adding employee:", error);
        setError("An unknown error occurred. Please try again.");
        setTimeout(() => {
          toast.error("An unknown error occurred while adding the employee.");

          setShowLoader(false);
        }, 1000);
      }
    } 
  };

  const handleDelete = async () => {
    setShowLoader(true)
    if (!employeeToDelete) return;

    try {
      await deleteEmployee(employeeToDelete._id);
      fetchEmployees(currentPage, employeesPerPage);
      setTimeout(() => {
        toast.success("Employee deleted successfully!");
        setShowLoader(false);
      }, 1000);


    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting employee:", error.message);

        setTimeout(() => {
          toast.error("Failed to delete Employee");
          setShowLoader(false);
        }, 1000);
        } else {
        console.error("Unknown error deleting employee:", error);
        toast.error("An unknown error occurred while deleting the employee.");
      }
    } finally {
      setShowConfirmDelete(false);
      setEmployeeToDelete(null);
    }
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setShowConfirmDelete(true);
  };

  const handleEditClick = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setShowConfirmEdit(true);
  };


  const handleEdit = async (updatedEmployee: Employee) => {
    setShowLoader(true); // Show loader modal

    try {
      await updateEmployee(updatedEmployee._id, updatedEmployee);
      fetchEmployees(currentPage, employeesPerPage);
      setTimeout(() => {
toast.success("Employee updated successfully")
        setShowLoader(false);
      }, 1000);

      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating employee:", error.message);
        setTimeout(() => {
          toast.error("Error updating employee: " );

          setShowLoader(false);
        }, 1000);
  
      } else {
        console.error("Unknown error updating employee:", error);
        setTimeout(() => {
          toast.error("An unknown error occurred while updating the employee.");
  
          setShowLoader(false);
        }, 1000);
  
      }
    } finally {
      setShowEditModal(false);
      setCurrentEmployee(null);
      
    }
  };
  const confirmEdit = () => {
    if (employeeToEdit) {
      setCurrentEmployee(employeeToEdit);
      setShowEditModal(true);
    }
    setShowConfirmEdit(false)

  }
  const onSearchData = (value: string) => {
    if (value === "") {
      fetchEmployees(currentPage, employeesPerPage);

    } else {
      const modifiedEmployees = employees.filter(
        (employee) =>
          (employee.f_name &&
            employee.f_name.toLowerCase().includes(value.toLowerCase())) ||
          (employee.l_name &&
            employee.l_name.toLowerCase().includes(value.toLowerCase())) ||
          (employee.email &&
            employee.email.toLowerCase().includes(value.toLowerCase())) ||
          (employee.phone && employee.phone.toString().includes(value))
      );
      setEmployees(modifiedEmployees);
    }
  };

  const changeStatusGroup = (statusGroup: string) => {
    const updatedEmployees =
      statusGroup === "All"
        ? employees
        : employees.filter((employee) =>
            employee.job_title && employee.job_title.includes(statusGroup)
          );
    setEmployees(updatedEmployees);
  };

  const onCloseAddModal = () => setShowAddModal(false);
  const onOpenAddModal = () => setShowAddModal(true);

  const onCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentEmployee(null); // Reset currentEmployee when closing the modal
  };

//   return (
//     <>
      // {error && <div className="alert alert-danger">{error}</div>}

      // <Card className="mb-2">
      //   <Card.Body>
      //     <Row className="justify-content-between">
      //       <Col className="col-auto">
      //         <form className="d-flex flex-wrap align-items-center">
      //           <label htmlFor="inputPassword2" className="visually-hidden">
      //             Search
      //           </label>
      //           <div className="me-3">
      //             <input
      //               type="search"
      //               className="form-control my-1 my-lg-0"
      //               id="inputPassword2"
      //               placeholder="Search..."
      //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      //                 onSearchData(e.target.value)
      //               }
      //             />
      //           </div>
      //           <label htmlFor="status-select" className="me-2">
      //             Sort By
      //           </label>
      //           <div className="me-sm-3">
      //             <select
      //               className="form-select my-1 my-lg-0"
      //               onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
      //                 changeStatusGroup(e.target.value)
      //               }
      //             >
      //               <option defaultValue="All">All</option>
      //               <option value="Manager">Manager</option>
      //               <option value="Developer">Developer</option>
      //               {/* Add more options as needed */}
      //             </select>
      //           </div>
      //         </form>
      //       </Col>
      //       <Col lg={4}>
      //         <div className="text-lg-end mt-3 mt-lg-0">
      //           <Button
      //             variant="success"
      //             className="waves-effect waves-light me-1"
      //           >
      //             <i className="mdi mdi-cog"></i>
      //           </Button>
      //           <Button
      //             variant="danger"
      //             className="waves-effect waves-light"
      //             onClick={onOpenAddModal}
      //           >
      //             <i className="mdi mdi-plus-circle me-1"></i> Add New
      //           </Button>
      //         </div>
      //       </Col>
      //     </Row>
      //   </Card.Body>
      // </Card>
// {employees.length > 0 ? (
//   employees.map((employee) => (
//     <div key={employee._id}>
//       {employee.f_name} {employee.l_name}
//     </div>
//   ))
// ) : (
//   <p>No employees found.</p>
// )}
//       {currentEmployees.map((employee) => {
//         const firstNameInitial = employee.f_name
//           ? employee.f_name.charAt(0)
//           : "";
//         const lastNameInitial = employee.l_name ? employee.l_name.charAt(0) : "";
//         return (
          // <Card key={employee._id} className="mb-2">
          //   <Card.Body>
          //     <Row className="align-items-center">
          //       <Col sm={4}>
          //         <div className="d-flex align-items-start">
          //           <div className="avatar-sm">
          //             <span
          //               className={classNames(
          //                 "avatar-title",
          //                 "bg-",
          //                 "rounded-circle"
          //               )}
          //             >
          //               {firstNameInitial}
          //               {lastNameInitial}
          //             </span>
          //           </div>
          //           <div className="w-100 ms-3">
          //             <h4 className="mt-0 mb-2 font-16">
          //               {employee.f_name} {employee.l_name}
          //             </h4>
          //             <p className="mb-1">
          //               <b>Job Title:</b> {employee.job_title}
          //             </p>
          //             <p className="mb-0">
          //               <b>Email:</b> {employee.email}
          //             </p>
          //           </div>
          //         </div>
          //       </Col>
          //       <Col sm={4}>
          //         <Row>
          //           <Col xs={6}>
          //             {/* <div className="my-3 text-sm-start">
          //               <p className="mb-1">
          //                 <b>Status</b>
          //               </p>
          //               <span className="badge badge-info-lighten">
          //                 {employee.status}
          //               </span>
          //             </div> */}
          //           </Col>
          //           <Col xs={6}>
          //             {/* <div className="my-3 text-sm-start">
          //               <p className="mb-1">
          //                 <b>Hire Date</b>
          //               </p>
          //               <span className="badge badge-success-lighten">
          //                 {new Date(employee.hire_date).toLocaleDateString()}
          //               </span>
          //             </div> */}
          //           </Col>
          //         </Row>
          //       </Col>
          //       <Col sm={4}>
          //         <div className="text-sm-end">
          //           <Link
          //             to="#"
          //             className="action-icon text-success"
          //             onClick={() => handleEditClick(employee)}
          //           >
          //             {" "}
          //             <i className="mdi mdi-square-edit-outline"></i>
          //           </Link>
          //           <Link
          //             to="#"
          //             className="action-icon text-danger"
          //             onClick={() => handleDeleteClick(employee)}
          //           >
          //             {" "}
          //             <i className="mdi mdi-delete"></i>
          //           </Link>
          //         </div>
          //       </Col>
          //     </Row>
          //   </Card.Body>
          // </Card>
//         );
//       })}

//       {/* <Row className="justify-content-end">
//         <Col className="col-auto">
//           <ul className="pagination pagination-rounded mb-0">
//             {Array.from({
//               length: Math.ceil(employees.length / employeesPerPage),
//             }).map((_, index) => (
//               <li
//                 className={`page-item ${
//                   index + 1 === currentPage ? "active" : ""
//                 }`}
//                 key={index}
//                 onClick={() => paginate(index + 1)}
//               >
//                 <button className="page-link">{index + 1}</button>
//               </li>
//             ))}
//           </ul>
//         </Col>
//       </Row> */}
//   <div>
//       <button
//         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>
//       <span>Page {currentPage} of {totalPages}</span>
//       <button
//         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
  
      // <AddEmployeeModal
      //   show={showAddModal}
      //   onHide={onCloseAddModal}
      //   onSubmit={onHandleAddSubmit}
      //   // error={error}
      // />

      // <UpdateEmployeeModal
      //   show={showEditModal}
      //   onHide={onCloseEditModal}
      //   employee={currentEmployee}
      //   onSubmit={handleEdit}
      //   //  error={error}
      // />

      // <ToastContainer />

      // <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Confirm Delete</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     Are you sure you want to delete{" "}
      //     {employeeToDelete ? `${employeeToDelete.f_name} ${employeeToDelete.l_name}` : "this employee"}?
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
      //       Cancel
      //     </Button>
      //     <Button variant="danger" onClick={handleDelete}>
      //       Delete
      //     </Button>
      //   </Modal.Footer>
      // </Modal>

      // <Modal show={showConfirmEdit} onHide={() => setShowConfirmEdit(false)}>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Confirm Edit</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     Are you sure you want to edit{" "}
      //     {employeeToEdit ? `${employeeToEdit.f_name} ${employeeToEdit.l_name}` : "this employee"}?
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <Button variant="secondary" onClick={() => setShowConfirmEdit(false)}>
      //       Cancel
      //     </Button>
      //     <Button variant="primary" onClick={confirmEdit}>
      //       Edit
      //     </Button>
      //   </Modal.Footer>
      // </Modal>
//     </>
//   );
// };
return (
  
  <>
     <LoaderModal show={showLoader} />
    {error && <div className="alert alert-danger">{error}</div>}

<Card className="mb-2">
  <Card.Body>
    <Row className="justify-content-between">
      <Col className="col-auto">
        <form className="d-flex flex-wrap align-items-center">
          <label htmlFor="inputPassword2" className="visually-hidden">
            Search
          </label>
          <div className="me-3">
            <input
              type="search"
              className="form-control my-1 my-lg-0"
              id="inputPassword2"
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchData(e.target.value)
              }
            />
          </div>
          <label htmlFor="status-select" className="me-2">
            Sort By
          </label>
          <div className="me-sm-3">
            <select
              className="form-select my-1 my-lg-0"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                changeStatusGroup(e.target.value)
              }
            >
              <option defaultValue="All">All</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </form>
      </Col>
      <Col lg={4}>
        <div className="text-lg-end mt-3 mt-lg-0">
          <Button
            variant="success"
            className="waves-effect waves-light me-1"
          >
            <i className="mdi mdi-cog"></i>
          </Button>
          <Button
            variant="danger"
            className="waves-effect waves-light"
            onClick={onOpenAddModal}
          >
            <i className="mdi mdi-plus-circle me-1"></i> Add New
          </Button>
        </div>
      </Col>
    </Row>
  </Card.Body>
</Card>

    {/* Display Employees */}

    {/* const firstNameInitial = employee.f_name ? employee.f_name.charAt(0) : '';
        const lastNameInitial = employee.l_name ? employee.l_name.charAt(0) : ''; */}


    {employees.length > 0 ? (
      employees.map((employee) => (

        // <div key={employee._id}>
        //   {employee.f_name} {employee.l_name}
        // </div>
      //   <Card key={employee._id} className="mb-2">
      //   <Card.Body>
      //     <Row className="align-items-center">
      //       <Col sm={4}>
      //         <div className="d-flex align-items-start">
      //           <div className="avatar-sm">
      //             <span
      //               className={classNames(
      //                 "avatar-title",
      //                 "bg-",
      //                 "rounded-circle"
      //               )}
      //             >
      //               {/* {firstNameInitial}
      //               {lastNameInitial} */}
      //             </span>
      //           </div>
      //           <div className="w-100 ms-3">
      //             <h4 className="mt-0 mb-2 font-16">
      //               {employee.f_name} {employee.l_name}
      //             </h4>
      //             <p className="mb-1">
      //               <b>Job Title:</b> {employee.job_title}
      //             </p>
      //             <p className="mb-0">
      //               <b>Email:</b> {employee.email}
      //             </p>
      //           </div>
      //         </div>
      //       </Col>
      //       <Col sm={4}>
      //         <Row>
      //           <Col xs={6}>
      //             {/* <div className="my-3 text-sm-start">
      //               <p className="mb-1">
      //                 <b>Status</b>
      //               </p>
      //               <span className="badge badge-info-lighten">
      //                 {employee.status}
      //               </span>
      //             </div> */}
      //           </Col>
      //           <Col xs={6}>
      //             {/* <div className="my-3 text-sm-start">
      //               <p className="mb-1">
      //                 <b>Hire Date</b>
      //               </p>
      //               <span className="badge badge-success-lighten">
      //                 {new Date(employee.hire_date).toLocaleDateString()}
      //               </span>
      //             </div> */}
      //           </Col>
      //         </Row>
      //       </Col>
      //       <Col sm={4}>
      //         <div className="text-sm-end">
      //           <Link
      //             to="#"
      //             className="action-icon text-success"
                  // onClick={() => handleEditClick(employee)}
      //           >
      //             {" "}
      //             <i className="mdi mdi-square-edit-outline"></i>
      //           </Link>
      //           <Link
      //             to="#"
      //             className="action-icon text-danger"
      //             onClick={() => handleDeleteClick(employee)}
      //           >
      //             {" "}
      //             <i className="mdi mdi-delete"></i>
      //           </Link>
      //         </div>
      //       </Col>
      //     </Row>
      //   </Card.Body>
      // </Card>
      <Card key={employee._id} className="mb-2">
      <Card.Body>
        <Row className="align-items-center">
          <Col sm={4}>
            <div className="d-flex align-items-start">
              <div className="avatar-sm">
                <span
                  className={classNames(
                    "avatar-title",
                    "bg-",
                    "rounded-circle"
                  )}
                >
                  {/* {firstNameInitial}
                  {lastNameInitial} */}
                </span>
              </div>
              <div className="w-100 ms-3">
                <h4 className="mt-0 mb-2 font-16">{employee.f_name} {employee.l_name}</h4>
                <p className="mb-1">
                  <b>Job Title:</b> {employee.job_title}
                </p>
                <p className="mb-0">
                  <b>Department:</b> {employee.hire_date}
                </p>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <p className="mb-1 mt-3 mt-sm-0">
              <i className="mdi mdi-email me-1"></i> {employee.email}
            </p>
            <p className="mb-0">
              <i className="mdi mdi-phone-classic me-1"></i> {employee.phone}
            </p>
          </Col>
          <Col sm={2}>
            <div className="text-center mt-3 mt-sm-0">
              <div
                className={classNames("badge", "font-14", "p-1", {
                  "bg-soft-info text-info": employee.parent_org === "SomeConditionForInfo", // Replace with actual condition
                  "bg-soft-danger text-danger": employee.status === "Leave", // Replace with actual condition
                })}
              >
                {employee.status}
              </div>
            </div>
          </Col>
          <Col sm={2}>
            <div className="text-sm-end">
              <Button
                variant="light"
                className="waves-effect waves-light me-1"
                onClick={() => handleEditClick(employee)}
              >
                <i className="mdi mdi-pencil"></i>
              </Button>
              <Button
                variant="danger"
                className="waves-effect waves-light"
                onClick={() => handleDeleteClick(employee)}
                       >
                <i className="mdi mdi-trash-can"></i>
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>

      ))
    ) : (
      <p>No employees found.</p>
    )}

    {/* Pagination Component */}
    {/* <div>
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div> */}

<Row>
      <Col>
        <ul className="pagination pagination-rounded justify-content-end mb-3">
          <div className="d-flex justify-content-end mt-3">
            <div className="pagination pagination-rounded-end mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePreviousClick} aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span className="visually-hidden">Previous</span>
                </button>
              </li>

              <Pagination>{paginationItems}</Pagination>

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNextClick} aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span className="visually-hidden">Next</span>
                </button>
              </li>
            </div>
          </div>
        </ul>
      </Col>
    </Row>

    <AddEmployeeModal
        show={showAddModal}
        onHide={onCloseAddModal}
        onSubmit={onHandleAddSubmit}
        // error={error}
      />

      <UpdateEmployeeModal
        show={showEditModal}
        onHide={onCloseEditModal}
        employee={currentEmployee}
        onSubmit={handleEdit}
        //  error={error}
      />

      <ToastContainer />

      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          {employeeToDelete ? `${employeeToDelete.f_name} ${employeeToDelete.l_name}` : "this employee"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmEdit} onHide={() => setShowConfirmEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to edit{" "}
          {employeeToEdit ? `${employeeToEdit.f_name} ${employeeToEdit.l_name}` : "this employee"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
  </>
);
}
export default CompanyDetails;
