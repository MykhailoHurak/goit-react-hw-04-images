// import { Component } from 'react';
import { useState } from 'react';

import { VscSearch } from 'react-icons/vsc';
import './Searchbar.css';

// Hooks ==========================================================================

export default function Searchbar({ onSubmitSearchbar }) {

    const [imageNameInput, setImageNameInput] = useState('');
    
    const handleInput = event => {
        setImageNameInput(event.currentTarget.value.toLowerCase());
    };
    
    const handleSubmit = event => {
        event.preventDefault();

        if (imageNameInput.trim() === '') {
            alert("The field must not be empty");
            return;
        }

        onSubmitSearchbar(imageNameInput);
        setImageNameInput('');
    };

    return (
        <header className='Searchbar'>

            <form
                onSubmit={handleSubmit}
                className='SearchForm'>

                <button type="submit" className='SearchForm_button'>
                    <VscSearch size="24" className='SearchForm__VscSearch' />
                </button>
                    
                <input
                    onChange={handleInput}
                    value={imageNameInput}
                    className='SearchForm_input'
                    type="text"
                    placeholder="Search images and photos"
                />
            </form>

        </header>
    );
};

// Live Cycles ====================================================================

// export default class OldSearchbar extends Component {

//     state = {
//         imageNameInput: ''
//     };

//     handleInput = event => {
//         this.setState({ imageNameInput: event.currentTarget.value.toLowerCase() });
//     };

//     handleSubmit = event => {
//         event.preventDefault();

//         if (this.state.imageNameInput.trim() === '') {
//             alert("The field must not be empty");
//             return;
//         }

//         this.props.onSubmitSearchbar(this.state.imageNameInput);
//         this.setState({ imageNameInput: '' });
//     };

//     render() {
//         return (
//             <header className='Searchbar'>

//                 <form
//                     onSubmit={this.handleSubmit}
//                     className='SearchForm'>

//                     <button type="submit" className='SearchForm_button'>
//                         <VscSearch size="24" className='SearchForm__VscSearch' />
//                     </button>
                    
//                     <input
//                         onChange={this.handleInput}
//                         value={this.state.imageNameInput}
//                         className='SearchForm_input'
//                         type="text"
//                         placeholder="Search images and photos"
//                     />
//                 </form>

//             </header>
//         );
//     };
// };