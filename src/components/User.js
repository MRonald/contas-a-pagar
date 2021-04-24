import React from 'react';

import styles from '../style/User.module.css';

export default function User() {
    return (
        <div className={styles.userWrapper}>
            <div className={styles.heroUser}>
                <div className={styles.imgWrapper}>
                    <img src="https://github.com/MRonald.png" alt="Icon User"/>
                </div>
                <div className={styles.infoUser}>
                    <div>Nome de usuário</div>
                    <div>ID: X - Username: @usuarioX</div>
                </div>
            </div>
            <button>Pagar</button>
        </div>
    );
}