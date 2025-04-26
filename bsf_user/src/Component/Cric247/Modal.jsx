import React from "react";

const defaultIsSmallScreen = window.matchMedia("(max-width: 700px)").matches ? true : false;

function Modal({ children, onClose, isSmallScreen = defaultIsSmallScreen, showCloseButton, noTopPadding }) {

  return (
    <div style={styles.overlay}>
      <div style={{ paddingTop: noTopPadding ? "0px" : "10%", width: "100%" }}>
        <div style={{...styles.modal, width: isSmallScreen ? "100%" : "50%"}}>
          {children}
          {showCloseButton && <button style={styles.closeButton} onClick={onClose}>
            Cancel
          </button>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    zIndex: 99999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "0px",
    borderRadius: "8px",
    position: "relative",
    height: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    // maxWidth: "300px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "900",
    cursor: "pointer",
    border: "none",
    color: "#fd5c63",
    padding: "5px 10px",
    borderRadius: "4px"
  }
};

export default Modal;
