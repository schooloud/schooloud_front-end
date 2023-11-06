<div align="center">
<img width="400" alt="스크린샷 2023-10-16 오전 1 38 58" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/483a3d9f-4b17-48ad-a596-a0d6980c6529">
</div>

## 1. 개요

> 스클라우드 : 스쿨 + 클라우드

학교 프로젝트 환경 제공용 오픈스택 기반 클라우드 인프라 제공 서비스입니다.
<br></br>

## 2. 주제

학교의 제한적인 공인 IP 에 Reverse Proxy를 사용하여 클라우드 환경을 제공함으로써 교내 학생들의 클라우드 비용 부담을 덜어주기 위한 "스클라우드" 서비스를 제안합니다.
<br></br>

## 3. GUIDES

SCHOOLOUD 프론트엔드 실행을 위한 모든 사항은 아래 문서를 참고해주세요.

<h4>License : <a href="LICENSE">MIT</a> / <a href="LICENSE.md">LICENSE</a> </h4>
<h4>Execute : <a href="EXECUTE_KO.md">How to Execute</a>
<h4>Contribute : <a href="CONTRIBUTE.md">How to Contribute</a>
<br></br>


## 4. 프로젝트 목적 및 배경

### 범사회적 클라우드 서비스의 확산과 유료화
최근 클라우드 서비스의 확산으로 다양한 연령대 사람들의 사용뿐만 아니라 여러 시스템이 클라우드로 전환되는 등 클라우드 사용이 증가하는 추세입니다. 한 대학은 구글의 클라우드 메일을 도입하여 활용하는 사례도 있었다. [[관련 기사]](https://www.hani.co.kr/arti/society/society_general/999658.html) 하지만 100TB의 용량 제한 등의 정책으로 전환되는 등 최근에는 무료 클라우드 서비스를 특히나 찾아보기 힘듭니다. 기업체들과 달리 비교적 적은 컴퓨팅 자원과 저장공간이 필요한 학생들은 이러한 적은 사용량임에도 유료 클라우드 서비스에 비용을 지불하는 것에 부담을 느끼는 것이 실정입니다.

특히 AWS의 EC2 컴퓨팅 자원을 프리 티어로 제공받는 경우, 매월 750시간의 무료 사용이 가능하나 모든 인스턴스의 이용 시간 누계로 계산되어 이를 인지하지 못하면 한 달 동안 추가로 사용한 것에 대한 비용을 자동 결제되는 등 여러 불편 사례가 있습니다.

따라서 클라우드를 활용할 여건이 안 되는 학생들에게 무료로 제공되는 클라우드는 충분히 필요할 것으로 보이며, 학생들이 안심할 수 있고 가장 접근성이 좋은 학교의 여분 자원을 클라우드로 활용하는 것을 제안합니다.

### 대학 여분 서버 환경을 가정한 클라우드 서비스 제작
컴퓨팅 자원을 확보해 둔 공공기관 중 하나인 대학은 성능 저하, 장비 노후 등의 문제로 사용하지는 않지만, 처분이 어려워 항상 남겨두고 사용하지 않는 컴퓨팅 자원이 있습니다. 또한, 소규모 동아리 등에서 제한된 인프라 자원을 갖는 경우도 있을 것입니다. 따라서 이것을 사용자에게 제공할 수 있는 클라우드 인프라로 활용하는 방안을 제안합니다.

하지만 대학이 만약 공인 아이피 개수를 1~2만 가지고 있다고 가정한다면 한정된 아이피 내에서 클라이언트들의 여러 인스턴스에 대한 접근이 서로 다른 아이피를 통해 이루어지도록 하는 것은 불가능합니다. 따라서 저희는 ssh 또는 웹으로 인스턴스에 접근할 사용자들이 각 프록시 서버로 접근했을 때 연결되는 인스턴스가 서로 다른 포트로 연결되도록 운영체제인 Linux의 네트워킹을 구현하여 제한된 아이피 개수에도 여러 인스턴스를 제공하고자 합니다.

또한 제한된 자원을 많은 수의 학생이 공유해야 하므로 학생들마다 생성 가능한 인스턴스의 개수를 제한해야 합니다. 학생인 클라이언트가 웹을 통해 자원할당을 요청하면 교수, 관리자가 이를 승인하고 학생들은 이를 이용하는 서비스를 제공하고자 합니다.
<br></br>

## 5. 기능

schooloud 서비스 사용자는 크게 3가지 역할로 분류됩니다.
학생이 프로젝트의 제안서를 작성하고, 교수 혹은 관리자가 해당 제안서를 승인하면, 학생은 프로젝트 내에서 인스턴스를 만들고 ssh 접속, 도메인 할당, 쿼터 관리, 멤버 관리 등을 할 수 있고, 관리자는 전체적인 요소를 관리하고 감독할 수 있습니다.

* 학생 : 프로젝트 제안서 작성 및 조회, 인스턴스 생성 / 중지 / 삭제 / 조회 / 도메인 할당 / ssh 접속 / 프로젝트 멤버 추가, 쿼터 변경 요청
* 교수 : 제안서 승인 / 반려 / 조회
* 관리자 : 제안서 승인 / 반려 / 조회, 쿼터 변경 요청 승인 / 반려 / 조회, 프로젝트 삭제 / 관리, 프록시 관리, 유저 관리, 전체 사용량 관리

### [학생]
> 회원가입/로그인

학생은 회원가입을 통해 서비스를 이용할 수 있습니다. 회원가입 및 로그인은 [schooloud](http://www.schooloud.cloud) 홈페이지에서 가능합니다.
<br></br>

> 프로젝트 제안서

좌측 바의 write proposal 버튼을 통해 프로젝트 제안서를 작성할 수 있습니다. 프로젝트 이름, 목적, 프로젝트 용량, 기간 등을 입력합니다.

<img width="1500" alt="writeProposal" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/195e5544-ec0b-47dc-9525-2172888060ca">

좌측 바의 Proposal 버튼을 눌렀을 때 Waiting List를 통해 아직 검토중인 제안서 목록을 확인할 수 있고, Processed List를 통해 승인 / 반려된 제안서 목록을 확인할 수 있습니다.
제안서가 검토되기 전에 삭제할 수 있습니다.
<br></br>

> 대시보드

교수 또는 관리자가 제안서를 승인하면 학생은 프로젝트를 이용할 수 있습니다.
다른 학생(사용자)를 초대할 수 있고, 프로젝트의 쿼터를 감독하고 변경 요청을 보내고 확인할 수 있습니다.

![image](https://github.com/schooloud/schooloud_back-end/assets/86493874/43e35a15-3ddc-4fa5-801e-c093d0bcac16)
<br></br>

> 인스턴스

인스턴스 생성, 중지, 재시작, 삭제할 수 있습니다. 

<img width="1440" alt="createInstance" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/4307c80d-57e7-4ff8-b577-683ba2b6f16a">

만들어진 인스턴스는 기본 정보를 조회하고 도메인 할당 후 도메인 접속 및 ssh 접속이 가능합니다.

<img width="1440" alt="instanceDomain" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/1fe5c408-42df-44e5-87b8-dff1e2fe5340">

<img width="1440" alt="domainSsh" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/d4549e91-51d9-4fc4-bd88-853033d8429b">

<img width="1438" alt="sshEntrance" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/515022f8-e861-404c-8f5f-1f48042e6596">
<br></br>

> 키페어

인스턴스 생성 시 필요한 키페어를 생성 및 삭제할 수 있습니다.

### [교수]
사전에 등록된 사용자만 교수 페이지를 이용할 수 있습니다.

> 프로젝트 제안서 승인 / 반려

학생이 제출한 제안서를 클릭하여 승인 또는 반려할 수 있습니다. 교수가 프로젝트 제안서를 승인하게 된 순간부터 학생은 프로젝트를 사용할 수 있고, 대시보드를 사용 가능합니다.

<img width="1440" alt="proposalWaitingList" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/3b7cf049-3048-4fd7-8e61-1e2dc71bcf99">
<br></br>

### [관리자]
사전에 등록된 사용자만 관리자 페이지를 이용할 수 있습니다.

> 대시보드

모든 프로젝트의 전체 용량과 사용량을 확인할 수 있고, 간략한 프로젝트 제안서 요청과 쿼터 변경 요청 리스트를 볼 수 있습니다.

<img width="1440" alt="adminDashboard" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/d1225a0f-65cd-4d03-ba3d-ec8814b16e19">
<br></br>

> 쿼터

대기 중인 쿼터 변경 요청을 승인 / 반려할 수 있고, 처리된 쿼터 변경 요청 리스트를 확인할 수 있습니다.
<br></br>

> 제안서

대기 중인 프로젝트 제안서를 승인 / 반려할 수 있고, 처리된 프로젝트 제안서를 확인할 수 있습니다.
<br></br>

> 프로젝트

각 프로젝트의 사용량, 생성 날짜, 멤버 목록 등을 확인할 수 있고 프로젝트를 삭제할 수 있습니다.


<img width="1440" alt="adminProject" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/b02a009e-9744-4f12-92f2-362cef2d9262">
<br></br>

> 프록시

SSH List에서 생성된 인스턴스 목록과 프록시 서버에 설정된 포트를 확인할 수 있습니다.
또한, Domain List에서 현재 인스턴스에 할당된 도메인 현황을 볼 수 있습니다.

<img width="1440" alt="adminProxy" src="https://github.com/schooloud/schooloud_front-end/assets/113183107/3f53c63b-da2d-4c08-8bf6-a3001d41eca7">
<br></br>

> 사용자

학생 목록과 교수 목록을 확인할 수 있습니다.
<br></br>

## 5.시스템 아키텍쳐

![image](https://github.com/schooloud/schooloud_back-end/assets/86493874/4d570787-d4f4-4d5a-969d-52793e475e4d)

![image](https://github.com/schooloud/schooloud_back-end/assets/86493874/4e9d9d07-2c07-41e4-8ee9-455c47988e42)



