import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
    const response = await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`); // id값을 받아옴
    return response.data;
}

function User({ id }) { // id를 props로 받아옴
    const [state] = useAsync(() => getUser(id), [id]); // refetch가 필요 없으므로 state만 불러왔고, useAsync 함수에서 현재 props로 가져온 id를 넣게 해주었고, 디펜던시 부분에 id를 넣어줌.
    // 즉 id값이 바뀔때마다 함수를 호출하겠다는 것을 의미함
    const { loading, data: user, error } = state;

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