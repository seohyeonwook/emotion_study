/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
`;

const headerTitle = css`
    margin-bottom: 30px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
`;


const boardListHead = css`
   border: 1px solid #dbdbdb;
   width: 900px;
`;

function BoardList() {
    return (
        <div css={layout}>
            <h1 css={headerTitle}>게시글 목록</h1>
            <ul>
                <Link to={"/board/1"}>
                    {/* 1 = id */}
                    <li>
                        
                    </li>
                </Link> 
            </ul>
        </div>
    );
}

export default BoardList;