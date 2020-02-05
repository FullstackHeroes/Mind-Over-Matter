const Modal = props => {
  const { handleClose, show, children } = this.props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassname}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

// import React, { Component } from "react";

// class PopUp extends React.Component {
//   render() {
//     return (
//       <div className="popup">
//         <div className="popup\_inner">
//           <h1>{this.props.text}</h1>
//           <button onClick={this.props.closePopup}>close me</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default PopUp;
