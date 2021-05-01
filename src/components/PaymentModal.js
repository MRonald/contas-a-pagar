import React, { useState } from 'react';
import axios from 'axios';

import styles from '../style/PaymentModal.module.css';

export default function PaymentModal(props) {
    const [makePayment, setMakePayment] = useState(false);
    const [successPayment, setSuccessPayment] = useState(false);

    const cards = [
        // valid card
        {
            id: 0,
            card_number: '1111111111111111',
            cvv: 789,
            expiry_date: '01/18',
        },
        // invalid card
        {
            id: 1,
            card_number: '4111111111111234',
            cvv: 123,
            expiry_date: '01/20',
        },
    ];

    function maskValue(valueInput) {
        valueInput = parseInt(valueInput.replace(/\D/g, '')).toString();
        let valueFormatted = '';
        if (valueInput === '0' || valueInput === 'NaN') {
            valueFormatted = '';
        } else if (valueInput.length === 1) {
            valueFormatted += '00' + valueInput;
        } else if (valueInput.length === 2) {
            valueFormatted += '0' + valueInput;
        } else {
            valueFormatted = valueInput;
        }
        if (valueFormatted.length > 0) {
            const lastTwo = valueFormatted.substr(-2);
            valueFormatted = valueFormatted.substr(0, valueFormatted.length - 2) + ',' + lastTwo;
            let integerNumber = valueFormatted.substr(0, valueFormatted.indexOf(','));
            let indexDot = integerNumber.length - 3;
            while (indexDot > 0) {
                const initialPart = integerNumber.substr(indexDot, integerNumber.length);
                const finalPart = integerNumber.substr(0, indexDot);
                integerNumber = finalPart + '.' + initialPart;
                valueFormatted = integerNumber + ',' + lastTwo;
                indexDot -= 3;
            }
            valueFormatted = 'R$ ' + valueFormatted;
        }
        return valueFormatted;
    }

    function validateForm() {
        const inputValuePayment = document.getElementById('valuePayment');
        const valueInputEmpty = document.getElementById('valueInputEmpty');
        const idSelectedCard = document.getElementById('idSelectedCard');
        if (inputValuePayment.value === "") {
            valueInputEmpty.style.display = 'block';
            inputValuePayment.style.border = '1px solid red';
        } else {
            valueInputEmpty.style.display = 'none';
            inputValuePayment.style.border = '1px solid gray';
            processPayment(cards[idSelectedCard.value], props.user.id, inputValuePayment.value);
        }
    }

    function processPayment(selectedCard, destinationUserId, value) {
        const buttonPay = document.getElementById('buttonPay');
        const imgLoading = document.getElementById('imgLoading');
        buttonPay.style.display = 'none';
        imgLoading.style.display = 'block';
        if (selectedCard.id !== cards.length - 1) {
            axios.post("https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989", {
                "card_number": selectedCard.card_number,
                "cvv": selectedCard.cvv,
                "expiry_date": selectedCard.expiry_date,
                "destination_user_id": destinationUserId,
                "value": value
            }).then(
                response => {
                    if (response.data.success) {
                        setSuccessPayment(true);
                    } else {
                        setSuccessPayment(false);
                    }
                    toggleMakePayment();
                }
            ).catch(
                () => {
                    setSuccessPayment(false);
                    toggleMakePayment();
                }
            );
        } else {
            setSuccessPayment(false);
            toggleMakePayment();
        }
    }

    function toggleMakePayment() {
        setMakePayment(!makePayment);
    }

    return (
        <div className={styles.paymentModalWrapper}>
            {!makePayment ? (
                <>
                    <header>
                        <span>
                            Pagamento para <span className={styles.userName}>{props.user.name}</span>
                        </span>
                        <span className={styles.btnCloseModal} onClick={props.functionCloseModal}>X</span>
                    </header>
                    <main>
                        <input
                            type="text"
                            placeholder="R$ 0,00"
                            onChange={(e) => e.target.value = maskValue(e.target.value)}
                            maxLength="30"
                            id="valuePayment"
                            autoComplete="off"
                        />
                        <p
                            className={styles.valueInputEmpty}
                            id="valueInputEmpty"
                        >
                            Preencha este campo
                        </p>
                        <select id="idSelectedCard">
                            {cards.map(
                                card => (
                                    <option value={card.id} key={card.id}>
                                        Cartão com o final {card.card_number.substr(-4)}
                                    </option>
                                )
                            )}
                        </select>
                        <button onClick={validateForm} id="buttonPay">Pagar</button>
                        <img
                            src="imgs/loading.gif"
                            alt="loading"
                            id="imgLoading"
                            className={styles.imgLoading}
                        />
                    </main>
                </>
            ) : (
                <>
                    <header>
                        <span>Recibo de pagamento</span>
                        <span className={styles.btnCloseModal} onClick={props.functionCloseModal}>X</span>
                    </header>
                    <main>
                        <div className={styles.resultPayload}>
                            {successPayment ? (
                                <>O pagamento foi concluído com sucesso.</>
                            ) : (
                                <>O pagamento <span className={styles.bold}>não</span> foi concluído com sucesso.</>
                            )}
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}
