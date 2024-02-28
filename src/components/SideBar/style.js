import { css } from "@emotion/react";

 export const layout = (isShow) => css`// layout을 함수로 만들어서 호출하면 리턴값으로 css값을주면 된다 함수라는말은 매개변수 받으수있다
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: ${isShow ? "0px" : "-300px"};// 그럼 표현식으로 만들어주자
    z-index: 2;
    border-right: 1px solid #dbdbdd;
    width: 300px;
    height: 100%;
    transition: left 0.5s ease-in-out;
    box-shadow: 1px 0px 3px #00000022;
    background-color: white
    ;
`; //``안은 다 문자 안

export const toggleButton = css`
    box-sizing: border-box;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: -15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: 1px solid #dbdbdb;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 15px;
    height: 50px;
    background-color: white;
    cursor: pointer;
    &:hover{
        background-color: #eee;
    }
    &:active{
        background-color: #ccc;
    }
`;

export const menuList = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0px;


`;

export const menuItem = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    height: 50px;

    color: black;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    &:nth-of-type(1){
        border-top: 1px solid #dbdbdb;
    }
    &:hover {
        background-color: #eee;
    }
    &:active{
        background-color: #dbdbdb;
    }

`;