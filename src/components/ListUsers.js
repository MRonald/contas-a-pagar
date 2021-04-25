import React, { useEffect, useState } from 'react';
import axios from 'axios';

import User from './User';

import styles from '../style/ListUsers.module.css';

export default function ListUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce').then(
            response => setUsers(response.data)
        );
    }, []);

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
                            />
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
