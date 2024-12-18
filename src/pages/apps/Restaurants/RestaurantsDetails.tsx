import React, { useState, useEffect,useCallback } from "react";
import { Card, Row, Col, Button, Modal,Pagination} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useKitchenApi, Kitchen,addKitchen } from "../../../server/restaurantServices";
import AddKitchenModal from "./AddKitchenModal";
import EditKitchenModal from "./EditKitchenModal"; // Import EditKitchenModal component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageTitle from "../../../components/PageTitle";
import LoaderModal from '../../../server/LoaderModal'; // Adjust the path as needed

const KitchensPage = () => {
  const { getKitchens, deleteKitchen, updateKitchen } = useKitchenApi();
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [filteredKitchens, setFilteredKitchens] = useState<Kitchen[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentKitchen, setCurrentKitchen] = useState<Kitchen | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showConfirmEdit, setShowConfirmEdit] = useState<boolean>(false); // Add this state
  const [kitchenToDelete, setKitchenToDelete] = useState<Kitchen | null>(null);
  const [kitchenToEdit, setKitchenToEdit] = useState<Kitchen | null>(null); // Add this state
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  // const kitchensPerPage = 6;
  // const [error, setError] = useState<string | null>(null);
  

  // useEffect(() => {
  //   const fetchKitchens = async () => {
  //     try {
  //       const kitchensData = await getKitchens();
  //       setKitchens(kitchensData);
  //       setFilteredKitchens(kitchensData);
  //     } catch (error) {
  //       console.error('Failed to fetch kitchens:', error);
  //     }
  //   };

  //   fetchKitchens();
  // }, []);
  const [totalPages, setTotalPages] = useState<number>(1);
  //const employeesPerPage = 4; // Assuming 4 employees per page
  const [kitchensPerPage] = useState(6); 

  //const employeesPerPage = 4; // Assuming 4 employees per page


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



  const fetchKitchens = async (page: number, limit: number) => {
    try {
      const response = await getKitchens(page, limit);
      console.log('API Response:', response);
  
      if (response && response.data && response.pagination) {
        const { data, pagination } = response;
        setKitchens(data || []);
        setTotalPages(pagination.totalPages || 0);
        console.log('Fetched Kitchens:', data);
        console.log('Pagination Info:', pagination);
      } else {
        console.error('Unexpected API Response Structure:', response);
      }
    } catch (error) {
      console.error("Error fetching kitchens:", error);
    }
  };
  
  useEffect(() => {
    console.log(`Fetching data for page ${currentPage}`);
    fetchKitchens(currentPage, kitchensPerPage);
  }, [currentPage, kitchensPerPage]);  
  const indexOfLastKitchen = currentPage * kitchensPerPage;
  const indexOfFirstKitchen = indexOfLastKitchen - kitchensPerPage;
  const currentKitchens = kitchens.slice(indexOfFirstKitchen, indexOfLastKitchen);


  // useEffect(() => {
  
  //   fetchKitchens();
  // }, []);
  // const fetchKitchens = async () => {
  //   try {
  //     const kitchensData = await getKitchens(); // Assume getKitchens() returns Kitchen[]
  //     if (Array.isArray(kitchensData)) {
  //       setKitchens(kitchensData);
  //       setFilteredKitchens(kitchensData);
  //     } else {
  //       console.error('Unexpected data format:', kitchensData);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch kitchens:', error);
  //   }
  // };


console.log(Array.isArray(filteredKitchens), filteredKitchens);

  const handleHideAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleHideEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  // const onSubmit = async (formData: Omit<Kitchen, "_id">) => {
  //   try {
  //     const newKitchen = await addKitchen(formData);
  //     if (newKitchen) {
  //       setKitchens([...kitchens, newKitchen]);
  //       setFilteredKitchens([...filteredKitchens, newKitchen]);
  //     }
  //     handleHideAddModal();
  //   } catch (err) {
  //     console.error("Failed to add kitchen:", err);
  //   }
  // };

