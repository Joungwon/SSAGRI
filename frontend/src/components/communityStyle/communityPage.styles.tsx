import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
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
import axios from 'axios';

// 커뮤니티 메인페이지 구성

const CommunityDiv = styled.div`
  position: relative;
  width: 100%;
  height: 5200px;
  margin-top: 5px;
  background-color: #f4f7f9;
`;

const TopDiv = styled.div`
  font-size: 35px;
  font-weight: 600;
  margin: 10px 0 50px 400px;
`;
const TopDiv2 = styled.div`
  /* width: 100%; */
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  /* border: 2px solid black; */
  /* margin: 0 auto; */
  color: #6da3d3;
`;
const Div = styled.div``;

const LeftDiv = styled.div`
  margin: 58px auto;
  width: 1045px;
  height: 540px;
  border-bottom: 10px solid #d0e7d2;
`;
const RightDiv = styled.div`
  margin: 220px auto;

  width: 1300px;
  height: 53vh;
  background-color: rgb(244, 238, 238, 0.3);
  border: 1.3px solid rgb(0, 0, 0, 0.1);
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.4);
  border-radius: 5px;
  animation: fadein 1s ease-in-out;
  /* clip-path: polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%); */
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const FlexDiv = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
`;

const FontDiv = styled.div`
  font-size: 20px;
`;
const CommuList = styled(FontDiv)`
  width: 1300px;
  height: 80px;
  font-size: 29px;
  font-weight: 600;
  /* margin: 30px 0 45px 110px; */
  line-height: 80px;
  background-color: rgb(244, 238, 238);
`;

const CommuTopTag = styled.div`
  margin-left: 80px;
`;

const CommuTag = styled(FontDiv)`
  font-size: 25px;
  margin-left: 50px;
  font-weight: 560;
  color: #585757;
  &:hover {
    color: rgb(29, 38, 125, 0.9);
    text-decoration: underline;
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;
const MidTag = styled.div`
  font-size: 42px;
  margin: 160px 0 0 200px;
  font-weight: 600;
  color: #4786fa;
  transition: opacity 1s ease;

  &.visible {
    opacity: 1;
  }
`;
const MidTag2 = styled.div`
  font-size: 42px;
  margin: 40px 0 0 220px;
  font-weight: 600;
  color: #4786fa;
`;

const ListDiv = styled.div`
  display: flex;
  margin: 20px auto;
  width: 250px;
  height: 50px;
  font-weight: 600;
