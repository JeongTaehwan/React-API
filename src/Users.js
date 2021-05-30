import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

async function getUsers() { // useAsync를 사용할 때 callback으로 넣어줄 함수
    const response = await axios.get('http://jsonplaceholder.typicode.com/users');
    return response.data;
};

function Users() {
    const [userId, setUserId] = useState(null); // id라는 값을 상태로 관리해줌
    const { data: users, error, isLoading, reload, run } = useAsync({
        deferFn: getUsers // 처음에 로딩이 안되게 하는것 deferFn
    });
    if (isLoading) return <div>로딩중...</div> // 로딩중일때
    if (error) return <div>에러발생!</div> // 에러발생시
    if (!users) return <button onClick={run}>불러오기</button>; // user값이 유효하지 않은 값이라면 버튼을 보여주고 클릭시 refetch가 실행되게 함

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => setUserId(user.id)} > {/* 클릭시 setUserId를 통해 id값을 바꿈*/}

                        {user.username}
            ({user.name})
                    </li>))}
            </ul>
            <button onClick={reload}>다시 불러오기</button>
            { userId && <User id={userId} />}  {/* userId가 유효할 때에만 User 컴포넌트를 보여주게함 */}
        </>
    );
}
// 결론 : 반복적인 코드는 Hook을 만들어서 사용하는 게 좋다

export default Users;