import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const initialState = { // 초기상태 정의
    users: { // API 요청으로 받아온 값을 이곳에 넣어줌
        loading: false,
        data: null,
        error: null,
    },
    user: {
        laoding: false,
        data: null,
        error: null,
    }
}

const loadingState = {
    loading: true,
    data: null,
    error: null,
};

const success = (data) => ({
    loading: false,
    data,
    error: null,
})

const error = e => ({
    loading: false,
    data: null,
    error: e
});

// reducer 사용시 6개의 action을 사용할 것암
// GET_USERS 여러명의 유저를 가지고옴
// GET_USERS_SUCCESS 여러명의 유저를 가지고옴
// GET_USERS_ERROR 여러명의 유저를 가지고옴
// GET_USERS 특정 유저를 가지고옴
// GET_USERS_SUCCESS 특정 유저를 가지고옴
// GET_USERS_ERROR 특정 유저를 가지고옴

function usersReducer(state, action) { // 6가지 액션에 대한 상태를 바꿔주는 reducer
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: loadingState,
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: success(action.data)
            };
        case 'GET_USERS_ERROR':
            return {
                ...state,
                users: error(action.error)
            };
        case 'GET_USER':
            return {
                ...state,
                user: loadingState,
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: success(action.data)
            };
        case 'GET_USER_ERROR':
            return {
                ...state,
                user: error(action.error)
            };
        default:
            throw new Error('Unhandled action tyle', action.type);
    }
}

const UsersStateContext = createContext(null); // 상태를 위한 Context
const UsersDispatchContext = createContext(null); // Dispatch를 위한 Context

export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext value={dispatch}>
                {children}
            </UsersDispatchContext>
        </UsersStateContext.Provider>
    )
}

export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) {
        throw new Error('Cannot find UserProvider');
    }
    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find UserProvider');
    }
    return dispatch;
}

export async function getUsers(dispatch) {
    dispatch({ type: 'GET_USERS' });
    try {
        const response = await axios.get('http://jsonplaceholder.typicode.com/users');
        dispatch({
            type: 'GET_USERS_SUCCESS',
            data: response.loadingState
        });
    } catch (e) {
        dispatch({
            type: 'GET_USERS_ERROR',
            error: e,
        });
    }
}

export async function getUser(dispatch, id) {
    dispatch({ type: 'GET_USER' });
    try {
        const response = await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`);
        dispatch({
            type: 'GET_USER_SUCCESS',
            data: response.loadingState
        });
    } catch (e) {
        dispatch({
            type: 'GET_USER_ERROR',
            error: e,
        });
    }
}