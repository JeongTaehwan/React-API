import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() { // useAsync를 사용할 때 callback으로 넣어줄 함수
    const response = await axios.get('http://jsonplaceholder.typicode.com/users');
    return response.data;
}
function Users() {
    const [state, refetch] = useAsync(getUsers, []);

    const { loading, data: users, error } = state; // 비구조화 할당을 사용하여 state에서 loading,data,error 밖으로 꺼내옴 data값에 users를 넣음
    if (loading) return <div>로딩중...</div> // 로딩중일때
    if (error) return <div>에러발생!</div> // 에러발생시
    if (!users) return null; // user값이 유효하지 않은 값이라면

    return (
        <>
            <ul>
                {users.map(user => <li key={user.id}>
                    {user.username}
            ({user.name})
        </li>)}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
        </>
    );
}

export default Users;