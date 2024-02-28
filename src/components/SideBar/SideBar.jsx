//이모션 사용방법
/** @jsxImportSource @emotion/react */
import *as S from "./style";
import { DiApple } from "react-icons/di";
import { AiFillAndroid } from "react-icons/ai";


import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/menu";


function SideBar() {

    const[ isShow, setShow ] = useState(false);

    return (
        <aside css={S.layout(isShow)}>
            {/* css쓰기위해서는 @jsx */}
            <button css={S.toggleButton} onClick={() => setShow(!isShow)} >
                {isShow ?<DiApple /> : <AiFillAndroid />}
                </button>
                <ul css={S.menuList}>
                    {MENUS.map(menu => 
                    <Link css={S.menuItem}to={menu.path} key={menu.id} onClick={() => setShow(false)}>
                        <li>{menu.name}</li></Link>)}
                </ul>
        </aside>
    );
}

export default SideBar;

