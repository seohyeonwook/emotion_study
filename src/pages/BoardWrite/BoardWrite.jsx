/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { QUILL_MODULES } from "../../constants/quillModules";
import { useInput, useMaxValueValidateInput } from "../../hooks/inputHook";
import { useQuillInput } from "../../hooks/quillHook";
import { useNavigate } from "react-router-dom";

const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px 120px;
    border: 1px solid #dbdbdb;
    padding: 50px 0px;
`;

const headerTitle = css`
    margin-bottom: 30px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
`;

const boardTitle = css`
    box-sizing: border-box;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #ccc;
    padding: 10px;
    width: 90%;

`;

const submitButton = css`
    box-sizing: border-box;
    margin-top: 50px;
    border: 1px solid #ccc;
    padding: 10px;
    width: 90%;
    background-color: white;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #fafafa;
    }
    &:active{
        background-color: #eee;
    }
`;

function BoardWrite() {
    // const boardIdRef = useRef(0);//객체만들기 - 버튼눌렀을때 use로시작하면 다 hook 
    // const [ board, setBoard ] = useState ({
    //     boardId: 0,
    //     boardTitle: "",
    //     boardContent: ""
    // });
    const navigate = useNavigate();
    const [ inputValue, handleInputChange ] = useMaxValueValidateInput(10);// 비구조할당 배열 1,2번 찾아서 들어오는거라서 
    const [ quillValue, handleQuillValueChange ] =useQuillInput(); //핸들러를 통해서 quillValue값 받아온다

    const boardList = useMemo(() => {
        const IsBoardList = localStorage.getItem("boardList");

        return !IsBoardList?[] : JSON.parse(IsBoardList);//localStorage에 값이 있으면 빈배열
    }, []);

    const handleSubmitClick = () => {
        const lastIndex = boardList.length -1;
        const lastId = lastIndex < 0 ? 0 : boardList[lastIndex].boardId;//boardList 제일마지막에 있는  boardId 꺼내온다
        
        const board = { // 매개변수 board 의 값 가지고온다
            boardId: lastId + 1,
            boardTitle: inputValue,
            boardContent: quillValue
        };

        const newBoardLIst = [...boardList, board];//기존 보더리스트에 board 추가해서 뉴 만든다음에
        localStorage.setItem("boardList", JSON.stringify(newBoardLIst));// 뉴를 로컬에 추가한다
        alert("글 작성 완료.");
        navigate("/board/list");
        
    }



    return (
        <div css={layout}>
            <h1 css={headerTitle}>글 작성하기</h1>
            <input 
            css={boardTitle} 
            type="text" 
            placeholder="제목을 입력하세요." 
            onChange={handleInputChange}
            value={inputValue}
            />
                <ReactQuill style ={{
                    width: "90%",
                    height: "400px"
                }} 
                modules ={QUILL_MODULES}
                onChange={handleQuillValueChange}
            />
            <button css={submitButton} onClick={handleSubmitClick} >작성하기</button>
        </div>
    );
}

export default BoardWrite;