import React, { useEffect } from 'react';
import { getUser, useUsersDispatch, useUsersState } from './UsersContext';

function User({ id }) { // id를 props로 받아옴
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const { loading, data: user, error } = state.user;

    useEffect(() => {
        getUser(dispatch, id);
    }, [dispatch, id]);

    if (loading) return <div>로딩중...</div> // 로딩중일때
    if (error) return <div>에러발생!</div> // 에러발생시
    if (!user) return null; // 받아온 값이 없을 시
    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email : </b> {user.email}
            </p>
        </div>
    );
}

export default User;