# mongoose CreateConnection 에 대한 리서치

## 이유

createConnection의 남발
결과 : connection수가 무수히 늘어나서 atlas 서버가 터지는것을 경험
createconnection의 사용 이유와
어떻게 해결할지
등 리서치


## 설명


createConnection은 db를 여러개 연결할때 사용합니다.

추측이지만 mongoose는 singleTone 패턴으로 작성된거같다는생각입니다.

하나의 db를 연결하면 (connect로) 또다른 몽고디비 를 사용하려면 createConnection을 사용해야한다.

connection 개수로 판단하여 신규 connection을 늘리지않게끔 유도하여 사용해보려고 했습니다.

여러개의 connection으로 db를 왔다갔다 사용하기위한 populate 옵션도 있으니 참고..


//

일단 단일 connect인데 굳이 createConnection을 사용하려고한 이유

(어처피 추후 IOC패턴이든 아니든 DB를 두개 연결해서 사용해야하는 프로젝트가 있음 (API로 대체할 수도 있지만..) 물론 연결성이 높아져서 비추천)


mongoose 순수 기능으로 단일 db 사용이라면 connect로도 충분하다.


억지로라도 createConnection을 유지하고싶다면 위와 같은 패턴으로 작성하면 될 꺼같다.

첫째로 Circular 라는 뭔가 순환될꺼같은 connection이 default 로 하나 항상 가지고있다는점을 잊으면 안된다.

처음에 연결이 없는 상태일때 왜 connection이 있지? 라는 생각이 드는데

뭔가 순환자가 있는느낌이다. 정확한것은 리서치해봐도 내용이 전혀 없다 ..


그래서 처음에 if 문 안에서 ===0 이나 !으로 undefined일때잡아내거나 해서 처리해보았으나

circular는 순환자라서 model을 리턴하더라도 무한루프에 걸리는거같다. 즉 connection으로써의 역할을 하지못한다.

우리한텐 native connection이 필요하다. 때문에 1보다 작꺼나 같을때 createConnection 되게끔하면 된다.

두번째로 else로 걸러낼때 connections[0]이 추가될때 1이아닌 0이 native 라는점을 참고하자.

이러면 딱하나의 connection으로 잘 이용할 수 있다.

이것을 응용해서

connection을 반환해주는 connectionFactory 형태로 구현할 수 있겠다. (솔찍히 함수로만들면 IOC패턴이라는데..)

IOC는 종속성이 거꾸로 되는 방식인데 설명하면 좀 길고..

원래 주체가 아래로 흐르던것을 관점을 뒤집어서 생각해서 플로우가 반대로 간다고 생각하면된다.


너무 추상적인가.. (자세한건 찾아보세요!)
강의는 많은데 대부분 자바 ;



일단.

fast나 slow등 내용이 있는것을 볼수있는데

즉 모델하나 연결하면 빠르고

여러개 연결하면 느리다. 인거같다.

이걸 빠르게 하려면

모델당 하나씩 어뎁터형식으로 만들어야하는데 비효율 적일꺼같다.. 파일수도 많아지고 유지 보수 차원에서 더 극혐


slow가 얼마나 느릴지 확인해보고

createConnection 방식말고도 좀더 connect 원조 방식으로 해보고 싶지만

이상하게.. 이런길로 가고싶단 말이지 ..

끝