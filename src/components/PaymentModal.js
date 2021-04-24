import React from 'react';

import styles from '../style/PaymentModal.module.css';

export default function PaymentModal() {
    return (
        <div className={styles.paymentModalWrapper}>
            <header>
                Pagamento para <span className={styles.userName}>Nome do Usuário</span>
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