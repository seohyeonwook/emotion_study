/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    overflow: hidden;

    & > img {
        width: 100%;
    }

`;

function ImageEx3() {
    const uploadFilesId = useRef(0);
    const imgFileRef = useRef();

    const [ oldFiles, setOldfiles ] = useState([]);
    const [ newFiles, setNewfiles ] = useState([]);

    useEffect

    return (
        <div css={layout}>
            <div css={imgLayout}>
                <img src="" alt="" />
            </div>
            <input type="file" style={{display: "none"}} multiple={true} />
            <button>불러오기</button>
        </div>
    );
}

export default ImageEx3;