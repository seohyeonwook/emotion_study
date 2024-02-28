import { useMemo } from "react";

export function useLoadList() {
    const boardList = useMemo(() => {
        const IsBoardList = localStorage.getItem("boardList");
        return !IsBoardList?[] : JSON.parse(IsBoardList);//localStorage에 값이 있으면 빈배열
    }, []);

    const lastIndex = boardList.length -1;
    const firstId = lastIndex < 0 ? 0 : boardList[0].boardId;
    const lastId = lastIndex < 0 ? 0 : boardList[lastIndex].boardId;
    const size = boardList.length;

    return { boardList, size, firstId, lastId };// 객체로 만들때 변수만 만들어주면 키/ 밸류
}