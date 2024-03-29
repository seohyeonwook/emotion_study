// 렌더링 순서 index. html먼저 렌더링 된다 
// 모두 함수로 관리하겠다 = 그래서 함수 알아야함
// index.js 에서 root 에 렌더링 시킨다 순서를 잘 파악하자 흐름을
// 함수 다 함수다 다 ~  함수 사용이유 1. 기능들 끼리 묶어서 이름지어준다 (함수정의) 2.재사용 (함수로 빼서 호출해서 사용하겠다)
/**
 *  함수를 쓸줄 알아야해 정의도 할줄 알아야하고 
 * 함수는 두가지만 알면된다. 입력과 출력. 매개변수와 리턴만 알면된다
 *  응집도는 높이고 결합도는 낮춰야한다 그래야 객체지향언어
 * 컴포넌트는 대문자로 시작해야한다 index.js에서 확인 
 * 컴포넌트는 html(jsx)태그를 리턴한다 무조건
 * 
 * 근데 컴포넌트는 프롭스로 매개변수를 넘겨줘야한다 
 * index.js in <ComponentStudy a={10} b={20} />
 * 
 * 
 * const props = {
 *  a:10,
 *  b:20
 * } 이거랑 위에랑 같다  프롭스는 객체니까 비구조할당으로 가능
 * 
 * const { a, b} ={ 이렇게 비구조로 넣으면 된다
 *  a: 10,
 *  b: 20
 * }
 *
 * 
 *  a//그럼 . 안찍고 이렇게비구조로 호출하면 된다 그럼 밑에서도
 * 
 *  function ComponentStudy(props) 이게아니라
 *  function ComponentStudy({a , b}) //비구조를 매개변수로 받음
 *  그러면 return <div>{props.a} ////{props.b}</div> 에서도
 *  return <div>{a} ////{b}</div> 이렇게 가능
 * 
 * use써가지고 리턴된 애들이 hook함수다
 * 
 * 호출부분을 찾아보자
 * 
 * 
 */



function ComponentStudy(props) {//그래서 이렇게 props로 넘겨주고 태그에서 표현식으로 꺼내쓸수 있음
    // 여기안에서 
    // 상태관리 useState
    // 마운트관리 useEffect -> useMemo, useCallBack
    //
    
    
    return <div>{props.a} ////{props.b}</div>// 리턴되기전에 함수안에서 코드 짤수있다
   
}

export default ComponentStudy;



