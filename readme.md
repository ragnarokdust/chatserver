# chatserver
## app.js
```javascript
var app = require('express')();
```
 + `app.[METHOD]([PATH], [HANDLER])`
 + app은 express의 인스턴스입니다
 + 메소드는 HTTP 요청 메소드로 GET,  POST, PUT, DELETE가 있습니다.
 + `require()`은 node.js에서 모듈을 불러오기 위해 쓰는 함수입니다.
```javascript
var server = require('http').createServer(app); 
``` 
 + `app`모듈을 `createServer()`에 넣어준다
 + `app`모듈이  `createServer()`의 콜백 함수 역할을 한다  \
```javascript
var io = require('socket.io')(server);
```
 +  Socket.io 서버 생성
 + `var Server = require('socket.io')` 
 `var io = new Server(httpServer);`를 축약 한것
```javascript
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
```
 + `app.get('/', function(req, res){ . . . }`
    +  get - 미들웨어 함수가 적용되는 http 메소드
    +  '/' - 미들웨어 함수가 적용되는 경로(*라우트*)
    +  req - 미들웨어 함수에 대한 Http **요청** 인수.
    +  res - 미들웨어 함수에 대한 Http **응답** 인수.
 + res.sendFile(__dirname + '/index.html') : index.html파일을 화면에 출력.
```javascript
io.on('connection', function(socket) {
  socket.on('chat', function(data) {
    var msg = {
      name : data.name,
      msg: data.msg
    };
```
 + `io`와 `socket`을 연결하고 name과 msg를 띄워줍니다.
```javascript
    socket.emit("chat",msg);
  });
```
 + 전송 개념
```javascript
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })
```
 + `forceDisconnect` 이벤트 발생 (**수신**)

```javascript
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
```
 + `disconnect` 이벤트 발생 (**수신**)
```javascript
server.listen(30000, function() {
  console.log('Socket IO server listening on port 30000');
});
```
 + 서버가 대기하는 포트를 30000  으로 설정
## package-lock.json
>### package-lock.json 이란?
>>package-lock.json은 npm을 사용하여 package.json 파일을 또는 node_modules 트리를 수정하면 **자동으로 생성되는 파일**이다.   한마디로 파일이 생성되는 시점의 의존성 트리에 대한 정보를 가지고 있다. 그렇다면 package-lock.json 파일이 꼭 필요한 이유는 무엇인지 아래에서 더 살펴보자. package.json 파일의 의존성 선언에는 version range가 사용되는데, 이는 **특정 버전이 아니라 버전의 범위를 의미**한다. 예를들어 보자면, npm i express를 실행하게 되면 package.json 파일에는 “^4.16.3”(Caret Ranges)로 버전 범위가 추가된다. 이 package.json 를 기반으로 npm i을 실행하면 현재는 4.16.3 버전이 설치 되지만 새로이 express의 마이너 패치가 이루어진 버전이 퍼블리시 되어있다면 동일한 package.json파일로 npm i을 실행해도 4.16.4, 이나 4.17.1 같은 다른 버전이 설치될 수 있는 것이다. 간혹 업데이트된 버전이 오류를 발생시키는 경우가 있기 때문에 **안정성을 위해 package-lock.json**은 매우 중요하다.
>### 요약
>>1. package-lock.json 파일은 의존성 ___트리에 대한 정보___ 를 가지고 있으며, 작성된 시점의 의존성 트리가 다시 생성될 수 있도록 보장해준다.
>>2. package-lock.json 파일은 저장소에 꼭 같이 ___커밋___ 해야 한다.
>>3. package-lock.json 파일은 node_modules 없이 배포하는 경우 반드시 필요하다.
## package.json
+ **package.json** : 패키지에 관한 정보와 의존중인 버전에 관한 정보를 담고 있습니다. 자세한 내용은 [npm](https://docs.npmjs.com/misc/config)에서..
+ **속성 표**

    | 속성 | 설명 | 예시 |
    |:---:|---|---|
    |`name`|프로젝트 이름|"chatserver"
    |`version`| 현재 생성하는 npm 파일의 버전. 이전에 따로 배포하는 등의 작업이 없었고, 처음이라면 그대로 엔터를 누른다(1.0.0)으로 설정|"1.0.0"
    |`description`| 수행할 작업에 대해 작성|
    |`main`|  ___패키지의 메인 파일이 뭔지를 작성___.|"index.js"|
    |`scripts`| 여러가지 ___npm 명령어를 알려줌___. npm ___start___ 하면 ___node server/index.js___라는 명령어가 실행되고, preinstall은 누군가가 이 패키지를 install했을 때 설치하기 전에 하는 행동을 말합니다. 비슷한 것으로 postinstall(설치한 후의 동작)이 있습니다. publish, uninstall, start, restart, test, version 등이 있습니다. 모두 pre나 post를 붙일 수 있습니다. 임의로 자기가 script를 만들어도 됩니다. scripts에 build라는 명령어를 만들었으면 npm run build하면 해당 명령어가 실행됩니다. | { 하위 속성 작성 }|
    |npm 명령어 `test`| echo \"Error: no test specified\" && exit 1, 이것 외에도 `publish`, `uninstall`, `start`, `restart`, `version` 등 있음. |"echo \"Error: no test specified\" && exit 1"|
    |`keywords`| 이러한 프로젝트를 찾고자하는 사람들에게 유용하게 쓰인다. (ex) "file", "d3" |  [ ]|
    |`author`| 개인이나 팀이름, 또는 회사이름 등 다양하게 작성하면 된다 | 
    |`license`|  ___라이센스에 대한 내용을 명시___ 한다. 여기에서는 기본적으로 MIT를 설정.| "ISC"|
    |`dependencies`| dependencies는 일반적인 경우 ___의존하고 있다는 것을 알려주는 곳___.|{ 하위 속성 작성 }|
    |dependencies 하위 속성  `express`| express 버전|"4.17.1"|
    |dependencies 하위 속성  `socket.io`| socket.io 버전|"2.2.0"|
  


    
