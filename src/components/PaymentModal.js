import React from 'react';

import styles from '../style/PaymentModal.module.css';

export default function PaymentModal(props) {
    return (
        <div className={styles.paymentModalWrapper}>
            <header>
                <span>
                    Pagamento para <span className={styles.userName}>{props.user.name}</span>
                </span>
                <span className={styles.btnCloseModal} onClick={props.closeModal}>X</span>
            </header>
            <main>
                <input type="text"/>
                <select>
                    <option>Cartão com o final 0123</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <button>Pagar</button>
            </main>
        </div>
    );
}