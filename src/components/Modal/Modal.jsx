// import { Component } from 'react';
import { useEffect } from 'react';

import { createPortal } from 'react-dom';
import './Modal.css';

const rootModal = document.querySelector('#root-modal');

// Hooks ==========================================================================

export default function Modal ({ onCloseModal,children }) {

    useEffect(() => {

        const handleCloseModalEscape = event => {
            if (event.code === 'Escape') {
                onCloseModal();
            }
        };
        
        window.addEventListener('keydown', handleCloseModalEscape)
        
        return () => {
            window.removeEventListener('keydown', handleCloseModalEscape)
        };
    });

    const handleCloseModalBackdrop = event => {
        if (event.currentTarget === event.target) {
            onCloseModal();
        }
    };
 
    return createPortal (
        <div className="Overlay" onClick={handleCloseModalBackdrop}>
            <div className="Modal">
                {children}
            </div>
        </div>,
        rootModal,
    );
};

// Live Cycles ====================================================================

// export default class OldModal extends Component {

//     componentDidMount() {
//         console.log('Modal componentDidMount');
//         window.addEventListener('keydown', this.handleCloseModalEscape);
//     };

//     componentWillUnmount() {
//         console.log('Modal componentWillUnmount');
//         window.removeEventListener('keydown', this.handleCloseModalEscape);
//     };

//     handleCloseModalEscape = event => {
//         if (event.code === 'Escape') {
//             this.props.onCloseModal();
//         }
//     };

//     handleCloseModalBackdrop = event => {
//         if (event.currentTarget === event.target) {
//             this.props.onCloseModal();
//         }
//     };

//     render() {
        
//         return createPortal (
//             <div className="Overlay" onClick={this.handleCloseModalBackdrop}>
//                 <div className="Modal">
//                     {this.props.children}
//                 </div>
//             </div>,
//             rootModal,
//         );
//     };
// };