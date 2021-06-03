import React, { createContext, useReducer, useContext } from 'react';

const initialState = { // 기본상태 정의
    user: { // API 요청으로 받아온 값을 이곳에 넣어줌
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

const loadingState = { //
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
                users: error(action.error);
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
                user: error(action.error);
            };
        default:
            throw new Error('Unhandled action tyle', action.type);
    }
}