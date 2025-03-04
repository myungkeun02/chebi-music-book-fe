import React from "react";
import "../styles/Modal.css";

const ConfirmDeleteModal = ({ songTitle, onClose, onConfirm }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>노래 삭제</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="confirmation-message">
            <svg 
              viewBox="0 0 24 24" 
              width="48" 
              height="48"
              style={{ margin: "0 auto 20px", display: "block" }}
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                fill="#e74c3c"
              />
            </svg>
            <p className="confirmation-text">
              정말 "{songTitle}" 노래를 삭제하시겠습니까?
            </p>
            <p className="confirmation-subtext">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;