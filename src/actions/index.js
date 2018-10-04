import axios from 'axios';
export const LOGIN_USER = 'LOGIN_USER';
export const CREATE_USER = 'CREATE_USER';
export const FETCH_USER = 'FETCH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function logoutUser(){
  const request = axios({
    withCredentials: true,
  method: 'get',
  url: 'http://localhost:8080/auth/logout'
  });
  return{
    type: LOGOUT_USER,
    payload: request
  }
}

export function createUser(props) {
  const request = axios({
    withCredentials: true,
  method: 'post',
  url: 'http://localhost:8080/auth/register',
  data: props
  });

  return{
    type: CREATE_USER,
    payload: request
  }
}

export function loginUser(props) {
  const request = axios({
    withCredentials: true,
  method: 'post',
  url: 'http://localhost:8080/auth/login',
  data: props
  });

  return{
    type: LOGIN_USER,
    payload: request
  }
}

export function fetchUser(){
  const request = axios({
    withCredentials: true,
  method: 'get',
  url: 'http://localhost:8080/auth/user'
  });

  return{
    type: FETCH_USER,
    payload: request
  }
}
