/**
 *===================[  ]===================
 * @파일명:FirstComponent.js
 * @작성일자:2020-05-18 오전 10:25
 * @작성자:Yunwoo Kim
 * @설명: 두번째 페이지 (사용방법 설명)
 * @변경이력:유튜브 링크 삽입
 *===================[ Thing-Project ]===================
 */
import React from "react";
import "../../css/thirdComponent.css"
import "../../css/semantic-ui.scss"
import adpic from "../../img/ad/adsize.png"
import jenny from "../../img/semantic/jenny.jpg"
import molly from "../../img/semantic/molly.png"
import elliot from "../../img/semantic/elliot.jpg"
import { Card, Feed, Container, Header } from "semantic-ui-react"

function ThirdComponent() {
    function adClick(e){
        e.preventDefault()
        window.open('/#/adsurvey','','width=505,height=540,left=400,top=200')
        // alert('담당자      : 김윤우\n' +
        //     '전화번호   : 010-3700-4972\n' +
        //     '메일주소   : ywpartner@naver.com')
    }

    return (
        <div className="component third-component">
            <h2>About Us</h2>
            <br/>
            <div>
                <Card centered >
                    <Card.Content>
                        <Card.Header>나를 좋아하는 사람 목록</Card.Header>
                    </Card.Content>
                    <Card.Content className={'third_feed'}>
                        <Feed size={'small'} >
                            <Feed.Event>
                                <Feed.Label image={jenny} />
                                <Feed.Content >
                                    <Feed.Date content='1 day ago' />
                                    <Feed.Summary>
                                        같은 반에 있는 <a>정빛나</a>님이 당신을 좋아합니다.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image={molly} />
                                <Feed.Content>
                                    <Feed.Date content='3 days ago' />
                                    <Feed.Summary>
                                        학원에서 만난 <a>한사랑</a>님이 가까워지길 원해요!
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image={elliot} />
                                <Feed.Content>
                                    <Feed.Date content='4 days ago' />
                                    <Feed.Summary>
                                        <a>김가람</a>님이 깊은 인연을 쌓고싶어합니다!
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Card>
                <br/>
                <Container fluid>
                    <Header color={'pink'} as='h3'>익명성을 보장한 마음 확인</Header>
                    <p>
                        짝사랑을 하거나 썸을 타본적이 있으신가요? <br/>
                        대부분의 사람들이 ‘상대방의 마음을 알 수 없어서’ <br/>
                        혹은 ‘확신이 없어서’ 쉽게 마음을 전달하지 못합니다.
                    </p>
                    <p>
                        ‘상대방의 마음을 미리 알 수 있다면 얼마나 좋을까?’<br/>
                        라는 생각에서 출발한 저희 서비스는 <br/>
                        상대방이 좋아하는 사람이 내가 아니라면 <br/>
                        조금 더 기다리거나 더 어필할 수 있도록,<br/>
                        그 사람이 나라면 망설이지 않고 <br/>
                        고백할 수 있게 도와드립니다!
                    </p>
                </Container>
            </div>
        </div>
    );
};

export default React.memo(ThirdComponent)