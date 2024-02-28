/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid"

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imageLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;

// 코드가 순서대로 적히지 않는 이유 = 정의가 위에 있어야 실행을했을때 실행이 된다 그러니까 동작보다 정의가 이미 있어야 동작했을때
// 동작이 된다 모든 코드는 그렇게 작성한다고 생각하고 보자
function ImageEx2() {
    const uploadFilesId = useRef(0);//*** 1 => 하고 dom에서 imgFileRef.current.click()}>이미지 불러오기
    // 객체 가져올때 무조건 useRef사용 document.qu랑 비슷하다 생각하자
    // 상태가 변하지 않게 하려고 => 고정된다
    //인덱스는 0
    const [ oldFiles, setOldFiles ] = useState([]);//set은 비동기 // State 사용이유  oldFiles가 바뀌면 재렌더링 하려고
    //배열로 초기화 되어있다 -> 여러개의 값이 들어갈거다
    const [ newFiles, setNewFiles ] = useState([]);
    // set 이바뀌면 new가바뀐다
    const imgFileRef = useRef();
    // 

    useEffect(() => {
        setOldFiles(!localStorage.getItem("oldFiles") ? [] : JSON.parse(localStorage.getItem("oldFiles")));
    }, []);
    //[상태]가 바뀔때 위에있는 setOldFiles 코드를 실행하겠다 순서지정 위에 useState일어나
    

    const handleFileChange = (e) => { //핸들 함수 2개가 있구나 하고넘겨야함 그다음에 jsx구조를 먼저봐야함 //****2
        console.log(e.target.files);
        //files 는 반복돌려야해서 Array로 바꿔주자
        // 원래는 file List
        //콘솔로 찍어보는 습관들이자- > 이게 뭔지 알아야지
        const loadFiles = Array.from(e.target.files);
        //file 알아보기

        if(loadFiles.length === 0) {  //****3 */
            imgFileRef.current.value = "";
            return;
        }
        

        const uploadFiles = loadFiles.map(file => {
            //file하나씩 꺼내서 객체로 바꾸겠다
            // map이랑 filter잘 써야함
            //map- -함수호출 -치환하는 거 ex>동그라미 3개있으면 네모안에 동그라미3개로 바꾸는거 값들을 활용을해서 바꿔주는것
            // map(매개변수-함수정의만 들어올수있음) 함수정의=> {} 함수호출 => () 배열 => []
            // 매개변수 하나면 () 생략가능 => (file)-> file
            // 스프레드 는 배열[]과 객체{} 두가지 객체는 값을 덮어쓴다(맨마지막꺼로 바꾼다 키값은 중복 x) ex a= {id :1} b= {id :2} 이러면 a.id는 1 b.id는 2
            // 배열은 키값이 없어 나열이잖아
            return {// return에 치환 어떻게 할것인가 공식 적어줌
                id: uploadFilesId.current += 1,
                Percent: 0,
                originFile: file,
                url: ""
            };
        });

        uploadFilesId.current = 0;

        let promises = []; 

        promises = uploadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                resolve(e.target.result);
            }

            fileReader.readAsDataURL(file.originFile);
        }));

        Promise.all(promises)
        .then(result => {
            setNewFiles(result.map((dataUrl, index) => {
                return {
                    ...uploadFiles[index],
                    preview: dataUrl
                };
            }));
        });        
    }

    const handleImageUpload = () => {
        const promises = newFiles.map(file => new Promise(resolve => {
            const storageRef = ref(storage, `files/test/${uuid()}_${file.originFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file.originFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setNewFiles(newFiles.map(sFile => {
                        return sFile.id !== file.id ? sFile : {
                            ...sFile, 
                            percent: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        }
                    }));
                },
                (error) => {},
                () => {
                    getDownloadURL(storageRef).then(url => {
                        const newFile = {
                            ...file,
                            ["url"]: url
                        }
                        resolve(newFile);
                    })
                }
            );
        }));

        Promise.all(promises)
        .then((newFile) => {
            setOldFiles(newFile);
            localStorage.setItem("oldFiles", JSON.stringify(newFile));
        }).then(() => {
            setNewFiles([]);
        });
    }

    return (// jsx구조 하나는 올드 하나는 뉴에서 맵을 돌린다 
        <div css={layout}>
            {oldFiles?.map(file => 
                <div key={file.id} css={imageLayout}>
                    <img src={file.url} alt="" />
                    {/* alt = 이미지 못불어왔을때 이름만 뜨게 해주느거 */}
                </div>
            )}
            {newFiles?.map(file => 
                <>
                    <div key={file.id} css={imageLayout}>
                        <img src={file.preview} alt="" />
                    </div>
                    <Line percent={file.percent} strokeWidth={4} strokeColor={"#dbdbdb"}/>
                </>
            )}
            
            <input style={{display: "none"}} type="file" multiple={true} ref={imgFileRef} onChange={handleFileChange}/>
            {/* 인풋하면 인풋 값이 바뀌니까  handleFileChange로 가봐야함*/}
            {/* 인풋은 정보 담는곳이다 그러니까 ref */}
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            {/* imgRef */}
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx2;
// 코드 해석하는법
/**
 * 
 */