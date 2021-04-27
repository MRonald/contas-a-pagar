import React from 'react';

import styles from '../style/User.module.css';

export default function User(props) {
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
            <button onClick={() => props.viewPaymentModal(props)}>Pagar</button>
        </div>
    );
}
