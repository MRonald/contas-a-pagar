import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../style/ListUsers.module.css';

import User from './User';
import PaymentModal from './PaymentModal';

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);
    const [userSelected, setUserSelected] = useState();

    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce').then(
            response => setUsers(response.data)
            );
    }, []);

    function openPaymentModal(user) {
        setUserSelected(user);
        setIsOpenPaymentModal(true);
    }

    function closePaymentModal() {
        setIsOpenPaymentModal(false);
    }

    return (
        <div>
            <ul className={styles.listUsers}>
                {users.map(
                    user => (
                        <li key={user.id}>
                            <User
                                srcImg={user.img}
                                name={user.name}
                                id={user.id}
                                userName={user.username}
                                viewPaymentModal={openPaymentModal}
                            />
                        </li>
                    )
                )}
            </ul>
            {isOpenPaymentModal && <PaymentModal user={userSelected} functionCloseModal={closePaymentModal} />}
        </div>
    );
}
