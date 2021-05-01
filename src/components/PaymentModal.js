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

    return (
        <div className={styles.paymentModalWrapper}>
            <header>
                <span>
                    Pagamento para <span className={styles.userName}>{props.user.name}</span>
                </span>
                <span className={styles.btnCloseModal} onClick={props.functionCloseModal}>X</span>
            </header>
            <main>
                <input type="text" placeholder="R$ 0,00"/>
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
