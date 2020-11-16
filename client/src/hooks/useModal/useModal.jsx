import { useReducer } from 'react'

const initialModalState = {
    isSuccess: false,
    modalHeader: '',
    modalText: '',
    buttonText: '',
    isDisplay: false
};

const modalReducer = (state, action) => {
    switch (action.type) {
        case 'openModal':
            return { ...state, isDisplay: true, ...action.payload };
        case 'closeModal': {
            return { ...initialModalState }
        }
        default:
            return state;
    }
}

const useModal = () => {
    const [modalState, dispatchModal] = useReducer(modalReducer, initialModalState);
    return [modalState, dispatchModal];
}

export default useModal;
