// // LoaderModal.tsx
// import React from 'react';
// import { Modal, Spinner } from 'react-bootstrap';

// interface LoaderModalProps {
//   show: boolean;
// }

// const LoaderModal: React.FC<LoaderModalProps> = ({ show }) => {
//   return (
//     <Modal show={show} centered>
//       <Modal.Body className="text-center">
//         <Spinner animation="border" />
//         <p>Loading...</p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default LoaderModal;
// LoaderModal.tsx
// import React from 'react';
// import { Modal, Spinner } from 'react-bootstrap';
// import './LoaderModal.css'; // Import the CSS file for custom styles

// interface LoaderModalProps {
//   show: boolean;
// }

// const LoaderModal: React.FC<LoaderModalProps> = ({ show }) => {
//   return (
//     <Modal show={show} centered className="loader-modal">
//       <Modal.Body className="text-center">
//         <Spinner className="loader-spinner" animation="border" variant="primary" />
//         <p className="loader-text">Please wait...</p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default LoaderModal;
import React from 'react';
import { Modal } from 'react-bootstrap';
import './LoaderModal.css'; // Import the updated CSS file for custom styles

interface LoaderModalProps {
  show: boolean;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ show }) => {
  return (
    <Modal show={show} centered className="loader-modal">
      <Modal.Body className="text-center">
        <div className="loader-spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="loader-text">Please wait...</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoaderModal;
