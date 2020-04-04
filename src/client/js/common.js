/**
 *=========================[  ]=========================
 * @파일명:common.js
 * @작성일자:2020-04-04 오후 10:05
 * @작성자:Yunwoo Kim
 * @설명: 공통 함수 모음
 * @변경이력:
 *===================[ Thing-Project ]===================
 */

export function submitPhoneNumberAuth(firebase, phoneNum) {
    const appVerifier = window.recaptchaVerifier;
    firebase
        .auth()
        .signInWithPhoneNumber(phoneNum, appVerifier)
        .then(function (confirmationResult) {
            window.confirmResult = confirmationResult;
            return window
        })
        .catch(function (error) {
            console.log("______--ERROR--__" + error);
        });
}

export async function submitPhoneNumberAuthCode(codeNum) {
    let done = false;
    if (window.confirmResult != null) {
        await window.confirmResult
            .confirm(codeNum)
            .then(function (result) {
                done = true;
            })
            .catch(function (error) {
                alert("You have entered a wrong code")
                console.log("Verify Failed : " + error);
            });
    } else {
        console.log("메세지 전송 실패");
    }
    return done
}

export function submitModalPhoneNumberAuthCode(codeNum) {
    if (window.confirmResult != null) {
        window.confirmResult
            .confirm(codeNum)
            .then(function (result) {
                alert("aa")
                // setModalVerified(true)
            })
            .catch(function (error) {
                alert("You have entered a wrong code")
                console.log("Verify Failed : " + error);
            });
    } else {
        console.log("메세지 전송 실패");
    }
}