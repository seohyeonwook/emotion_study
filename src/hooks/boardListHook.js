import { useMemo } from "react";

export function useLoadList() {

    const boardList = useMemo(() => {
        const lsBoardList = localStorage.getItem("boardList");
        return !lsBoardList?[] : JSON.parse(lsBoardList);//localStorage에 값이 있으면 빈배열
    }, []);

    const lastIndex = boardList.length -1;
    const firstId = lastIndex < 0 ? 0 : boardList[0].boardId;
    const lastId = lastIndex < 0 ? 0 : boardList[lastIndex].boardId;
    const size = boardList.length;

    return { boardList, size, firstId, lastId };// 객체로 만들때 변수만 만들어주면 키/ 밸류
}

export function useLoadListRyPageNumber(page) {// 스트링이라서 아래에서 int형으로 바꿔줘야함
    const pageNumber = parseInt(page);

    const loadBoardList = useMemo(() => {
        const lsBoardList = localStorage.getItem("boardList");
        const loadBoardList = !lsBoardList ? [] : JSON.parse(lsBoardList);
        return loadBoardList
    }, [page]);// pageNumber가 바꼇을때만 새로 렌더링해라

    const boardList = loadBoardList.filter((board,index) => index > (pageNumber * 10) - 11 && index < pageNumber * 10);

    const size = loadBoardList.length;

    const totalpageCount = Math.floor(size % 10 === 0 ? size / 10 : (size / 10) + 1);
    const startPageNumber = pageNumber % 5 === 0? pageNumber -4 : (pageNumber - (pageNumber % 5)) + 1 
    const endPageNumber = startPageNumber + 4 <= totalpageCount ? startPageNumber +4 : totalpageCount; 
    
    let pageNumbers = useMemo (() => {
        let newPageNumbers = [];

        for(let i = startPageNumber; i <= endPageNumber; i++) {
            newPageNumbers = [...newPageNumbers, i];
        }

        return newPageNumbers;
    }, [startPageNumber]);



    return { boardList, size, pageNumbers, totalpageCount, startPageNumber };// 객체로 만들때 변수만 만들어주면 키/ 밸류
}

