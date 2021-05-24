import React, { useReducer, useEffect, useCallback } from 'react';

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
            throw new Error(`Unhandled action type: ${action.type}`); // 오류 발생시 나올 안내문
    }
}

function useAsync(callback, deps = []) { // custom hook 생성, callback은 우리가 API를 호출하는 함수를 넣음, deps는 나중에 useEffect를 사용하여 컴포넌트가 로딩되거나 값이 변경됬을때 API를 재 요청할때 useEffect의 두번째 파라미터에 넣을 deps를 그대로 받아와서 사용
    const [state, dispatch] = useReducer(reducer, { // useReducer를 사용
        loading: false,
        data: null,
        error: null,
    });

    const fetchData = useCallback(async () => { // useCallback을 사용하여 fetchData를 재사용 가능하게 만듬
        dispatch({ type: 'LOADING' }); // 로딩중일때
        try {
            const data = await callback();
            dispatch({ type: 'SUCCESS', data }); // 성공했을때
        } catch (e) {
            dispatch({ type: 'ERROR', error: e }); // 에러가 발생했을때
        }
    }, [callback]);

    useEffect(() => {
        fetchData();
    }, deps);

    return [state, fetchData]; // state로 현재 상태 값을 가져올 수 있고, fetchData로는 특정 요청을 다시 시작하는 함수를 받아와서 사용할 수 있음
}

export default useAsync;