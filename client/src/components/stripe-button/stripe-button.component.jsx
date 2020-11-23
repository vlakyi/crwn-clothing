import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Modal from '../modal/modal.component';
import useModal from '../../hooks/useModal/useModal';

const StripeCheckoutButton = ({ price }) => {
    // Modal config
    const [modalState, dispatchModal] = useModal();
    const { isDisplay, isSuccess, modalHeader, modalText, buttonText } = modalState;

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HbTj5LwL05sOU5NX1aSwhfgOEfKnbxfbyPoAqTZ1N5UO2vRAODLyipOiwyG7ND4kQG13F5lJAqlkVQcWhPUUuGM00Ekb8Tj2D';

    const onToken = token => {
        // using axios instead of native fetch
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
            .then(response => {
                dispatchModal({
                    type: 'openModal', payload: {
                        isSuccess: true,
                        modalHeader: 'Payment Successful',
                        modalText: 'Thank you for the order :)',
                        buttonText: 'CLOSE'
                    }
                });
            })
            .catch(error => {
                console.log('Payment error: ', JSON.parse(error));
                dispatchModal({
                    type: 'openModal', payload: {
                        modalHeader: 'Payment error',
                        modalText: 'There was an issue with your payment. Please make sure you use the provided credit card.',
                        buttonText: 'OK'
                    }
                });
            });
    }

    return (
        <>
            <StripeCheckout
                label="Pay Now"
                name="CRWN Clothing Ltd."
                billingAddress
                shippingAddress
                image='https://svgshare.com/i/CUz.svg'
                description={`Your total is $${price}`}
                amount={priceForStripe}
                panelLabel='Pay Now'
                token={onToken}
                stripeKey={publishableKey}
            />
            {isDisplay && <Modal closeModal={() => dispatchModal({ type: 'closeModal' })} modalHeader={modalHeader} modalText={modalText} buttonText={buttonText} isSuccess={isSuccess} />}
        </>
    );
};

export default StripeCheckoutButton;