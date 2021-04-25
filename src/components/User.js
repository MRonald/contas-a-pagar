import React, { useState } from 'react';

import styles from '../style/User.module.css';

import PaymentModal from './PaymentModal';

export default function User(props) {
    const [makePayment, setMakePayment] = useState(false);

    function toogleMakePayment() {
        setMakePayment(!makePayment);
    }

    return (
        <div className={styles.userWrapper}>
            <div className={styles.heroUser}>
                <div className={styles.imgWrapper}>
                    <img src={props.srcImg} alt="Icon User"/>
                </div>
                <div className={styles.infoUser}>
                    <div>{props.name}</div>
                    <div>ID: {props.id} - Username: {props.userName}</div>
                </div>
            </div>
            <button onClick={toogleMakePayment}>Pagar</button>
            {makePayment && <PaymentModal user={props} closeModal={toogleMakePayment} />}
        </div>
    );
}