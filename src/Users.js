import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

// LOADING, SUCCESS, ERROR 액션 관리
function reducer(state, action) { // useReducer함수 생성
    switch (action.type) { // 각각의 케이스를 추가
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Users() {
    const [state, dispatch] = useReducer(reducer, { // 초깃값 설정
        loading: false, // 로딩 기본 값 설정
        data: null, // 데이터 기본 값 설정
        error: null, // 에러 기본 값 설정
    });

    const fetchUsers = async () => { // 버튼 클릭시 재 호출되도록 useEffect 밖으로 빼냄
        dispatch({ type: 'LOADING' }); // 요청 시작시
        try { // try catch문을 사용하여 axios를 요청한 후 코드를 실행함
            const response = await axios.get(
                'http://jsonplaceholder.typicode.com/users'
            ); // 서버 주소를 불러옴
            dispatch({ type: 'SUCCESS', data: response.data }); // 요청 성공시
        } catch (e) { // 에러발생시 실행되는 코드
            dispatch({ type: 'ERROR', error: e });
        }
    };

    useEffect(() => { // 컴포넌트가 처음 렌더링될때 발생함 
        fetchUsers(); // 함수 호출
    }, []);

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
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
}

export default Users;