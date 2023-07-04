import React  from 'react'
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmation = ({showConfirmation , setShowConfirmation , handleCommentConfirmation}) => {
  return (
    <div>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
          <p>متأكد انك عاوز تمسح الكومنت؟؟؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCommentConfirmation}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteConfirmation