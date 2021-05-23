import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState(null); // 결과물을 불러옴 기본값은 null
    const [loading, setLoading] = useState(false); // api의 요청여부를 알려줌
    const [error, setError] = useState(null); // error가 발생할때 사용

    const fetchUsers = async () => { // 버튼 클릭시 재 호출되도록 useEffect 밖으로 빼냄
        try { // try catch문을 사용하여 axios를 요청한 후 코드를 실행함
            setUsers(null); // 값 초기화
            setError(null); // 값 초기화
            setLoading(true); // 로딩이 시작됬다 라는것을 의마함
            const response = await axios.get(
                'http://jsonplaceholder.typicode.com/users'
            ); // 서버 주소를 불러옴
            setUsers(response.data); // 응답의 결과값을 보기 위한 것
        } catch (e) { // 에러발생시 실행되는 코드
            setError(e);
        }
        setLoading(false); // 로딩이 끝났다는 것을 알림
    };

    useEffect(() => { // 컴포넌트가 처음 렌더링될때 발생함 
        fetchUsers(); // 함수 호출
    }, []);

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
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
}

export default Users;