`;

const ListTag = styled.div`
  width: 200px;
  height: 52px;
  border-radius: 20px;
  line-height: 52px;
  text-align: center;
  /* border: 2px solid #dadcdd;
  background-color: #e4e6e7; */
  color: rgb(29, 38, 125);
  font-size: 25px;
  margin-top: 15px;
  margin-left: 15px;
  &:hover {
    color: rgb(29, 38, 125, 0.9);
    background-color: rgb(215, 224, 228); /* 호버 시 변경될 배경색 */
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;

const ListsDiv = styled.div`
  /* border: 2px solid black; */
  width: 250px;
  margin-left: 20px;
`;

const BrTag = styled.div`
  margin-top: 220px;
  width: 100%;
  height: 1px;
`;

const MidDiv = styled.div`
  margin-top: 150px;
  width: 100%;
  height: 700px;
`;
const BottomDiv = styled.div`
  width: 100%;
  height: 1900px;
  background-color: #eaecee;
  border: 2px solid #eaecee;
`;
const CommuPage = styled.div`
  margin-top: 20px;
  width: 300px;
  height: 80px;
  border: 10px;
  border-radius: 10px 10px 0 0;
  background-color: rgb(200, 142, 167, 0.2);
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  &:hover {
    background-color: rgb(200, 142, 167, 0.4);

    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
  /* color: #CE5959; */
`;

const ImgDiv = styled.img`
  width: 600px;
  height: 500px;
  opacity: 0.3;
  border-radius: 50px;
`;

const LifeTags = styled.div`
  font-size: 40px;
  margin: 200px 0 100px 150px;
  width: 300px;
  height: 80px;
  font-weight: 600;

  /* border: 2px solid #186fc7; */
  /* background-color: #186fc7; */
  background-color: rgb(29, 38, 125, 0.9);
  color: white;
  border-radius: 50px;
  text-align: center;
  line-height: 80px;
`;

const LifeTags2 = styled(LifeTags)`
  background-color: #cc4830;
  font-size: 35px;
  margin-bottom: 100px;
`;

const LifeTag = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

const Lifename = styled.div`
  margin: -20px 0 100px 300px;
  font-size: 23px;
  color: #cc4830;
  font-weight: 600;
`;
const BottomTag = styled.div`
  font-size: 30px;
  margin: 200px auto;
  width: 700px;
  height: 100px;
  border: 2px solid rgb(218, 233, 247);
  border-radius: 50px;
  background-color: rgb(240, 248, 255);
  text-align: center;
  line-height: 100px;
  &:hover {
    color: rgb(29, 38, 125, 0.9);
    background-color: rgb(212, 231, 248); /* 호버 시 변경될 배경색 */
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;

const CommuTopDiv = styled.div`
  display: flex;
  width: 1300px;
  height: 70px;
  margin: 10px auto 0;
  line-height: 70px;
  background-color: #dfe0e2;
  border-top: 5px solid #1d267d;
  border-left: 2px solid rgb(0, 0, 0, 0.1);
  border-right: 2px solid rgb(0, 0, 0, 0.1);
  border-bottom: 2px solid rgb(0, 0, 0, 0.1);
`;
const CommuTopImg = styled.img`
  width: 27px;
  height: 27px;
  margin: 21px 0 0 20px;
`;

const CommuTopTitle = styled.div`
  margin-left: 60px;
  font-size: 25px;
  color: #1d267d;
`;
const CommuListDiv = styled.div`
  margin: 0 auto 200px;
  width: 1300px;
  height: 500px;
  border-left: 2px solid rgb(0, 0, 0, 0.1);
  border-right: 2px solid rgb(0, 0, 0, 0.1);
  border-bottom: 2px solid rgb(0, 0, 0, 0.1);
  border-radius: 0 0px 10px 10px;
  background-color: #f8f7f5;
  display: flex;
  /* justify-content: space-between; */
`;

const LineDiv = styled.div`
  height: 500px;
  border: 1px solid rgb(0, 0, 0, 0.1);
`;

const Rank = styled.div`
  width: 20px;
  height: 20px;
  background-color: rgb(255, 0, 0, 0.7);
  color: white;
  text-align: center;
  line-height: 20px;
  border-radius: 3px;
`;

const RedDiv = styled.span`
  color: red;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 34px;
`;

const BoardLife = styled.div`
  height: 60px;
  font-size: 20px;
  /* border: 2px solid black; */
  line-height: 60px;
  background-color: rgb(231, 203, 203, 0.3);
  color: rgb(255, 0, 0, 0.6);
`;
const BottomText = styled.div`
  margin: 450px 0 0 250px;
  font-size: 40px;
  color: #569daa;
  font-weight: 600;
`;
// 커뮤니티 구성 컴포넌트

const CommunityMain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalScore = useRef<number>(0);
  const [ref, inView] = useInView({
    triggerOnce: true, // 한 번만 트리거
    threshold: 0.5 // 50% 이상 화면에 보일 때 트리거
  });
  const navigate = useNavigate();

  const [commuRank, setCommuRank] = useState([]);
  const [commuList, setCommuList] = useState([]);

  const [commuLife, setCommuLife] = useState([]);
  const colorList = [
    '#8ECDDD',
    '#E4F1FF',
    '#B0D9B1',
    '#AED2FF',
    '#75C2F6',
    '#78D6C6',
    '#5CD2E6'
  ];

  const storedAccessToken = sessionStorage.getItem('accessToken');

  type CommuItem = {
    title: string;
    boardNo: number;
    boardLife?: number;
    click: number;
  };
  type CommuLifeItem = {
    title: string;
    no: number;
    boardLife?: number;
    click: number;
  };

  useEffect(() => {
    if (inView) {
      // inView 값이 true이면 화면에 보임
      // 서서히 나타나도록 클래스 추가
    }
  }, [inView, ref]);

  useEffect(() => {
    const CommuApi = axios.create({
      headers: { Authorization: storedAccessToken }
    });

    //게시판 순위 정보
    CommuApi.get('/board/click-board-list')
      .then((res) => {
        setCommuRank(res.data);
      })
      .catch((err) => {
        console.log('실패1', err);
      });

    // 게시판 글자 정렬 리스트
    CommuApi.get('/board/title-board-list')
      .then((res) => {
        setCommuList(res.data);
      })
      .catch((err) => {
        console.log('실패2', err);
      });

    // 남은 게시판 생명 Top3
    CommuApi.get('/board/board-life')
      .then((res) => {
        setCommuLife(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
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

    // 이미지 생성
    const textImage1 = new Image();
    textImage1.src =
      textToImage('자유 게시판', 320, 320, '30px', '#8ECDDD')?.src || '';

    const textImage2 = new Image();
    textImage2.src =
      textToImage('수명 게시판', 85, 85, '14px', '#E4F1FF')?.src || '';

    // 2d 엔진 모델
    const engine = Engine.create(); // 물리엔진
    engine.world.gravity.y = -0.05;
    // engine.world.gravity.x = -0.1;
    const render = Render.create({
      // 시각화
      engine,
      canvas: canvasRef.current!,
      options: {
        width: 1050,
        height: 530,
        background: '#f4f7f9',
        wireframes: false
      }
    });

    const topWall = Bodies.rectangle(0, 5, 2090, 10, {
      // x,y좌표, 바닥 너비, 바닥 높이
      isStatic: true, // 다른 사물이 통과하지 못함
      collisionFilter: {
        group: -1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#D0E7D2'
      }
    });

    const leftWall = Bodies.rectangle(5, 0, 10, 1090, {
      isStatic: true, // 다른 사물이 통과하지 못함
      collisionFilter: {
        group: -1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#D0E7D2'
      }
    });
    const rightWall = Bodies.rectangle(1040, 0, 10, 1090, {
      isStatic: true, // 다른 사물이 통과하지 못함
      collisionFilter: {
        group: -1 // 특정 그룹에 대해서만 다른 효과를 내기 위해 그룹 묶기
      },
      render: {
        fillStyle: '#D0E7D2'
      }
    });

    const groups = commuRank.map((item: CommuItem, index) => {
      // 각 group의 일부 속성을 랜덤으로 설정
      const x = 400 + Math.random() * 100; // x 좌표를 랜덤으로 설정
      const y = 480 + Math.random() * 100; // y 좌표를 랜덤으로 설정 (480에서 580 사이의 값)
      const radius = 80 + item.click; // 반지름을 랜덤으로 설정 (80에서 160 사이의 값)
      const fontSize = '24px'; // 폰트 크기 (고정값)

      // 텍스트 생성
      const textImage = new Image();
      textImage.src =
        textToImage(
          item.title,
          radius * 2,
          radius * 2,
          fontSize,
          colorList[index]
        )?.src || '';

      // group 생성
      const group = Bodies.circle(x, y, radius, {
        label: 'user',
        isClickable: true,
        collisionFilter: {
          group: 1
        },
        render: {
          fillStyle: '#8ECDDD',
          sprite: {
            texture: textImage.src
          }
        }
      });

      return group;
    });

    const infiniteArr = Array.from({ length: 10 }).map((_) => {
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

    World.add(engine.world, [rightWall, leftWall, topWall, ...groups]);

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
  }, [commuRank]);

  return (
    <CommunityDiv>
      <Div>.</Div>
      <TopDiv>
        금주의
        <RedDiv>Hot</RedDiv>
        게시판
      </TopDiv>
      <TopDiv2>활동량을 늘리고 게시판 크기를 키워보세요!</TopDiv2>

      <LeftDiv>
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
      </LeftDiv>

      <RightDiv>
        <CommuList>
          <CommuTopTag>금주의 게시판 순위</CommuTopTag>
        </CommuList>
        <FlexDiv>
          <Div>
            {commuRank.slice(0, 5).map((item: CommuItem, id) => (
              <ListDiv key={id}>
                <Rank>{id + 1}</Rank>
                <CommuTag
                  onClick={() =>
                    navigate(
                      `/community/${item.boardNo}?boardNo=${item.boardNo}`
                    )
                  }
                >
                  {item.title}
                </CommuTag>
              </ListDiv>
            ))}
          </Div>
          <Div>
            {commuRank.slice(5, 10).map((item: CommuItem, id) => (
              <ListDiv key={id}>
                <Rank>{id + 6}</Rank>
                <CommuTag
                  onClick={() =>
                    navigate(
                      `/community/${item.boardNo}?boardNo=${item.boardNo}`
                    )
                  }
                >
                  {item.title}
                </CommuTag>
              </ListDiv>
            ))}
          </Div>
          <Div>
            {commuRank.slice(10, 15).map((item: CommuItem, id) => (
              <ListDiv key={id}>
                <Rank>{id + 11}</Rank>
                <CommuTag
                  onClick={() =>
                    navigate(
                      `/community/${item.boardNo}?boardNo=${item.boardNo}`
                    )
                  }
                >
                  {item.title}
                </CommuTag>
              </ListDiv>
            ))}
          </Div>
        </FlexDiv>
      </RightDiv>

      <BrTag></BrTag>
      <MidDiv>
        <FlexDiv>
          <ImgDiv src='/assets/img/commuMid.png'></ImgDiv>
          <Div>
            <MidTag>원하는 게시판에서 활동을 하고</MidTag>
            <MidTag2>게시판의 수명을 늘려주세요!</MidTag2>
          </Div>
        </FlexDiv>
      </MidDiv>
      <BottomDiv>
        <Div>
          <LifeTags>게시판 리스트</LifeTags>
          <CommuTopDiv>
            <CommuTopTitle>전체</CommuTopTitle>
            <CommuTopImg src='/assets/img/List.png'></CommuTopImg>
          </CommuTopDiv>
          <CommuListDiv>
            <ListsDiv>
              {commuList.slice(0, 7).map((item: CommuItem, id) => (
                <ListTag
                  key={id}
                  onClick={() =>
                    navigate(
                      `/community/${item.boardNo}?boardNo=${item.boardNo}`
                    )
                  }
                >
                  {item.title}
                </ListTag>
              ))}
            </ListsDiv>
            <LineDiv></LineDiv>
            <ListsDiv>
              {commuList.slice(7, 14).map((item: CommuItem, id) => (
                <ListTag
                  key={id}
                  onClick={() =>
                    navigate(
                      `/community/${item.boardNo}?boardNo=${item.boardNo}`
                    )
                  }
                >
                  {item.title}
                </ListTag>
              ))}
            </ListsDiv>
            <LineDiv></LineDiv>
            <ListsDiv>
              {commuList.slice(14, 21).map((item: CommuItem, id) => (
                <ListTag
                  key={id}
                  onClick={() =>
                    navigate(
                      `/community/${item.boardNo}?boardNo=${item.boardNo}`
                    )
                  }
                >
                  {item.title}
                </ListTag>
              ))}
            </ListsDiv>
          </CommuListDiv>
        </Div>
        <Div style={{ marginTop: '300px' }}>
          <LifeTags2>남은 게시판 생명</LifeTags2>
          <Lifename>곧 사라질 게시판들이에요. 활동이 필요해요!</Lifename>

          <FlexDiv>
            {commuLife.map((item: CommuLifeItem, id) => (
              <div key={id}>
                <LifeTag>Top.{id + 1}</LifeTag>
                <CommuPage
                  key={id}
                  onClick={() =>
                    navigate(
                      `/community/${item.no}?boardNo=${item.no}`
                    )
                  }
                >
                  {item.title}
                  {item.boardLife ? (
                    <BoardLife>Day {item.boardLife}</BoardLife>
                  ) : null}
                </CommuPage>
              </div>
            ))}
          </FlexDiv>
        </Div>
        <BottomText>혹시 원하는 게시판이 없으신가요?</BottomText>
        <BottomTag onClick={() => navigate('/communityCreate')}>
          게시판 만들러 가기
        </BottomTag>
      </BottomDiv>
    </CommunityDiv>
  );
};

export default CommunityMain;
