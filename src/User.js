import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

async function getUser({ id }) { // 객체 형태로 받아와 비구조화 할당을 해줄거기 때문에 중괄호로 감쌈
    const response = await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`); // id값을 받아옴
    return response.data;
}

function User({ id }) { // id를 props로 받아옴
    const { // 전체적으로 객체로 가져올거임
        data: user,
        error,
        isLoading
    } = useAsync({
        promiseFn: getUser, // 프로미스를 반환하는 함수를 promiseFn에 넣어줌
        id,
        watch: id, // 컴포넌트가 처음 렌더링 될땐 getUser에 아이디를 넣어 호출함. 그러나 만약 나중에 아이디가 바뀌면 다시 이것을 호출하겠다는 의미
    }); // refetch가 필요 없으므로 state만 불러왔고, useAsync 함수에서 현재 props로 가져온 id를 넣게 해주었고, 디펜던시 부분에 id를 넣어줌.
    // 즉 id값이 바뀔때마다 함수를 호출하겠다는 것을 의미함

    if (isLoading) return <div>로딩중...</div> // 로딩중일때
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