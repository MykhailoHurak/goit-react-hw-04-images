// import { Component } from 'react';
import { useState, useEffect } from 'react';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import ButtonLoadMore from 'components/ButtonLoadMore';

// Hooks ==========================================================================

export default function App() {

    const [imageNameSubmit, setImageNameSubmit] = useState('');
    const [imagesFromAPI, setImagesFromAPI] = useState([]);
    const [largeImage, setLargeImage] = useState('');
    const [status, setStatus] = useState('idle');
    const [pageNumber, setPageNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    
    useEffect(() => {
        if (!imageNameSubmit) {
           return;
        };

        if (pageNumber === 1) {
            setStatus('pending');
        }
       
        fetch(`https://pixabay.com/api/?q=${imageNameSubmit}&page=${pageNumber}&key=30230359-119840990de5f9a29673d5f1e&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error', response.status);
            })
            .then(data => {
                const images = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));
                if (images.length === 0) {
                    setStatus('rejected')
                } else {
                    setImagesFromAPI(img => [...img, ...images]);
                    setStatus('resolved');
                    setIsLoadMore(false);
                }
            }).catch(error => error.message);
    }, [imageNameSubmit, pageNumber]);

    const handleSubmitSearchbar = (imageNameSubmit) => {
        setImageNameSubmit(imageNameSubmit);
        setPageNumber(1);
        setImagesFromAPI([]);
    };

    const handleClickGalleryItem = (img) => {
        setLargeImage(img);
        setShowModal(true);
    };
    
    const toggleModal = () => {
        setShowModal(!showModal);
        setLargeImage('');
    };

    const handleButtonLoadMore = () => {
        setPageNumber(pageNumber + 1);
        setIsLoadMore(true);
    };

    return (
        <>
            <Searchbar
                onSubmitSearchbar={handleSubmitSearchbar}
            />

            {status === 'resolved' && (
                <ImageGallery
                    imagesFromAPI={imagesFromAPI}
                    onImageClick={handleClickGalleryItem}
                />
            )}
                
            {status === 'resolved' && (
                <ButtonLoadMore
                    onClickButtonLoadMore={handleButtonLoadMore}
                    onStatusButtonLoadMore={isLoadMore}
                />
            )}

            {showModal && (
                <Modal onCloseModal={toggleModal}>
                    <img src={largeImage} alt="" />
                </Modal>
            )}

            {status === 'idle' && (
                <h1
                    style={{
                        textAlign: "center",
                        color: "orangered",
                    }}
                >
                    Please, enter images or photos name
                </h1>
            )}
                
            {status === 'pending' && <Loader />}

            {status === 'rejected' && (
                <h1
                    style={{
                        textAlign: "center",
                        color: "orangered",
                    }}
                >
                    ❌ Oops... We did not find a picture
                </h1>
            )};
        </>
    );
};

// Live Cycles ====================================================================

// export default class App extends Component {

//     state = {
//         imageNameSubmit: '',
//         imagesFromAPI: [],
//         largeImage: '',
//         status: 'idle', // 'pending', 'resolved', 'rejected'
//         pageNumber: 1,
//         showModal: false,
//         isLoadMore: false,
//     };

//     async componentDidUpdate(_, prevState) {
//         if (prevState.imageNameSubmit !== this.state.imageNameSubmit || prevState.pageNumber !== this.state.pageNumber) {
//             try {
//                 if (this.state.pageNumber === 1) {
//                     this.setState({ status: 'pending' });
//                 }
            
//                 const fetchResponse = await fetch(`https://pixabay.com/api/?q=${this.state.imageNameSubmit}&page=${this.state.pageNumber}&key=30230359-119840990de5f9a29673d5f1e&image_type=photo&orientation=horizontal&per_page=12`);
//                 const imagesData = await fetchResponse.json();
//                 const imagesList = imagesData.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));

//                 if (imagesList.length === 0) {
//                     this.setState({ status: 'rejected' });
//                 } else {
//                     this.setState(
//                         {
//                             imagesFromAPI: [...this.state.imagesFromAPI, ...imagesList],
//                             status: 'resolved',
//                             isLoadMore: false,
//                         });
                    
//                 }
//             } catch (error) {
//                 alert(error);
//             }
//         }
//     }

//     handleSubmitSearchbar = (imageNameSubmit) => {
//         this.setState({
//             imageNameSubmit: imageNameSubmit,
//             pageNumber: 1,
//             imagesFromAPI: [],
//         });
//     };

//     handleClickGalleryItem = img => {
//         this.setState({
//             largeImage: img,
//             showModal: true,
//         });
//     };

//     toggleModal = () => {
//         this.setState({
//             showModal: !this.state.showModal,
//             largeImage: ''
//         })
//     };

//     handleButtonLoadMore = () => {
//         this.setState(prevState => ({
//             pageNumber: prevState.pageNumber + 1,
//             isLoadMore: true,
//         }));
//     }

//     render() {
        
//         const {
//             handleSubmitSearchbar,
//             handleClickGalleryItem,
//             handleButtonLoadMore,
//             toggleModal
//         } = this;

//         const { 
//             status,
//             imagesFromAPI,
//             isLoadMore,
//             showModal,
//             largeImage
//         } = this.state;

//         return (
//             <>
//                 <Searchbar
//                     onSubmitSearchbar={handleSubmitSearchbar}
//                 />

//                 {status === 'resolved' && (
//                     <ImageGallery
//                         imagesFromAPI={imagesFromAPI}
//                         onImageClick={handleClickGalleryItem}
//                     />
//                 )}
                
//                 {status === 'resolved' && (
//                     <ButtonLoadMore
//                         onClickButtonLoadMore={handleButtonLoadMore}
//                         onStatusButtonLoadMore={isLoadMore}
//                     />
//                 )}

//                 {showModal && (
//                     <Modal onCloseModal={toggleModal}>
//                         <img src={largeImage} alt="" />
//                     </Modal>
//                 )}

//                 {status === 'idle' && (
//                     <h1
//                         style={{
//                             textAlign: "center",
//                             color: "orangered",
//                         }}
//                     >
//                         Please, enter images or photos name
//                     </h1>
//                 )}
                
//                 {status === 'pending' && <Loader />}

//                 {status === 'rejected' && (
//                     <h1
//                         style={{
//                             textAlign: "center",
//                             color: "orangered",
//                         }}
//                     >
//                         ❌ Oops... We did not find a picture
//                     </h1>
//                 )};
//             </>
//         );
//     };
// };