import React from "react";
import "../styles/Modal.css";

const FeatureUnderDevelopmentModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>안내</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="info-message">
            <svg 
              viewBox="0 0 24 24" 
              width="48" 
              height="48"
              style={{ margin: "0 auto 20px", display: "block" }}
            >
              <path
                d="M13 16h-2v-6h2v6zm0-8h-2V6h2v2zm-1-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="#4a6fa5"
              />
            </svg>
            <p className="info-text">현재 이 기능은 준비 중입니다.</p>
            <p className="info-subtext">빠른 시일 내에 서비스를 제공해 드리겠습니다.</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureUnderDevelopmentModal;