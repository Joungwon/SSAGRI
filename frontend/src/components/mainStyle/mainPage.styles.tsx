import { styled, keyframes } from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import Matter, {
  World,
  Engine,
  Render,
  Bodies,
  Mouse,
  MouseConstraint,
  Runner
} from 'matter-js';
import { useNavigate } from 'react-router-dom';

// 메인페이지 구성 컴포넌트

const MainPage = styled.div`
  width: 100%;
  height: 100%;
  font-family: var(--font-Pretendard);
`;

const Scrollbar = styled.div`
  position: absolute;
  margin: 90vh 25vw;
  width: 50vw;
  height: 6px;
  border-radius: 1px;
  z-index: 20;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 6px;
    background: linear-gradient(
      90deg,
      transparent,
      rgb(73, 147, 250, 0.2),
      transparent
    );
    top: 0;
  }

  &::before {
    left: -10px;
    animation: wave-animation 2s linear infinite;
  }

  &::after {
    left: 10px;
    animation: wave-animation 2s linear infinite reverse;
  }

  @keyframes wave-animation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(20px);
    }
  }
`;

const Scroller = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(23, 206, 219, 1);
  background: #f94c10;
  clip-path: polygon(0% 0%, 10px 0%, 10px 100%, 0% 100%);
  transition: all 0.2s;
`;

const ScrollTagDiv = styled.div`
  display: flex;
  position: absolute;
  top: -25px;
  color: rgb(0, 0, 0, 0.5);
`;

// 스크롤 게이지바
const ScrollTag = (scrollposition) => {
  const scrollContainer: HTMLElement | null =
    document.querySelector('.page-container');
  // 클릭시 해당 위치로 이동로직
  const handleHomeClick = () => {
    if (scrollContainer) {
      scrollContainer.scrollLeft = 0;
      scrollposition.current = 0;
    }
  };

  const handleTradeClick = () => {
    if (scrollContainer) {
      scrollContainer.scrollLeft = 4300;
      scrollposition.current = 3;
    }
  };
  const handleAuctionClick = () => {
    if (scrollContainer) {
      scrollContainer.scrollLeft = 7000;
      scrollposition.current = 4;
    }
  };
  const handleCommuClick = () => {
    if (scrollContainer) {
      scrollContainer.scrollLeft = 9150;
      scrollposition.current = 5;
    }
  };
  const handleServeClick = () => {
    if (scrollContainer) {
      scrollContainer.scrollLeft = 11000;
      scrollposition.current = 6;
    }
  };
  return (
    <ScrollTagDiv>
      <span
        style={{
          marginRight: '130px',
          color:
            scrollposition.scrollposition === 1
              ? '#f94c10'
              : 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={handleHomeClick}
      >
        Home
      </span>
      <span
        style={{
          marginRight: '110px',
          width: '50px',
          color:
            scrollposition.scrollposition === 2
              ? '#f94c10'
              : 'rgba(0, 0, 0, 0.5)'
        }}
      >
        about
      </span>
      <span
        style={{
          marginRight: '100px',
          width: '100px',

          color:
            scrollposition.scrollposition === 3
              ? '#f94c10'
              : 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={handleTradeClick}
      >
        중고거래
      </span>
      <span
        style={{
          marginRight: '105px',
          width: '70px',
          color:
            scrollposition.scrollposition === 4
              ? '#f94c10'
              : 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={handleAuctionClick}
      >
        경매
      </span>
      <span
        style={{
          marginRight: '95px',
          width: '100px',
          color:
            scrollposition.scrollposition === 5
              ? '#f94c10'
              : 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={handleCommuClick}
      >
        커뮤니티
      </span>
      <span
        style={{
          color:
            scrollposition.scrollposition === 6
              ? '#f94c10'
              : 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={handleServeClick}
      >
        Service
      </span>
    </ScrollTagDiv>
  );
};

const Page = styled.div`
  display: flex;
  overflow: hidden;
`;
const PagesSection1 = styled.section`
  min-width: 130vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  font-size: 4ch;
`;
const PagesSection2 = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  font-size: 4ch;
`;
const Pages1 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 300px;
  position: relative;
`;
const Pages1_Left = styled.div`
  position: relative;
  width: 530px;
  height: 500px;
  margin-right: 200px;
`;

const Pages1_tag1 = styled.p`
  font-size: 38px;
  margin-top: 240px;
  animation: fadein 2s ease-in-out;
  font-weight: 600;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const Pages1_tag2 = styled.p`
  margin-left: 5px;
  font-size: 18px;
  animation: fadein 2s ease-in-out;
  /* font-weight: 600; */
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
// const Pages1_Img1 = styled.img`
//   width: 320px;
//   height: 200px;
//   position: absolute;
//   left: 280px;
//   top: 300px;
//   border-radius: 20px;
//   animation:
//     moveUpDown 1s infinite alternate,
//     fadein 1.5s ease-in-out
//   @keyframes moveUpDown {
//     0% {
//       top: 50px;
//     }
//     100% {
//       top: 59px; /* 1초에 2vh 이동 */
//     }
//   }

//   @keyframes fadein {
//     0% {
//       opacity: 0;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
// `;

const Pages1_Right = styled.div`
  position: relative;
  width: 150vh;
  height: 100vh;
  @media (max-width: 1000px) {
    width: 420px;
    height: 420px;
  }
  transform: rotate(0deg); /* 초기 회전 각도 */
  transition: transform 0.2s ease;
  animation: fadein 4s ease-in-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
// @ts-ignore
const Pages1_img1 = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 550px;
  height: 550px;
  margin-top: 200px;
  @media (max-width: 1000px) {
    width: 420px;
    height: 420px;
  }
`;

const Pages2 = styled.div`
  display: flex;
  overflow: hidden;
  margin-left: 10px;
`;

const Page2_tag1 = styled.div`
  position: relative;
  font-family: var(--font-Pretendard);
  margin-top: 400px;
  margin-right: 200px;
  font-size: 45px;
  width: 800px;
  height: 200px;
  background-image: url('/assets/img/page2_clip2.PNG');
  background-position: 0px 60px;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  z-index: 20;
  font-weight: 600;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Page2_tag2 = styled.div`
  position: relative;
  margin-top: 140px;
  font-size: 40px;
  width: 600px;
  height: 700px;
  border-radius: 10px;
  animation: ${fadeIn} 10.5s ease forwards;
  &.hidden {
    animation: ${fadeOut} 10.5s ease forwards;
  }
  overflow: hidden;
