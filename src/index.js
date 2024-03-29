import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';// 중괄호 있으면 디폴트 없다 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ComponestStudy /> // 이건 함수명이다 그래서 함수를 만들어줘야 여기서 import할수있다 -> Study.jsx가기
  

  <BrowserRouter>
    <App />
  </BrowserRouter>// 이게 있어야 라우터가 실행됨 
  // 새프로젝트 생성 시 라우터 재설치
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
