function waitOneSecond(msg) {
    return new Promise((res, _) => {
        setTimeout(() => {
            res(msg);
        }, 1000);
    });
}

async function countOneToTen() {
    for (let x of [...Array(10).keys()]) {
        let result = await waitOneSecond(`${x + 1}초 대기 중 ...`);
        console.log(result);
    }
    console.log('완료');
}

countOneToTen();

// 요거는 x 쏵다 넘겨서 setTimeOut이 10번 실행됨 그리고 1초뒤에 모두 출력 되는 코드임
// async function countOneToTen() {
//     for (let x of [...Array(10).keys()]) {
//         setTimeout(() => console.log(`${x + 1}초 대기 중...`), 1000);
//         // console.log();
//     }
//     console.log('완료');
// }