`;

const GifImage = styled.img`
  width: 350px;
  height: 170px;
  position: absolute;
  top: -130px;
  left: 640px;
  z-index: 300;
  border-radius: 100px;
`;

const Page2_img1 = styled.img`
  position: absolute;
  top: 0px;
  left: 130px;
  font-size: 40px;
  width: 370px;
  height: 400px;
  margin-right: 300px;
  border-radius: 10px;
`;
const Page2_img2 = styled.img`
  position: absolute;
  top: 250px;
  left: 220px;
  font-size: 40px;
  width: 340px;
  height: 370px;
  margin-right: 300px;
  border-radius: 10px;
`;
const Page2_img3 = styled.img`
  position: absolute;
  top: 390px;
  left: -10px;
  font-size: 40px;
  width: 240px;
  height: 210px;
  margin-right: 300px;
  border-radius: 10px;
`;

// 섹션2번 -중고거래

const Page2_colorbox = styled.div`
  margin-left: 150px;
  font-size: 40px;
  width: 2700px;
  height: 100vh;
  clip-path: polygon(16% 0%, 100% 0%, 90% 100%, 0% 100%);
  background: #27005d;
  background: linear-gradient(to bottom, rgb(39, 0, 93, 0.9), #27005d);
  position: relative;
`;

const TradeDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const Trade_box1 = styled.div`
  margin-top: 150px;
  margin-left: 700px;
  margin-right: 400px;
  width: 500px;
  height: 700px;
  z-index: 20;
`;
const Trade_box2 = styled.div`
  position: absolute;

  top: -100px;
  left: 1400px;
  width: 500px;
  height: 700px;
`;

const NameTag0 = styled.p`
  font-family: var(--font-Jua);
  font-size: 160px;
  width: 700px;
  color: white;
  z-index: 30;
  background-size: cover;
  font-weight: 600;
`;

const TradeBackground = styled.div`
  width: 100%;
  height: 100%;
  clip-path: polygon(55% 0%, 100% 0%, 45% 100%, 0% 100%);
  background-size: cover;
`;

const NameTag0_2 = styled.div`
  position: absolute;
  top: 400px;
  left: -70px;
  width: 530px;
  height: 750px;
  clip-path: polygon(55% 0%, 100% 0%, 45% 100%, 0% 100%);
  color: white;
  border: 2px solid black;
  margin: 0;
  background-image: url('/assets/img/tests.jpg');
  background-position: -40px 40px;
  background-position: 0px 0px;
  transform: rotate(-50deg);

  background-size: cover;
  z-index: 2;
`;
const NameTag0_3 = styled.div`
  position: absolute;
  top: 100px;
  left: 150px;
  width: 530px;
  height: 750px;
  clip-path: polygon(55% 0%, 100% 0%, 45% 100%, 0% 100%);
  color: white;
  border: 2px solid black;
  margin: 0;
  background-image: url('/assets/img/tests.jpg');
  background-position: 0px 0px;
  transform: rotate(-50deg);
  color: transparent;
  background-size: cover;
`;

const Trade_btn = styled.div`
  width: 220px;
  height: 70px;
  border: 2px solid black;
  margin-left: 70px;
  margin-top: 150px;
  font-size: 25px;
  background-color: #8ecddd;
  background-color: #f94c10;
  color: white;
  line-height: 70px;
  text-align: center;
  border-radius: 10px;
  transition: background-color 0.3s ease; /* 호버 효과를 부드럽게 만들기 위한 트랜지션 */

  &:hover {
    background-color: #6faabb; /* 호버 시 변경될 배경색 */
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;

// 2페이지 -중고거래
const Page2_section2 = ({
  backgroundPositionX,
  fadepages3Tag1,
  fadepages3Tag2
}) => {
  const navigate = useNavigate();
  return (
    <Page2_colorbox>
      <TradeDiv>
        <Trade_box1
          className='Pages3_tag1'
          style={{
            opacity: fadepages3Tag1 / 100,
            transition: 'opacity 1.5s ease'
          }}
        >
          <NameTag0>중고거래</NameTag0>
          <Trade_btn
            onClick={() => {
              navigate('/tradeMain');
            }}
          >
            거래하러가기
          </Trade_btn>
        </Trade_box1>
        <Trade_box2
          className='Pages3_tag2'
          style={{
            opacity: fadepages3Tag2 / 100,
            transition: 'opacity 0.5s ease'
          }}
        >
          <NameTag0_2
            style={{
              backgroundPosition: `${backgroundPositionX + 100}px 0px`,
              transition: 'backgroundPosition 1s ease'
            }}
          >
            <TradeBackground></TradeBackground>
          </NameTag0_2>
          <NameTag0_3
            style={{
              backgroundPosition: `${backgroundPositionX - 200}px 0px`,
              transition: 'backgroundPosition 1s ease'
            }}
          ></NameTag0_3>
        </Trade_box2>
      </TradeDiv>
    </Page2_colorbox>
  );
};

// 섹션3번 -경매

const Page2_Auction = styled.div`
  width: 2020px;
  height: 100vh;
  position: relative;
`;

const AuctionDiv = styled.div`
  display: flex;
`;
const AuctionLeft = styled.div`
  margin-top: 100px;
  margin-left: 300px;
`;

const AuctionRight = styled.div`
  width: 550px;
  height: 450px;
  text-align: center;
  line-height: 450px;
`;

const AuctionDiv2 = styled.div`
  margin-left: 20px;
  margin-top: 12px;
  z-index: 2;
  width: 530px;
  height: 400px;
  border-right: 2px solid rgb(75, 82, 126, 0.2);
`;
const AuctionMidtag1 = styled.div`
  font-size: 27px;
  margin-top: 50px;
  margin-left: 20px;
  font-weight: 600;
`;
const AuctionMidtag2 = styled.div`
  font-size: 27px;
  font-weight: 600;
  margin-top: 70px;
  margin-left: 20px;
`;
const NameTag1 = styled.p`
  font-size: 100px;
  width: 200px;
  background-image: url('/assets/img/test1.jpg');
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-size: cover;
  font-weight: 600;
`;

const NameTag1_2 = styled.p`
  font-size: 28px;
`;
const NameTag1_3 = styled.p`
  font-size: 21px;
  margin-left: 10px;
  color: rgb(0, 0, 0, 0.4);
  z-index: 20;
`;

const Auctionbox = styled.div`
  margin-left: 80px;
  margin-top: 220px;
  width: 450px;
  height: 200px;
`;

const Auction_tuto = styled.div`
  width: 170px;
  height: 55px;
  border: 1px solid rgb(0, 0, 0, 0.3);
  text-align: center;
  line-height: 55px;
  font-size: 25px;
  border-radius: 10px;
  color: #f47b55;
  background-color: white;
  box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.3);
  margin: 20px 0 40px 70px;
  transition: background-color 0.3s ease; /* 호버 효과를 부드럽게 만들기 위한 트랜지션 */

  &:hover {
    background-color: #e9e9e9; /* 호버 시 변경될 배경색 */
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;
const Auction_btn = styled.div`
  width: 200px;
  height: 60px;
  border: 1px solid rgb(0, 0, 0, 0.3);
  font-size: 26px;
  background-color: white;
  text-align: center;
  line-height: 60px;
  box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.3);
  color: #f47b55;
  margin: 20px 0 40px 70px;
  border-radius: 10px;
  transition: background-color 0.3s ease; /* 호버 효과를 부드럽게 만들기 위한 트랜지션 */

  &:hover {
    background-color: #e9e9e9; /* 호버 시 변경될 배경색 */
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;

// const TradeImg1 = styled.img`
//   position: absolute;
//   top: 310px;
//   left: 250px;
//   width: 100px;
//   height: 40px;
// `;
// const TradeImg2 = styled.img`
//   position: absolute;
//   opacity: 0.3;
//   top: -120px;
//   left: -400px;
//   width: 1500px;
//   height: 700px;
//   z-index: -10;
// `;

const AuctionBorder = styled.div`
  position: absolute;
  margin-left: 75px;
  width: 700px;
  height: 500px;
  border: 30px solid rgb(191, 136, 69, 0.5);
  border-radius: 20px;
  /* left: 100px; */
  z-index: 1;
  clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
`;
const AuctionBorder2 = styled.div`
  margin-left: 50px;
  width: 750px;
  height: 500px;
  border: 30px solid rgb(191, 136, 69, 0.5);
  border-radius: 20px;
  /* left: 100px; */
  z-index: 300;
  clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
  transform: translateZ(1000px);
`;
const AuctionMain = styled.div`
  z-index: 2;
  display: flex;
  border: 1px solid rgb(0, 0, 0, 0.2);
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.4);
  width: 840px;
  height: 420px;
  border-radius: 10px;
  transition: transform 0.5s;
  background: linear-gradient(
    to bottom,
    rgb(238, 219, 183),
    rgb(228, 194, 135)
  );
`;
const AuctionSide = styled.div`
  position: absolute;
  display: flex;
  transition: transform 0.5s;
`;

const AuctionMid = styled.div`
  width: 900px;
  height: 450px;

  display: flex;
  align-items: center;
  margin-top: 250px;
  margin-left: 100px;
  position: relative;
  perspective: 700px;
  z-index: 100;
  &:hover {
    & > ${AuctionMain} {
      transform: rotateY(4deg); /* AuctionMain을 시계방향으로 회전 */
    }
    & > ${AuctionSide} {
      transform: rotateY(-5deg); /* AuctionSide를 시계방향으로 회전 */
    }
  }
`;

const TradeImg = styled.img`
  margin-top: 30px;

  width: 350px;
  height: 350px;
  border-radius: 130px;
  opacity: 0.4;
`;

// 3페이지 -경매
const Page2_section3 = ({ fadepages4Tag1, fadepages4Tag2 }) => {
  const navigate = useNavigate();
  return (
    <Page2_Auction>
      <AuctionDiv>
        <AuctionLeft
          className='Pages4_tag1'
          style={{
            opacity: fadepages4Tag1 / 100,
            transition: 'opacity 1.5s ease'
          }}
        >
          <NameTag1>경매</NameTag1>
          {/* <TradeImg1 src='/assets/img/tradeImg1.png'></TradeImg1> */}
          <Auctionbox>
            <NameTag1_2>이번주의 경매 리스트.</NameTag1_2>
            <NameTag1_3>
              가격 측정이 어렵다면, <br /> 인사이트옥션에서 제공하는 경매를
              이용해보세요.
            </NameTag1_3>
          </Auctionbox>
        </AuctionLeft>
        <AuctionMid
          className='Pages4_tag2'
          style={{
            opacity: fadepages4Tag2 / 100,
            transition: 'opacity 1.5s ease'
          }}
        >
          {/* <TradeImg2 src='/assets/img/tradeImg2.png'></TradeImg2> */}
          <AuctionMain>
            <AuctionDiv2>
              <AuctionMidtag1>경매 가이드</AuctionMidtag1>
              <Auction_tuto>튜토리얼</Auction_tuto>
              <AuctionMidtag2>경매 시작하기</AuctionMidtag2>
              <Auction_btn
                onClick={() => {
                  navigate('/auction');
                }}
              >
                경매 입장하기
              </Auction_btn>
            </AuctionDiv2>
            <AuctionRight>
              <TradeImg src='/assets/img/trade.png'></TradeImg>
            </AuctionRight>
          </AuctionMain>

          <AuctionSide>
            <AuctionBorder></AuctionBorder>
            <AuctionBorder2></AuctionBorder2>
          </AuctionSide>
        </AuctionMid>
      </AuctionDiv>
    </Page2_Auction>
  );
};

// 섹션4번 -커뮤니티

const Page2_Commu = styled.div`
  width: 2820px;
  height: 100vh;
  background-color: aliceblue;
  clip-path: polygon(11% 0%, 100% 0%, 100% 100%, 0% 100%);
`;

const CommuDiv = styled.div`
  margin-left: 400px;
  width: 1400px;
  height: 900px;
`;

const NameTag2 = styled.p`
  text-align: center;
  margin-left: 570px;
  font-weight: 600;
  margin-top: 150px;
  font-size: 70px;
  width: 400px;
`;

const TagBottom = styled.div`
  font-size: 30px;
  margin-top: 10px;
  margin-left: 510px;
`;

const Tagcolor = styled.span`
  color: #ffc107;
  font-weight: 600;
`;

const Commu_img = styled.div`
  margin-left: 300px;
  margin-top: 40px;
  width: 1000px;
  height: 500px;
`;

const CommuBottom = styled.div`
  width: 900px;
  height: 10px;
  background-color: #c5c5c5;
  margin-top: -80px;
  margin-left: 300px;
`;

// 4페이지 -커뮤니티
const Page2_section4 = ({ fadepages5Tag1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalScore = useRef<number>(0);

  useEffect(() => {
    // matter js - 커뮤니티 구현
    // 2d 엔진 모델
    const engine = Engine.create(); // 물리엔진
    engine.world.gravity.y = -0.05;
    const render = Render.create({
      // 시각화
      engine,
      canvas: canvasRef.current!,
      options: {
        width: 900,
        height: 420,
        background: '#f4f7f9',
        wireframes: false
      }
    });
    // 이미지 변환
    const textToImage = (text, width, height, fontsize, color) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // 컨텍스트가 유효하지 않으면 처리할 내용 추가
        console.error('2D 컨텍스트를 가져올 수 없습니다.');
        return null;
      }

      // 원 그리기
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      ctx.fillStyle = `${color}`; // 배경 색상
      ctx.fill();

      // 텍스트 추가
      ctx.fillStyle = 'white'; // 텍스트 색상
      ctx.font = `${fontsize} Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);

      // Canvas를 이미지로 변환
      const img = new Image();
      img.src = canvas.toDataURL(); // Canvas를 이미지로 변환

      return img;
    };

    const textImage1 = new Image();
    textImage1.src =
      textToImage('자유 게시판', 320, 320, '30px', '#8ECDDD')?.src || '';

    const textImage2 = new Image();
    textImage2.src =
      textToImage('수명 게시판', 85, 85, '14px', '#E4F1FF')?.src || '';
    const textImage5 = new Image();
    textImage5.src =
      textToImage('수명2 게시판', 130, 130, '14px', '#75C2F6')?.src || '';
    const textImage6 = new Image();
    textImage6.src =
      textToImage('수명3 게시판', 80, 80, '14px', '#78D6C6')?.src || '';
    const textImage7 = new Image();
    textImage7.src =
      textToImage('수명4 게시판', 100, 100, '14px', '#5CD2E6')?.src || '';

    const topWall = Bodies.rectangle(0, 5, 1800, 10, {
      // x,y좌표, 바닥 너비, 바닥 높이
      isStatic: true, // 다른 사물이 통과하지 못함
      collisionFilter: {
        group: -1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#c5c5c5'
      }
    });

    const leftWall = Bodies.rectangle(5, 0, 10, 990, {
      isStatic: true, // 다른 사물이 통과하지 못함
      collisionFilter: {
        group: -1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#c5c5c5'
      }
    });
    const rightWall = Bodies.rectangle(895, 0, 10, 990, {
      isStatic: true, // 다른 사물이 통과하지 못함
      collisionFilter: {
        group: -1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#c5c5c5'
      }
    });

    const group1 = Bodies.circle(250, 480, 160, {
      label: 'user',
      isClickable: true,
      collisionFilter: {
        group: 1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#8ECDDD',
        sprite: {
          texture: textImage1.src
        }
      }
    });
    const group2 = Bodies.circle(410, 650, 85, {
      label: 'user',
      collisionFilter: {
        group: 1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#E4F1FF',
        sprite: {
          texture: textImage2.src
        }
      }
    });

    const group5 = Bodies.circle(500, 650, 130, {
      label: 'user',
      collisionFilter: {
        group: 1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#75C2F6',
        sprite: {
          texture: textImage5.src
        }
      }
    });
    const group6 = Bodies.circle(520, 600, 80, {
      label: 'user',

      render: {
        fillStyle: '#78D6C6',
        sprite: {
          texture: textImage6.src
        }
      }
    });
    const group7 = Bodies.circle(400, 550, 100, {
      label: 'user',

      render: {
        fillStyle: '#5CD2E6',
        sprite: {
          texture: textImage7.src
        }
      }
    });

    const infiniteArr = Array.from({ length: 100 }).map((_) => {
      // 떨어지는 물체 로직
      return Bodies.circle(Math.random() * 800, 500, 10, {
        // x좌표, y좌표, 원반지름
        label: 'ball',
        restitution: 0.3, // 물체의 탄성
        collisionFilter: {
          group: -1
        },
        render: {
          sprite: {
            texture: '/assets/img/bubles.png',
            xScale: 0.12,
            yScale: 0.12
          },
          fillStyle: 'rgba(255, 255, 0, 0.5)'
        }
      });
    });

    World.add(engine.world, [
      rightWall,
      leftWall,
      topWall,
      group1,
      group2,
      group5,
      group6,
      group7
    ]);

    const runner = Runner.run(engine);

    const mouse = Mouse.create(render.canvas); // 마우스객체 생성
    const mouseConstraint = MouseConstraint.create(engine, {
      //mouseConstraint 객체는 물리 엔진과 연결되어, 마우스 입력에 따라 물체를 조작
      mouse
    });

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          resolve();
        }, ms);
      });

    const compositeArr: Matter.Body[] = [];

    const spreadBall = async (ball: Matter.Body) => {
      //
      compositeArr.push(ball);
      World.add(engine.world, compositeArr);
      await wait(2200);
      compositeArr.pop();
      World.remove(engine.world, compositeArr);
    };

    const event = async () => {
      World.add(engine.world, mouseConstraint);
      Render.run(render);

      for (const ball of infiniteArr) {
        await spreadBall(ball);
        totalScore.current = totalScore.current + 1;
      }
    };

    event();

    return () => {
      Runner.stop(runner);
      Render.stop(render);
    };
  }, []);
  return (
    <Page2_Commu
      className='Pages5_tag1'
      style={{
        opacity: fadepages5Tag1 / 100,
        transition: 'opacity 1s ease'
      }}
    >
      <CommuDiv>
        <NameTag2>커뮤니티</NameTag2>
        <TagBottom>
          자신만의 <Tagcolor>수명주기 게시판</Tagcolor>을 가꾸어 보세요.
        </TagBottom>
        <Commu_img>
          <div className='space-y-[1rem]'>
            <div
              className='relative'
              style={{
                width: 300,
                height: 400
              }}
            >
              <canvas ref={canvasRef} />
            </div>
          </div>
        </Commu_img>
        <CommuBottom></CommuBottom>
      </CommuDiv>
    </Page2_Commu>
  );
};

// 섹션5번 -Q&A

const Page2_SQL = styled.div`
  position: relative;
  margin-left: -600px;
  width: 2100px;
  height: 100vh;
`;

const NameTag3 = styled.p`
  position: absolute;
  top: 90px;
  left: 120px;
  font-size: 90px;
  font-weight: 600;
`;

const NameColor = styled.span`
  color: #f94c10;
`;

const Page2_colorbox2 = styled.div`
  font-size: 40px;
  width: 2900px;
  height: 100vh;
  clip-path: polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%);
  background: #cccaca;
  position: relative;
`;

const Serve = styled.img`
  margin-right: 70px;
  width: 330px;
  height: 260px;
  border-radius: 5px;
  background-color: white;
`;

const ServeDiv = styled.div`
  margin-left: 350px;
  margin-top: 40px;
  position: absolute;
  display: flex;
  top: 430px;
  left: 180px;
`;
const Page2_section5 = ({ fadepages6Tag1, fadepages6Tag2 }) => {
  return (
    <Page2_SQL>
      <Page2_colorbox2></Page2_colorbox2>
      <NameTag3
        className='Pages6_tag1'
        style={{
          opacity: fadepages6Tag1 / 100,
          transition: 'opacity 1s ease'
        }}
      >
        Ser<NameColor>vices</NameColor>
      </NameTag3>
      <ServeDiv
        className='Pages6_tag2'
        style={{
          opacity: fadepages6Tag2 / 100,
          transition: 'opacity 1s ease'
        }}
      >
        <Serve src='/assets/img/service1.PNG'></Serve>
        <Serve src='/assets/img/service2.png'></Serve>
        <Serve src='/assets/img/service3.png'></Serve>
      </ServeDiv>
    </Page2_SQL>
  );
};

const BlockDiv1 = styled.div`
  position: relative;
  top: 215px;
  left: 21px;
  z-index: 10;
  width: 590px;
  height: 590px;
`;

const Block1 = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 41%;
  height: 42.5%;
  clip-path: polygon(60% 0%, 100% 0%, 40% 100%, 0% 100%);
  background-image: url('/assets/img/page2_clip3.jpg');
  background-position: 0px 0px;
  color: transparent;
  background-size: cover;
`;
const Block2 = styled.div`
  position: absolute;
  top: 0%;
  left: 28.5%;
  width: 41%;
  height: 42.5%;
  clip-path: polygon(60% 0%, 100% 0%, 40% 100%, 0% 100%);
  background-image: url('/assets/img/page2_clip3.jpg');
  background-position: 120px 0px;
  color: transparent;
  background-size: cover;
`;

const Block3 = styled.div`
  position: absolute;
  bottom: -4%;
  left: 21%;
  width: 41%;
  height: 42.5%;
  clip-path: polygon(60% 0%, 100% 0%, 40% 100%, 0% 100%);
  background-image: url('/assets/img/page2_clip4.jpg');
  background-position: -60px -200px;
  color: transparent;
  background-size: cover;
  transform: rotate(61deg);
`;
const Block4 = styled.div`
  position: absolute;
  top: 38%;
  left: 8%;
  width: 41%;
  height: 42.5%;
  clip-path: polygon(60% 0%, 100% 0%, 40% 100%, 0% 100%);
  background-image: url('/assets/img/page2_clip4.jpg');
  background-position: 300px -240px;
  color: transparent;
  background-size: cover;
  transform: rotate(61deg);
`;
const Block5 = styled.div`
  position: absolute;
  top: 16%;
  left: 64%;
  width: 41%;
  height: 42.5%;
  clip-path: polygon(60% 0%, 100% 0%, 40% 100%, 0% 100%);
  background-image: url('/assets/img/page2_clip5.jpg');
  background-position: -150px 0px;
  color: transparent;
  background-size: cover;
  transform: rotate(-58.5deg);
`;
const Block6 = styled.div`
  position: absolute;
  top: 215px;
  top: 38%;
  left: 50%;
  width: 41%;
  height: 42.5%;
  clip-path: polygon(60% 0%, 100% 0%, 40% 100%, 0% 100%);
  background-image: url('/assets/img/page2_clip5.jpg');
  background-position: -10px 0px;
  color: transparent;
  background-size: cover;
  transform: rotate(-60.5deg);
`;

const BlockDot = styled.div`
  position: absolute;
  top: 295px;
  left: 265px;
  z-index: 10;
  width: 1px;
  height: 1px;
  background-color: red;
`;

// 전체 페이지 - 가로 스크롤 로직

const PageSlide = () => {
  const rotation = useRef(0);
  const size = useRef({
    width: 590,
    height: 590,
    top: 215,
    left: 21
  });
  // @ts-ignore
  const [arrow, setArrow] = useState(1);
  const [fadepages1Tag2, setFadepages1Tag2] = useState(100);
  const [fadepages2Tag1, setFadepages2Tag1] = useState(0);
  const [fadepages2Tag2, setFadepages2Tag2] = useState(0);
  const [fadepages3Tag1, setFadepages3Tag1] = useState(0);
  const [fadepages3Tag2, setFadepages3Tag2] = useState(0);
  const [fadepages4Tag1, setFadepages4Tag1] = useState(0);
  const [fadepages4Tag2, setFadepages4Tag2] = useState(0);
  const [fadepages5Tag1, setFadepages5Tag1] = useState(0);
  const [fadepages6Tag1, setFadepages6Tag1] = useState(0);
  const [fadepages6Tag2, setFadepages6Tag2] = useState(0);
  const [backgroundPositionX, setBackgroundPositionX] = useState(-190);

  const scrollposition = useRef(0);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 코드
    const scrollContainer: HTMLElement | null =
      document.querySelector('.page-container');

    // 스크롤바 계산
    const indi_bar = document.getElementById('indi_bar');
    let pct = 0;
    let s_pos = 0;
    let s_move_max = 11000; // 슬라이드 전체길이

    // 스크롤바 게이지

    const on_indicator = (moving) => {
      s_pos = moving;
      if (s_pos > 200) {
        s_pos = 180;
      } else if (s_pos > 100) {
        s_pos = 360;
      } else if (s_pos < 0) {
        s_pos = 360 - moving;
      }

      if (s_pos <= 1500) {
        scrollposition.current = 1;
      } else if (s_pos <= 3100) {
        scrollposition.current = 2;
      } else if (s_pos <= 5200) {
        scrollposition.current = 3;
      } else if (s_pos <= 7500) {
        scrollposition.current = 4;
      } else if (s_pos <= 9500) {
        scrollposition.current = 5;
      } else if (s_pos <= 11000) {
        scrollposition.current = 6;
      }

      pct = (s_pos * 100) / s_move_max;
      // @ts-ignore
      indi_bar.style.clipPath = `
      polygon(0% 0%, ${pct}% 0%, ${pct}% 100%, 0% 100%)
      `;
    };

    const handleWheelScroll = (evt: WheelEvent) => {
      evt.preventDefault();

      // 태그 위치를 찾고 없애는 동작로직
      const pages1Tag2Element = document.querySelector('.Pages1_tag2');
      const pages2Tag1Element = document.querySelector('.Pages2_tag1');
      const pages2Tag2Element = document.querySelector('.Pages2_tag2');
      const pages3Tag1Element = document.querySelector('.Pages3_tag1');
      const pages3Tag2Element = document.querySelector('.Pages3_tag2');
      const pages4Tag1Element = document.querySelector('.Pages4_tag1');
      const pages4Tag2Element = document.querySelector('.Pages4_tag2');
      const pages5Tag1Element = document.querySelector('.Pages5_tag1');
      const pages6Tag1Element = document.querySelector('.Pages6_tag2');
      const pages6Tag2Element = document.querySelector('.Pages6_tag2');
      // @ts-ignore
      const pages1Tag2Rect = pages1Tag2Element.getBoundingClientRect();
      // @ts-ignore
      const pages2Tag1Rect = pages2Tag1Element.getBoundingClientRect();
      // @ts-ignore
      const pages2Tag2Rect = pages2Tag2Element.getBoundingClientRect();
      // @ts-ignore
      const pages3Tag1Rect = pages3Tag1Element.getBoundingClientRect();
      // @ts-ignore
      const pages3Tag2Rect = pages3Tag2Element.getBoundingClientRect();
      // @ts-ignore
      const pages4Ta12Rect = pages4Tag1Element.getBoundingClientRect();
      // @ts-ignore
      const pages4Tag2Rect = pages4Tag2Element.getBoundingClientRect();
      // @ts-ignore
      const pages5Tag1Rect = pages5Tag1Element.getBoundingClientRect();
      // @ts-ignore
      const pages6Tag1Rect = pages6Tag1Element.getBoundingClientRect();
      // @ts-ignore
      const pages6Tag2Rect = pages6Tag2Element.getBoundingClientRect();

      // console.log('Pages1_tag3 위치:', pages2Tag2Rect.left, evt.deltaY);
      on_indicator(pages1Tag2Rect.left);

      if (evt.deltaY > 0) {
        if (pages1Tag2Rect.left >= 300) {
          setFadepages1Tag2(50);
        } else if (pages1Tag2Rect.left >= 200) {
          setFadepages1Tag2(20);
        } else if (pages1Tag2Rect.left <= 100) {
          setFadepages1Tag2(0);
        }

        if (pages2Tag1Rect.left <= -500) {
          setFadepages2Tag1(0);
        } else if (pages2Tag1Rect.left <= -200) {
          setFadepages2Tag1(20);
        } else if (pages2Tag1Rect.left <= -100) {
          setFadepages2Tag1(50);
        } else if (pages2Tag1Rect.left <= 100) {
          setFadepages2Tag1(70);
        } else if (pages2Tag1Rect.left < 1700) {
          setFadepages2Tag1(100);
        } else if (pages2Tag1Rect.left >= 1700) {
          setFadepages2Tag1(0);
        }
        // 페이지2 이미지
        if (pages2Tag2Rect.left <= -300) {
          setFadepages2Tag2(10);
        } else if (pages2Tag2Rect.left <= -100) {
          setFadepages2Tag2(40);
        } else if (pages2Tag2Rect.left < 100) {
          setFadepages2Tag2(80);
        } else if (pages2Tag2Rect.left >= 1700) {
          setFadepages2Tag2(60);
        } else if (pages2Tag2Rect.left >= 1500) {
          setFadepages2Tag2(80);
        } else if (pages2Tag2Rect.left >= 1400) {
          setFadepages2Tag2(100);
        }

        setBackgroundPositionX((prevX) => prevX - 40); // 이미지 왼쪽으로 이동

        // 페이지3 이미지
        if (pages3Tag1Rect.left <= -150) {
          setFadepages3Tag1(30);
        } else if (pages3Tag1Rect.left <= 1900) {
          setFadepages3Tag1(100);
        }
        // 페이지3 이미지2
        if (pages3Tag2Rect.left <= -150) {
          setFadepages3Tag2(30);
        } else if (pages3Tag2Rect.left <= 1900) {
          setFadepages3Tag2(100);
        }

        // 페이지4 글자
        if (pages3Tag1Rect.left <= -600) {
          setFadepages4Tag1(100);
        } else {
          setFadepages4Tag1(30);
        }

        // 페이지4 우측태그
        if (pages3Tag2Rect.left <= -500) {
          setFadepages4Tag2(100);
        } else {
          setFadepages4Tag2(30);
        }
        // 페이지5
        if (pages3Tag2Rect.left <= -2500) {
          setFadepages5Tag1(95);
        } else {
          setFadepages5Tag1(30);
        }
        // 페이지6 글자
        if (pages3Tag2Rect.left <= -4000) {
          setFadepages6Tag1(100);
        } else {
          setFadepages6Tag1(30);
        }
        // 페이지6 내용
        if (pages3Tag2Rect.left <= -4500) {
          setFadepages6Tag2(100);
        } else {
          setFadepages6Tag2(30);
        }
      } else if (evt.deltaY < 0) {
        if (pages1Tag2Rect.left >= 0) {
          setFadepages1Tag2(100);
        }
        if (pages2Tag1Rect.left >= 1700) {
          setFadepages2Tag1(0);
        } else if (pages2Tag1Rect.left <= 1600) {
          setFadepages2Tag1(100);
        } else if (pages2Tag1Rect.left <= 100) {
          setFadepages2Tag1(70);
        } else if (pages2Tag1Rect.left <= -100) {
          setFadepages2Tag1(50);
        } else if (pages2Tag1Rect.left <= -200) {
          setFadepages2Tag1(20);
        } else if (pages2Tag1Rect.left >= 0) {
          setFadepages2Tag1(100);
        }
        // 페이지2 이미지
        if (pages2Tag2Rect.left >= 1600) {
          setFadepages2Tag2(0);
        } else if (pages2Tag2Rect.left <= 1600) {
          setFadepages2Tag2(100);
        } else if (pages2Tag2Rect.left <= 100) {
          setFadepages2Tag2(70);
        } else if (pages2Tag2Rect.left <= -100) {
          setFadepages2Tag2(50);
        } else if (pages2Tag2Rect.left <= -200) {
          setFadepages2Tag2(20);
        } else if (pages2Tag2Rect.left >= 0) {
          setFadepages2Tag2(100);
        }

        setBackgroundPositionX((prevX) => prevX + 20); // 이미지 오른쪽으로 이동
        // 페이지3 이미지
        if (pages3Tag1Rect.left >= -150 && pages3Tag1Rect.left <= 450) {
          setFadepages3Tag1(100);
        } else if (pages3Tag1Rect.left >= 1450) {
          setFadepages3Tag1(0);
        }
        // 페이지3 이미지2
        if (pages3Tag2Rect.left >= -150 && pages3Tag2Rect.left <= 450) {
          setFadepages3Tag2(100);
        } else if (pages3Tag2Rect.left >= 1450) {
          setFadepages3Tag2(0);
        }

        // 페이지4 글자
        if (pages3Tag1Rect.left >= -800) {
          setFadepages4Tag1(30);
        }
        // 페이지4 우측태그
        if (pages3Tag2Rect.left >= -1600) {
          setFadepages4Tag2(30);
        }
        // 페이지5
        if (pages3Tag2Rect.left >= -2600) {
          setFadepages5Tag1(30);
        }
        // 페이지6 글자
        if (pages3Tag2Rect.left >= -5000) {
          setFadepages6Tag1(30);
        }
        // 페이지6 내용
        if (pages3Tag2Rect.left >= -5500) {
          setFadepages6Tag2(30);
        }
      }

      // 이미지 회전 동작로직
      if (scrollContainer) {
        scrollContainer.scrollLeft += evt.deltaY * 0.8;
        const currentScrollLeft = scrollContainer.scrollLeft;
        const deltaY = evt.deltaY;

        // 원하는 애니메이션 시간 (0.5초)을 설정
        const animationDuration = 0.07;

        // 스크롤 애니메이션
        const animateScroll = (startTime: number) => {
          const currentTime = Date.now();
          const elapsedTime = (currentTime - startTime) / 2500;

          if (deltaY > 0) {
            setArrow(1);
          } else if (deltaY < 0) {
            setArrow(-1);
          }
          if (elapsedTime < animationDuration) {
            const progress = elapsedTime / animationDuration;
            const newScrollLeft = currentScrollLeft + deltaY * progress;
            scrollContainer.scrollLeft = newScrollLeft;

            requestAnimationFrame(() => animateScroll(startTime));
          } else {
            // 애니메이션이 완료된 후에도 정확한 위치로 이동
            scrollContainer.scrollLeft = currentScrollLeft + deltaY;
          }
        };
        // 애니메이션 시작
        animateScroll(Date.now());
      }
      // 회전 로직
      //초기상태
      // @ts-ignore
      if (evt.deltaY < 0 && scrollContainer.scrollLeft == 0) {
        rotation.current = 0;
      }
      // @ts-ignore
      if (scrollContainer.scrollLeft > 0 && scrollContainer.scrollLeft < 1650) {
        if (evt.deltaY > 0) {
          // 이미지 반시계 회전
          //이미지 크기 변경
          // @ts-ignore
          if (scrollContainer.scrollLeft < 300) {
            rotation.current = rotation.current - 1;
            size.current = {
              width: size.current.width,
              height: size.current.height,
              top: size.current.top,
              left: size.current.left - 20
            };
            // @ts-ignore
          } else if (scrollContainer.scrollLeft < 650) {
            rotation.current = rotation.current - 10;
            size.current = {
              width:
                size.current.width >= 1000
                  ? size.current.width
                  : size.current.width * 1.1,
              height:
                size.current.height >= 1000
                  ? size.current.height
                  : size.current.height * 1.1,
              top: size.current.top <= -60 ? -60 : size.current.top - 20,
              left: size.current.left >= 100 ? 100 : size.current.left + 20
            };
            // @ts-ignore
          } else if (scrollContainer.scrollLeft < 1659) {
            rotation.current =
              rotation.current < -125 ? -125 : rotation.current - 13;
            size.current = {
              width:
                size.current.width >= 1600 ? 1600 : size.current.width * 1.1,
              height:
                size.current.height >= 1600 ? 1600 : size.current.height * 1.1,
              top: size.current.top <= -60 ? -60 : size.current.top - 25,
              left: size.current.left >= 100 ? 100 : size.current.left
            };
          }
        } else {
          // //이미지 크기 변경
          // @ts-ignore
          if (scrollContainer.scrollLeft < 300) {
            rotation.current = rotation.current > 0 ? 0 : rotation.current + 1;

            size.current = {
              width: size.current.width,
              height: size.current.height,
              top: size.current.top,
              left: size.current.left + 20
            };
            // @ts-ignore
          } else if (scrollContainer.scrollLeft < 650) {
            rotation.current = rotation.current > 0 ? 0 : rotation.current + 10;
            size.current = {
              width: size.current.width < 590 ? 590 : size.current.width * 0.9,
              height:
                size.current.height < 590 ? 590 : size.current.height * 0.9,
              top: size.current.top + 10,
              left: size.current.left - 20
            };
            // @ts-ignore
          } else if (scrollContainer.scrollLeft < 2059) {
            rotation.current = rotation.current + 13;

            size.current = {
              width: size.current.width < 590 ? 590 : size.current.width * 0.9,
              height:
                size.current.height < 590 ? 590 : size.current.height * 0.9,
              top: size.current.top < 590 ? 215 : size.current.top + 20,
              left: size.current.left
            };
          }
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheelScroll);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 해제
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheelScroll);
      }
    };
  }, []);

  return (
    <Page className='page-container'>
      <Scrollbar>
        <ScrollTag scrollposition={scrollposition.current}></ScrollTag>
        <Scroller id='indi_bar'></Scroller>
      </Scrollbar>
      <PagesSection1>
        <Pages1>
          <Pages1_Left
            className='Pages1_tag2'
            style={{
              opacity: fadepages1Tag2 / 100,
              transition: 'opacity 1.5s ease'
            }}
          >
            {/* <Pages1_Img1 src='/assets/img/mainicon1.PNG'></Pages1_Img1> */}
            <Pages1_tag1>
              빠르고 간단하게 <br />
              상품을 팔거나 살 수 있는
              <p style={{ color: '#F47B55', marginTop: '5px' }}>
                스마트한 커뮤니티 장터
              </p>
            </Pages1_tag1>
            <Pages1_tag2>
              당신 근처의 지역 생활 커뮤니티. <br />
              동네라서 가능한 모든 것 싸그리에서 가까운 이웃과 함께하세요.{' '}
              <br />
            </Pages1_tag2>
          </Pages1_Left>
          <Pages1_Right>
            <BlockDiv1
              style={{
                transform: `rotate(${rotation.current}deg)`,
                width: `${size.current.width}px`,
                height: `${size.current.height}px`,
                top: `${size.current.top}px`,
                left: `${size.current.left}px`,

                transition:
                  'transform 0.4s, width 0.4s, height 0.4s, top 0.5s, left 0.5s',
                transformOrigin: '488 303 0'
              }}
            >
              <BlockDot></BlockDot>
              <Block1
                style={{
                  transition:
                    'transform 0.3s, width 0.5s, height 0.5s, top 0.5s, left 0.5s'
                }}
              ></Block1>
              <Block2
                style={{
                  transition:
                    'transform 0.3s, width 0.5s, height 0.5s, top 0.5s, left 0.5s'
                }}
              ></Block2>
              <Block3
                style={{
                  transition:
                    'transform 0.3s, width 0.5s, height 0.5s, top 0.5s, left 0.5s'
                }}
              ></Block3>
              <Block4
                style={{
                  transition:
                    'transform 0.3s, width 0.5s, height 0.5s, top 0.5s, left 0.5s'
                }}
              ></Block4>
              <Block5
                style={{
                  transition:
                    'transform 0.3s, width 0.5s, height 0.5s, top 0.5s, left 0.5s'
                }}
              ></Block5>
              <Block6
                style={{
                  transition:
                    'transform 0.3s, width 0.5s, height 0.5s, top 0.5s, left 0.5s'
                }}
              ></Block6>
            </BlockDiv1>
          </Pages1_Right>
        </Pages1>
      </PagesSection1>
      <PagesSection2>
        <Pages2>
          {/* 2-1 */}

          <Page2_tag1
            className='Pages2_tag1'
            style={{
              opacity: fadepages2Tag1 / 100,
              transition: 'opacity 2s ease'
            }}
          >
            당신 근처의 지역 생활 커뮤니티. <br />
            동네라서 가능한 모든 것 싸그리에서 가까운 이웃과 함께하세요.
            <br />
            <GifImage src='/assets/img/motion.gif' alt='My GIF' />
          </Page2_tag1>

          <Page2_tag2>
            <Page2_img1
              className='Pages2_tag2'
              style={{
                opacity: fadepages2Tag2 / 100,
                transition: 'opacity 1s ease'
              }}
              src='/assets/img/page2_right.jpg'
              alt='page2 오른쪽이미지'
            ></Page2_img1>
            <Page2_img2
              className='Pages2_tag2'
              style={{
                opacity: fadepages2Tag2 / 100,
                transition: 'opacity 1s ease'
              }}
              src='/assets/img/page2_right2.jpg'
              alt='page2 오른쪽이미지2'
            ></Page2_img2>
            <Page2_img3
              className='Pages2_tag2'
              style={{
                opacity: fadepages2Tag2 / 100,
                transition: 'opacity 1s ease'
              }}
              src='/assets/img/present.png'
              alt='page2 오른쪽이미지3'
            ></Page2_img3>
          </Page2_tag2>
          {/* 2-2 */}
          <Page2_section2
            backgroundPositionX={backgroundPositionX}
            fadepages3Tag1={fadepages3Tag1}
            fadepages3Tag2={fadepages3Tag2}
          ></Page2_section2>
          {/* 2-3 */}
          <Page2_section3
            fadepages4Tag1={fadepages4Tag1}
            fadepages4Tag2={fadepages4Tag2}
          ></Page2_section3>
          <Page2_section4 fadepages5Tag1={fadepages5Tag1}></Page2_section4>
          <Page2_section5
            fadepages6Tag1={fadepages6Tag1}
            fadepages6Tag2={fadepages6Tag2}
          ></Page2_section5>
        </Pages2>
      </PagesSection2>
    </Page>
  );
};

export { MainPage, PageSlide };
