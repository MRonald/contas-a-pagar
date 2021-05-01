import React from 'react';

import styles from '../style/PaymentModal.module.css';

export default function PaymentModal(props) {
    const cards = [
        // valid card
        {
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
        },
        // invalid card
        {
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

    return (
        <div className={styles.paymentModalWrapper}>
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
                />
                <select>
                    {cards.map(
                        card => (
                            <option>
                                Cartão com o final {card.card_number.substr(-4)}
                            </option>
                        )
                    )}
                </select>
                <button>Pagar</button>
            </main>
        </div>
    );
}