const onSubmit = async (formData: Omit<Kitchen, "_id">) => {
  setShowLoader(true); // Show loader modal

  try {
    const newKitchen = await addKitchen(formData);
    
    fetchKitchens(currentPage, kitchensPerPage);

    if (newKitchen) {
      console.log(newKitchen);
      
      setKitchens([...kitchens, newKitchen]);
      setFilteredKitchens([...filteredKitchens, newKitchen]);
      // fetchKitchens(currentPage, kitchensPerPage);

    }
    handleHideAddModal();
    setTimeout(() => {
      toast.success(`Kitchen has been added successfully.`);

      setShowLoader(false);
    }, 1000);

  } catch (err) {
    console.error("Failed to add kitchen:", err);
    setTimeout(() => {
      toast.error('Failed to add the kitchen.');

      setShowLoader(false);
    }, 1000);
  }
   
};


  const onSearchData = (value: string) => {
    if (value === "") setFilteredKitchens(kitchens);
    else {
      const modifiedKitchens = kitchens.filter(
        (item) =>
          item.f_name.toLowerCase().includes(value.toLowerCase()) ||
          item.l_name.toLowerCase().includes(value.toLowerCase()) ||
          item.location_id.toString().includes(value)
      );
      setFilteredKitchens(modifiedKitchens);
    }
  };

  const handleDelete = async () => {
    setShowLoader(true)
    if (!kitchenToDelete) return;

    try {
      await deleteKitchen(kitchenToDelete._id);
      setKitchens(kitchens.filter((kitchen) => kitchen._id !== kitchenToDelete._id));
      setFilteredKitchens(filteredKitchens.filter((kitchen) => kitchen._id !== kitchenToDelete._id));
      setTimeout(() => {
        toast.success("Kitchen deleted successfully!");
        setShowLoader(false);
      }, 1000);

    } catch (error) {
      console.error('Failed to delete kitchen:', error);
      setTimeout(() => {
        toast.error("Failed to delete kitchen");
        setShowLoader(false);
      }, 1000);
    } finally {
      setShowConfirmDelete(false);
      setKitchenToDelete(null);
    }
  };

  const handleDeleteClick = (kitchen: Kitchen) => {
    setKitchenToDelete(kitchen);
    setShowConfirmDelete(true);
  };

  // const handleUpdate = async (id: string, data: Partial<Kitchen>) => {
  //       if (!kitchenToDelete) return;

  //   try {
  //     const updatedKitchen = await updateKitchen(id, data);
  //     if (updatedKitchen) {
  //       const updatedKitchens = kitchens.map((k) =>
  //         k._id === id ? updatedKitchen : k
  //       );
  //       setKitchens(updatedKitchens);
  //       setFilteredKitchens(updatedKitchens);


  //     }
  //     setShowEditModal(false);
  //     setCurrentKitchen(null);
  //   } catch (error) {
  //     console.error("Failed to update kitchen:", error);
  //   }
  // };
  const handleUpdate = async (id: string, data: Partial<Kitchen>) => {

    if (!kitchenToEdit) return;
    setShowLoader(true); // Show loader modal

    try {
      const updatedKitchen = await updateKitchen(id, data);
      fetchKitchens(currentPage, kitchensPerPage);

      if (updatedKitchen) {
        const updatedKitchens = kitchens.map((k) =>
          k._id === id ? updatedKitchen : k
        );
        setKitchens(updatedKitchens);
        setFilteredKitchens(updatedKitchens);
        setTimeout(() => {
          toast.success(` kitchen has been updated successfully.`);

          setShowLoader(false);
        }, 1000);
      }
      setShowEditModal(false);
      setCurrentKitchen(null);
    } catch (error) {
      console.error("Failed to update kitchen:", error);
      setTimeout(() => {
        toast.error('Failed to update the kitchen.');

        setShowLoader(false);
      }, 1000);
    }
   
  };

  const handleEditClick = (kitchen: Kitchen) => {
    setKitchenToEdit(kitchen);
    setShowConfirmEdit(true); // Show confirmation dialog
  };

  const confirmEdit = () => {
    if (kitchenToEdit) {
      setCurrentKitchen(kitchenToEdit);
      handleShowEditModal();
    }
    setShowConfirmEdit(false);
  };

  // Pagination
  // const indexOfLastKitchen = currentPage * kitchensPerPage;
  // const indexOfFirstKitchen = indexOfLastKitchen - kitchensPerPage;
  // // const currentKitchens = filteredKitchens.slice(
  // //   indexOfFirstKitchen,
  // //   indexOfLastKitchen
  // // ) :[];
  // const currentKitchens = Array.isArray(filteredKitchens) ? filteredKitchens.slice(indexOfFirstKitchen, indexOfLastKitchen) : [];
  // const totalPages = Math.ceil(filteredKitchens.length / kitchensPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
         <LoaderModal show={showLoader} />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="justify-content-between">
                <Col md={8}>
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
                        onChange={(e) => onSearchData(e.target.value)}
                      />
                    </div>
                    <label htmlFor="status-select" className="me-2">
                      Sort By
                    </label>
                    <div className="me-sm-3">
                      <select className="form-select my-1 my-lg-0">
                        <option defaultValue="Select">Select</option>
                        <option value="Date">Date</option>
                        <option value="Name">Name</option>
                      </select>
                    </div>
                  </form>
                </Col>
                <Col md={4}>
                  <div className="text-md-end mt-3 mt-md-0">
                    <Button
                      variant="success"
                      className="waves-effect waves-light me-1"
                    >
                      <i className="mdi mdi-cog"></i>
                    </Button>
                    <Button
                      variant="danger"
                      className="waves-effect waves-light"
                      onClick={handleShowAddModal}
                    >
                      <i className="mdi mdi-plus-circle me-1"></i> Add New
                    </Button>

             </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {kitchens .map((kitchen, index) => (
          <Col key={index} lg={4}>
            <Card className="bg-pattern">
              <Card.Body>
                <div className="product-action me-1">
                  <Button
                    className="btn btn-success btn-xs waves-effect waves-light"
                    style={{ marginLeft: "350px" }}
                    onClick={() => handleEditClick(kitchen)} // Update this to use handleEditClick
                  >
                    <i className="mdi mdi-pencil"></i>
                  </Button>
                  <Button
                    className="btn btn-danger btn-xs waves-effect waves-light"
                    onClick={() => handleDeleteClick(kitchen)}
                  >
                    <i className="mdi mdi-close"></i>
                  </Button>
                </div>

                <div className="text-center">
                  <img
                    src={kitchen.image_url}
                    alt=""
                    className="avatar-xl rounded-circle mb-3"
                  />
                  <h4 className="mb-1 font-20">{`${kitchen.f_name} ${kitchen.l_name}`}</h4>
                  <p className="font-14 text-center text-muted">
                 {kitchen.description}
                </p>
                  <p className="font-14 text-center text-muted">
                  Contact Number: {kitchen.phone_no}
                </p>
                  <p className="text-muted font-14">
                    Location ID: {kitchen.location_id}
                  </p>
                </div>

                

                <div className="text-center">
                  <Link
                    to={`/kitchens/${kitchen._id}`}
                    className="btn btn-sm btn-light"
                  >
                    View more info
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <Row>
        <Col>
          <div className="text-end">
            <ul className="pagination pagination-rounded justify-content-end">
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  aria-label="Previous"
                  onClick={() => paginate(currentPage - 1)}
                >
                  <span aria-hidden="true">«</span>
                  <span className="visually-hidden">Previous</span>
                </Link>
              </li>
              {Array.from(
                { length: Math.ceil(kitchens.length / kitchensPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      to="#"
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Link>
                  </li>
                )
              )}
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  aria-label="Next"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <span aria-hidden="true">»</span>
                  <span className="visually-hidden">Next</span>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row> */}
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

      <AddKitchenModal show={showAddModal} handleClose={handleHideAddModal} onSubmit={onSubmit} />
      
      {currentKitchen && (
        <EditKitchenModal
          show={showEditModal}
          handleClose={handleHideEditModal}
          kitchen={currentKitchen}
          onSubmit={(id: string, data: Partial<Kitchen>) => handleUpdate(id, data)}
        />
      )}

      <Modal
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this kitchen?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirmEdit}
        onHide={() => setShowConfirmEdit(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to edit this kitchen?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmEdit(false)}
          >
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

export default KitchensPage;

// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useKitchenApi, Kitchen, KitchenResponse } from "../../../server/restaurantServices";
// import AddKitchenModal from "./AddKitchenModal";
// import EditKitchenModal from "./EditKitchenModal";
// import { toast } from 'react-toastify';
// import PageTitle from "../../../components/PageTitle";

// const KitchensPage = () => {
//   const { getKitchens, addKitchen, deleteKitchen, updateKitchen } = useKitchenApi();
//   const [kitchens, setKitchens] = useState<Kitchen[]>([]);
//   const [filteredKitchens, setFilteredKitchens] = useState<Kitchen[]>([]);
//   const [showAddModal, setShowAddModal] = useState<boolean>(false);
//   const [showEditModal, setShowEditModal] = useState<boolean>(false);
//   const [currentKitchen, setCurrentKitchen] = useState<Kitchen | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
//   const [showConfirmEdit, setShowConfirmEdit] = useState<boolean>(false);
//   const [kitchenToDelete, setKitchenToDelete] = useState<Kitchen | null>(null);
//   const [kitchenToEdit, setKitchenToEdit] = useState<Kitchen | null>(null);
//   // const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const kitchensPerPage = 6;
//   useEffect(() => {
//     const fetchKitchens = async () => {
//       try {
//         const response: KitchenResponse = await getKitchens();
//         if (response && Array.isArray(response.data.kitchens)) {
//           setKitchens(response.data.kitchens);
//           setFilteredKitchens(response.data.kitchens);
//         } else {
//           console.error('Unexpected data format:', response);
//           setError('Failed to load kitchens');
//         }
//       } catch (error) {
//         console.error('Failed to fetch kitchens:', error);
//         setError('Failed to load kitchens');
//       }
//     };

//     fetchKitchens();
//   }, []);

//   const handleHideAddModal = () => setShowAddModal(false);
//   const handleShowAddModal = () => setShowAddModal(true);

//   const handleHideEditModal = () => setShowEditModal(false);
//   const handleShowEditModal = () => setShowEditModal(true);

//   const onSubmit = async (formData: Omit<Kitchen, "_id">) => {
//     try {
//       const newKitchen = await addKitchen(formData);
//       if (newKitchen) {
//         setKitchens([...kitchens, newKitchen]);
//         setFilteredKitchens([...filteredKitchens, newKitchen]);
//         toast.success(`Kitchen has been added successfully.`);
//       } else {
//         toast.error('No kitchen was added.');
//       }
//       handleHideAddModal();
//     } catch (err) {
//       console.error("Failed to add kitchen:", err);
//       toast.error('Failed to add the kitchen.');
//     }
//   };

//   const onSearchData = (value: string) => {
//     if (value === "") setFilteredKitchens(kitchens);
//     else {
//       const modifiedKitchens = kitchens.filter(
//         (item) =>
//           item.f_name.toLowerCase().includes(value.toLowerCase()) ||
//           item.l_name.toLowerCase().includes(value.toLowerCase()) ||
//           item.location_id.toString().includes(value)
//       );
//       setFilteredKitchens(modifiedKitchens);
//     }
//   };

//   const handleDelete = async () => {
//     if (!kitchenToDelete) return;

//     try {
//       await deleteKitchen(kitchenToDelete._id);
//       setKitchens(kitchens.filter((kitchen) => kitchen._id !== kitchenToDelete._id));
//       setFilteredKitchens(filteredKitchens.filter((kitchen) => kitchen._id !== kitchenToDelete._id));

//       toast.success(`"${kitchenToDelete.f_name} ${kitchenToDelete.l_name}" has been deleted successfully.`);
//     } catch (error) {
//       console.error('Failed to delete kitchen:', error);
//       toast.error('Failed to delete the kitchen.');
//     } finally {
//       setShowConfirmDelete(false);
//       setKitchenToDelete(null);
//     }
//   };

//   const handleDeleteClick = (kitchen: Kitchen) => {
//     setKitchenToDelete(kitchen);
//     setShowConfirmDelete(true);
//   };

//   const handleUpdate = async (id: string, data: Partial<Kitchen>) => {
//     if (!kitchenToEdit) return;

//     try {
//       const updatedKitchen = await updateKitchen(id, data);
//       if (updatedKitchen) {
//         const updatedKitchens = kitchens.map((k) =>
//           k._id === id ? updatedKitchen : k
//         );
//         setKitchens(updatedKitchens);
//         setFilteredKitchens(updatedKitchens);

//         toast.success(`Kitchen has been updated successfully.`);
//       }
//       setShowEditModal(false);
//       setCurrentKitchen(null);
//     } catch (error) {
//       console.error("Failed to update kitchen:", error);
//       toast.error('Failed to update the kitchen.');
//     }
//   };

//   const handleEditClick = (kitchen: Kitchen) => {
//     setKitchenToEdit(kitchen);
//     setShowConfirmEdit(true);
//   };

//   const confirmEdit = () => {
//     if (kitchenToEdit) {
//       setCurrentKitchen(kitchenToEdit);
//       handleShowEditModal();
//     }
//     setShowConfirmEdit(false);
//   };
//   // const [kitchens, setKitchens] = useState([]);

//   // useEffect(() => {
//   //   const fetchKitchens = async () => {
//   //     try {
//   //       const response = await getKitchens();
//   //       if (response && Array.isArray(response.data.kitchens)) {
//   //         setKitchens(response.data.kitchens);
//   //       } else {
//   //         console.error('Unexpected data format:', response);
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to fetch kitchens:', error);
//   //     }
//   //   };
  
//   //   fetchKitchens();
//   // }, []);
    
//   // const handleHideAddModal = () => setShowAddModal(false);
//   // const handleShowAddModal = () => setShowAddModal(true);

//   // const handleHideEditModal = () => setShowEditModal(false);
//   // const handleShowEditModal = () => setShowEditModal(true);

//   // const onSubmit = async (formData: Omit<Kitchen, "_id">) => {
//   //   try {
//   //     const newKitchen = await addKitchen(formData);
//   //     if (newKitchen) {
//   //       setKitchens((prevKitchens) => [...prevKitchens, newKitchen]);
//   //       setFilteredKitchens((prevFilteredKitchens) => [...prevFilteredKitchens, newKitchen]);
//   //       toast.success(`Kitchen has been added successfully.`);
//   //     } else {
//   //       toast.error("No kitchen was added.");
//   //     }
//   //     handleHideAddModal();
//   //   } catch (err) {
//   //     console.error("Failed to add kitchen:", err);
//   //     toast.error("Failed to add the kitchen.");
//   //   }
//   // };

//   // const onSearchData = (value: string) => {
//   //   if (value === "") setFilteredKitchens(kitchens);
//   //   else {
//   //     const modifiedKitchens = kitchens.filter(
//   //       (item) =>
//   //         item.f_name.toLowerCase().includes(value.toLowerCase()) ||
//   //         item.l_name.toLowerCase().includes(value.toLowerCase()) ||
//   //         item.location_id.toString().includes(value)
//   //     );
//   //     setFilteredKitchens(modifiedKitchens);
//   //   }
//   // };

//   // const handleDelete = async () => {
//   //   if (!kitchenToDelete) return;

//   //   try {
//   //     await deleteKitchen(kitchenToDelete._id);
//   //     setKitchens((prevKitchens) =>
//   //       prevKitchens.filter((kitchen) => kitchen._id !== kitchenToDelete._id)
//   //     );
//   //     setFilteredKitchens((prevFilteredKitchens) =>
//   //       prevFilteredKitchens.filter((kitchen) => kitchen._id !== kitchenToDelete._id)
//   //     );

//   //     toast.success(
//   //       `"${kitchenToDelete.f_name} ${kitchenToDelete.l_name}" has been deleted successfully.`
//   //     );
//   //   } catch (error) {
//   //     console.error("Failed to delete kitchen:", error);
//   //     toast.error("Failed to delete the kitchen.");
//   //   } finally {
//   //     setShowConfirmDelete(false);
//   //     setKitchenToDelete(null);
//   //   }
//   // };

//   // const handleDeleteClick = (kitchen: Kitchen) => {
//   //   setKitchenToDelete(kitchen);
//   //   setShowConfirmDelete(true);
//   // };

//   // const handleUpdate = async (id: string, data: Partial<Kitchen>) => {
//   //   if (!kitchenToEdit) return;

//   //   try {
//   //     const updatedKitchen = await updateKitchen(id, data);
//   //     if (updatedKitchen) {
//   //       setKitchens((prevKitchens) =>
//   //         prevKitchens.map((k) => (k._id === id ? updatedKitchen : k))
//   //       );
//   //       setFilteredKitchens((prevFilteredKitchens) =>
//   //         prevFilteredKitchens.map((k) => (k._id === id ? updatedKitchen : k))
//   //       );

//   //       toast.success(`Kitchen has been updated successfully.`);
//   //     }
//   //     setShowEditModal(false);
//   //     setCurrentKitchen(null);
//   //   } catch (error) {
//   //     console.error("Failed to update kitchen:", error);
//   //     toast.error("Failed to update the kitchen.");
//   //   }
//   // };

//   // const handleEditClick = (kitchen: Kitchen) => {
//   //   setKitchenToEdit(kitchen);
//   //   setShowConfirmEdit(true);
//   // };

//   // const confirmEdit = () => {
//   //   if (kitchenToEdit) {
//   //     setCurrentKitchen(kitchenToEdit);
//   //     handleShowEditModal();
//   //   }
//   //   setShowConfirmEdit(false);
//   // };
//   // Pagination
//   const indexOfLastKitchen = currentPage * kitchensPerPage;
//   const indexOfFirstKitchen = indexOfLastKitchen - kitchensPerPage;
//   const currentKitchens = Array.isArray(filteredKitchens) ? filteredKitchens.slice(indexOfFirstKitchen, indexOfLastKitchen) : [];
//   const totalPages = Math.ceil(filteredKitchens.length / kitchensPerPage);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <Row>
//         <Col>
//           <Card>
//             <Card.Body>
//               <Row className="justify-content-between">
//                 <Col md={8}>
//                   <form className="d-flex flex-wrap align-items-center">
//                     <label htmlFor="inputPassword2" className="visually-hidden">
//                       Search
//                     </label>
//                     <div className="me-3">
//                       <input
//                         type="search"
//                         className="form-control my-1 my-lg-0"
//                         id="inputPassword2"
//                         placeholder="Search..."
//                         onChange={(e) => onSearchData(e.target.value)}
//                       />
//                     </div>
//                     <label htmlFor="status-select" className="me-2">
//                       Sort By
//                     </label>
//                     <div className="me-sm-3">
//                       <select className="form-select my-1 my-lg-0">
//                         <option defaultValue="Select">Select</option>
//                         <option value="Date">Date</option>
//                         <option value="Name">Name</option>
//                       </select>
//                     </div>
//                   </form>
//                 </Col>
//                 <Col md={4}>
//                   <div className="text-md-end mt-3 mt-md-0">
//                     <Button
//                       variant="success"
//                       className="waves-effect waves-light me-1"
//                     >
//                       <i className="mdi mdi-cog"></i>
//                     </Button>
//                     <Button
//                       variant="danger"
//                       className="waves-effect waves-light"
//                       onClick={handleShowAddModal}
//                     >
//                       <i className="mdi mdi-plus-circle me-1"></i> Add New
//                     </Button>

//                   </div>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         {currentKitchens.map((kitchen, index) => (
//           <Col key={index} lg={4}>
//             <Card className="bg-pattern">
//               <Card.Body>
//                 <div className="product-action me-1">
//                   <Button
//                     className="btn btn-success btn-xs waves-effect waves-light"
//                     style={{ marginLeft: "350px" }}
//                     onClick={() => handleEditClick(kitchen)}
//                   >
//                     <i className="mdi mdi-pencil"></i>
//                   </Button>
//                   <Button
//                     className="btn btn-danger btn-xs waves-effect waves-light"
//                     onClick={() => handleDeleteClick(kitchen)}
//                   >
//                     <i className="mdi mdi-close"></i>
//                   </Button>
//                 </div>

//                 <div className="text-center">
//                   <img
//                     src={kitchen.image_url}
//                     alt=""
//                     className="avatar-xl rounded-circle mb-3"
//                   />
//                   <h4 className="mb-1 font-20">{`${kitchen.f_name} ${kitchen.l_name}`}</h4>
//                   <p className="font-14 text-center text-muted">
//                     {kitchen.description}
//                   </p>
//                   <p className="font-14 text-center text-muted">
//                     Location ID: {kitchen.location_id}
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//         {/* {currentKitchens.map((kitchen, index) => (
//   <Col key={index} lg={4}>
//     <Card className="bg-pattern">
//       <Card.Body>
//         <div className="product-action me-1">
//           <Button
//             className="btn btn-success btn-xs waves-effect waves-light"
//             style={{ marginLeft: "350px" }}
//             onClick={() => handleEditClick(kitchen)}
//           >
//             <i className="mdi mdi-pencil"></i>
//           </Button>
//           <Button
//             className="btn btn-danger btn-xs waves-effect waves-light"
//             onClick={() => handleDeleteClick(kitchen)}
//           >
//             <i className="mdi mdi-close"></i>
//           </Button>
//         </div>
//         <div className="text-center">
//           <img
//             src={kitchen.image_url}
//             alt={kitchen.f_name}
//             className="img-fluid mx-auto d-block"
//             style={{ height: "200px" }}
//           />
//         </div>
//         <h4 className="mt-3">
//           {kitchen.f_name || 'No First Name'} {kitchen.l_name || 'No Last Name'}
//         </h4>
//         <p>{kitchen.description || 'No Description'}</p>
//         <p>Location ID: {kitchen.location_id || 'No Location ID'}</p>
//       </Card.Body>
//     </Card>
//   </Col>
// ))} */}

//       </Row>
// <Row>
//       {/* Pagination */}
//       <div className="d-flex justify-content-end my-3">
//         <nav>
//           <ul className="pagination">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
//             </li>
//             {[...Array(totalPages)].map((_, i) => (
//               <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => paginate(i + 1)}>
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
//             </li>
//           </ul>
//         </nav>
//       </div>


// </Row>
//       {/* Modals */}
//       <AddKitchenModal
//         show={showAddModal}
//         handleClose={handleHideAddModal}
//         onSubmit={onSubmit}
//       />
// {/* 
//        <EditKitchenModal
//         show={showEditModal}
//         handleClose={handleHideEditModal}
//         kitchen={currentKitchen}
//         onUpdate={handleUpdate}
//       />  */}
//             {currentKitchen && (
//         <EditKitchenModal
//           show={showEditModal}
//           handleClose={handleHideEditModal}
//           kitchen={currentKitchen}
//           onSubmit={(id: string, data: Partial<Kitchen>) => handleUpdate(id, data)}
//         />
//       )}


//       {/* Confirm Delete Modal */}
//       <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this kitchen?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Confirm Edit Modal */}
//       <Modal show={showConfirmEdit} onHide={() => setShowConfirmEdit(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Edit</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to edit this kitchen?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmEdit(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={confirmEdit}>
//             Edit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default KitchensPage;
