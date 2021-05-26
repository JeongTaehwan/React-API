import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers() { // useAsync를 사용할 때 callback으로 넣어줄 함수
    const response = await axios.get('http://jsonplaceholder.typicode.com/users');
    return response.data;
}
function Users() {
    const [state, refetch] = useAsync(getUsers, [], true); // true값을 넣어줌으로서 컴포넌트가 처음 렌더링될때 하는 요청을 생략해줌
    const [userId, setUserId] = useState(null); // id라는 값을 상태로 관리해줌
    const { loading, data: users, error } = state; // 비구조화 할당을 사용하여 state에서 loading,data,error 밖으로 꺼내옴 data값에 users를 넣음
    if (loading) return <div>로딩중...</div> // 로딩중일때
    if (error) return <div>에러발생!</div> // 에러발생시
    if (!users) return <button onClick={refetch}>불러오기</button>; // user값이 유효하지 않은 값이라면 버튼을 보여주고 클릭시 refetch가 실행되게 함

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => setUserId(user.id)}> {/* 클릭시 setUserId를 통해 id값을 바꿈*/}

                        {user.username}
            ({user.name})
                    </li>))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            { userId && <User id={userId} />}  {/* userId가 유효할 때에만 User 컴포넌트를 보여주게함 */}
        </>
    );
}
// 결론 : 반복적인 코드는 Hook을 만들어서 사용하는 게 좋다

export default Users;