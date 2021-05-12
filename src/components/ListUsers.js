import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from '../style/ListUsers.module.css';

import User from './User';
import PaymentModal from './PaymentModal';

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    const [viewUsers, setViewUsers] = useState([]);
    const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);
    const [userSelected, setUserSelected] = useState();
    const [hasMoreScroll, setHasMoreScroll] = useState(true);

    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce').then(
            response => {
                setUsers(response.data);
                setViewUsers(response.data.filter(
                    user => parseInt(user.id) < 1010
                ));
            }
        );
    }, []);

    function openPaymentModal(user) {
        setUserSelected(user);
        setIsOpenPaymentModal(true);
    }

    function closePaymentModal() {
        setIsOpenPaymentModal(false);
    }

    function moreUsers() {
        setTimeout(() => {
            setViewUsers(viewUsers.concat(
                users.filter(
                    user => {
                        if ((parseInt(user.id) > viewUsers.length + 1000) &&
                            (parseInt(user.id) <= viewUsers.length + 1000 + 5)) {
                            if (parseInt(user.id) === users.length + 1000) {
                                setHasMoreScroll(false);
                            }
                            return true;
                        } else {
                            return false;
                        }
                    }
                )
            ));
        }, 1500);
    }

    return (
        <div>
            <ul className={styles.listUsers}>
                <InfiniteScroll
                    dataLength={viewUsers.length}
                    next={moreUsers}
                    hasMore={hasMoreScroll}
                    loader={
                        <div className={styles.loadingMainWrapper}>
                            <img
                                src="imgs/loading-main.gif"
                                alt="loading"
                                className={styles.loadingMain}
                            />
                        </div>
                    }
                >
                    {viewUsers.map(
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
                </InfiniteScroll>
            </ul>
            {isOpenPaymentModal && <PaymentModal user={userSelected} functionCloseModal={closePaymentModal} />}
        </div>
    );
}
