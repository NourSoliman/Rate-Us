import React from 'react'
import { Modal, Button } from 'react-bootstrap';
function SolvedCaseConfirmation({showSolvedConfirmation , setShowSolvedConfirmation , handleSolvedCaseConfirmation }) {
  return (
    <div>
            <Modal show={showSolvedConfirmation} onHide={() => setShowSolvedConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Solved Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to mark this comment as a Solved Case? This action cannot be undone.</p>
          <p>لو غيرت الحاله ل قضيه محلوله لا يمكنك التراجع فى هذا التغيير</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSolvedCaseConfirmation}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => setShowSolvedConfirmation(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SolvedCaseConfirmation