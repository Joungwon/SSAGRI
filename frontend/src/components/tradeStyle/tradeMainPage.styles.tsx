import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { ProductItemType } from '../type';

// Header 제외 중고거래 컴포넌트
const TradeMainFrameDiv = styled.div`
  width: 1920px;
  height: 900px;
  margin: 50px auto 0;
  /* border: 2px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// TradeMainFrameDiv의 가운데 부분. 여기에 지도와 거래 main 내용이 들어감
const TradeMainDiv = styled.div`
  width: 70%;
  height: 80%;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TradeMain = () => {
  const [region, setRegion] = useState<string>('서울');
  const regionList = ['서울', '대전', '구미', '광주', '부울경'];
  useEffect(() => {
    // console.log('region', region);
  }, [region]);
  return (
    <TradeMainFrameDiv>
      <TradeMainDiv>
        <TradeMainMap
          isList={false}
          setRegion={setRegion}
          setSearch={null}
          setCategory={null}
          regionList={regionList}
        ></TradeMainMap>
        <TradeMainProduct region={region}></TradeMainProduct>
      </TradeMainDiv>
    </TradeMainFrameDiv>
  );
};

// --- 지도 (main 좌측) ---
const TradeMainMapDiv = styled.div`
  width: 400px;
  height: 700px;
  position: relative;
  /* border: 2px solid green; */
  animation: fadein 1s ease-in-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
// -------- 지역 동그라미 CSS --------
const Seoul = styled.div`
  width: 50px;
  height: 50px;
  background-color: #adc4ff;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: 110px;
  left: 110px;
  box-shadow: 2px 2px 2px 1px #383838;

  &:hover {
    background-color: #ff5353;
  }
`;
const Dajeon = styled(Seoul)`
  top: 290px;
  left: 130px;
`;
const Gumi = styled(Seoul)`
  top: 310px;
  left: 240px;
`;
const Gwangju = styled(Seoul)`
  top: 480px;
  left: 50px;
`;
const Buwoolkyung = styled(Seoul)`
  font-size: 16px;
  top: 460px;
  left: 280px;
`;

export const TradeMainMap = ({
  isList,
  setRegion,
  setSearch,
  setCategory,
  regionList
}) => {
  const navigate = useNavigate();
  const mapGoTradeList = (region) => {
    setSearch('');
    setCategory('');
    navigate(`/tradeList?region=${region}`);
  };
  const changeRegion = (num: number) => {
    setRegion(regionList[num]);
    let selectedRegion: any;
    if (num == 0) {
      selectedRegion = document.querySelector('#seoul');
    } else if (num == 1) {
      selectedRegion = document.querySelector('#dajeon');
    } else if (num == 2) {
      selectedRegion = document.querySelector('#gumi');
    } else if (num == 3) {
      selectedRegion = document.querySelector('#gwangju');
    } else if (num == 4) {
      selectedRegion = document.querySelector('#buwoolkyung');
    }
    let allRegions = document.querySelectorAll('.region');
    allRegions.forEach((region: any) => {
      region.style.backgroundColor = '#adc4ff';
    });
    selectedRegion.style.backgroundColor = '#ff5353';
    let allCategory = document.querySelectorAll('.category');
    allCategory.forEach((category: any) => {
      category.style.color = '#000';
      category.style.fontWeight = 'normal';
      category.style.textDecoration = 'none';
    });
    let selectedCategory: any = document.querySelector('#allCategory');
    if (selectedCategory) {
      selectedCategory.style.color = '#4786fa';
      selectedCategory.style.fontWeight = 'bold';
      selectedCategory.style.textDecoration = 'underline';
    }
    if (isList) {
      mapGoTradeList(regionList[num]);
    }
  };
  return (
    <TradeMainMapDiv>
      <img
        src='/assets/img/koreaMap.jpg'
        alt=''
        style={{ width: '100%', height: '100%' }}
      />
      <Seoul id='seoul' className='region' onClick={() => changeRegion(0)}>
        서울
      </Seoul>
      <Dajeon id='dajeon' className='region' onClick={() => changeRegion(1)}>
        대전
      </Dajeon>
      <Gumi id='gumi' className='region' onClick={() => changeRegion(2)}>
        구미
      </Gumi>
      <Gwangju id='gwangju' className='region' onClick={() => changeRegion(3)}>
        광주
      </Gwangju>
      <Buwoolkyung
        id='buwoolkyung'
        className='region'
        onClick={() => changeRegion(4)}
      >
        부울경
      </Buwoolkyung>
    </TradeMainMapDiv>
  );
};

// --- 지역별 상품 (main 우측) ---
const TradeMainProductDiv = styled.div`
  width: 910px;
  height: 100%;
  /* border: 2px solid red; */
`;

const RegionAndSearch = styled.div`
  width: 860px;
  height: 60px;
  /* border: 2px solid blue; */
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 60px;
  animation: fadein 2s ease-in-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Region = styled.div`
  width: 152px;
  height: 45px;
  font-size: 30px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchRegion = styled.div`
  width: 130px;
  height: 40px;
  border: 1px solid #4786fa;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  background-color: #4786fa;
  color: #fff;
  box-shadow: 2px 2px 2px 1px #929292;
  &:hover {
    box-shadow: 2px 2px 3px 3px #757575;
  }
  animation: fadein 5s ease-in-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// 물품 등록
const ProductCreate = styled.div`
  width: 100px;
  height: 40px;
  margin-right: 25px;
  border: 1px solid #4786fa;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  background-color: #fff;
  color: #4786fa;
  box-shadow: 2px 2px 2px 1px #929292;
  &:hover {
    box-shadow: 2px 2px 3px 3px #757575;
    color: tomato;
  }
  animation: fadein 5s ease-in-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
// ------ 검색 입력 01 --------
const Search01 = styled.div`
  width: 500px;
  height: 40px;
  border: 1px solid #4786fa;
  border-radius: 20px;
  padding: 0px 30px 0px 0px;
  margin-right: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchInput01 = styled.input`
  width: 440px;
  height: 38px;
  border: 0;
  margin-left: 16px;
  font-size: 16px;
`;

// ------ 검색 입력 00 --------
const Search00 = styled(Search01)`
  /* width: 400px;
  margin-right: 0px; */
`;
const SearchInput00 = styled(SearchInput01)`
  /* width: 340px; */
`;

// ------ 검색 입력 02 --------
const Search02 = styled(Search01)`
  width: 600px;
`;
const SearchInput02 = styled(SearchInput01)`
  width: 540px;
`;

// ------ 검색 버튼 --------
const SearchButton = styled.button`
  background-color: #fff;
  border: 0;
  cursor: pointer;
`;
const SearchImg = styled.img`
  width: 20px;
  height: 20px;
  color: #4786fa;
`;

// ------ 최근 올라온 물품, 인기 있는 상품 --------
const RecentOrPopularProductDiv = styled.div`
  width: 900px;
  height: 320px;
  /* border: 2px solid green; */
  margin-left: 18px;
  animation: fadein 2.5s ease-in-out;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const RecentOrPopularProductTitle = styled.div`
  width: 850px;
  height: 50px;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
`;

// -------------------- Product v01 -------------------------
const ProductList01 = styled.div`
  width: 840px;
  height: 260px;
  /* border: 2px solid red; */
  display: flex;
  flex-wrap: wrap;
`;
const ProductStyle01 = styled.div`
  width: 180px;
  height: 240px;
  border: 2px solid #4786fa;
  border-radius: 20px;
  position: relative;
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 1px #757575;
  &:hover {
    box-shadow: 2px 2px 3px 3px #757575;
  }
`;
const ProductImgStyle01 = styled.img`
  width: 130px;
  height: 130px;
  /* border: 1px solid black; */
  border-radius: 10px;
`;
const ProductLike01 = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 7px;
  right: 10px;
`;
const ProductDetailStyle01 = styled.div`
  width: 160px;
  height: 80px;
  margin-top: 5px;
  /* border: 1px solid black; */
`;
const ProductName01 = styled.div`
  width: 150px;
  height: 38px;
  /* line-height: 38px; */
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ProductPrice01 = styled.div`
  width: 150px;
  height: 25px;
  margin-top: 2px;
  font-size: 20px;
  font-weight: bold;
`;
const SellerLocationAndTime01 = styled.div`
  width: 150px;
  height: 17px;
  margin-top: 3px;
  font-size: 12px;
  color: #929292;
`;

// -------------------- Product v02 -------------------------
const ProductList02 = styled(ProductList01)`
  height: auto;
  /* border: 1px solid green; */
  justify-content: start;
`;
const ProductStyle02 = styled(ProductStyle01)`
  width: 170px;
  margin: 10px 20px;
`;
const ProductImgStyle02 = styled(ProductImgStyle01)``;
const ProductLike02 = styled(ProductLike01)``;
const ProductDetailStyle02 = styled(ProductDetailStyle01)`
  width: 150px;
`;
const ProductName02 = styled(ProductName01)``;
const ProductPrice02 = styled(ProductPrice01)`
  font-size: 18px;
`;
const SellerLocationAndTime02 = styled(SellerLocationAndTime01)`
  margin-top: 2px;
`;

// -------------------- Product v03 -------------------------
const ProductList03 = styled(ProductList01)`
  width: 100%;
  height: auto;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;
const ProductStyle03 = styled(ProductStyle01)`
  width: 300px;
  height: 120px;
  margin: 10px 20px;
  flex-direction: row;
`;
const ProductImgStyle03 = styled(ProductImgStyle01)`
  width: 100px;
  height: 100px;
`;
const ProductLike03 = styled(ProductLike01)`
  top: 6px;
  right: 6px;
`;
const ProductDetailStyle03 = styled(ProductDetailStyle01)`
  height: 80px;
  margin-top: 0px;
  margin-left: 10px;
`;
const ProductName03 = styled(ProductName01)``;
const ProductPrice03 = styled(ProductPrice01)`
  font-size: 18px;
`;
const SellerLocationAndTime03 = styled(SellerLocationAndTime01)`
  margin-top: 2px;
`;

const SearchDiv01 = (regionText: any) => {
  const [search, setSearch] = useState<string>('');
  // console.log('TradeMain의 region 변화', regionText);
  const navigate = useNavigate();
  const goTradeList = (search: string) => {
    navigate(`/tradeList?region=${regionText.region}&search=${search}`);
  };

  return (
    <Search00>
      <SearchInput00
        type='text'
        placeholder='원하는 제품을 검색해 보세요!'
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            goTradeList(search);
          }
        }}
      ></SearchInput00>
      <SearchButton onClick={() => goTradeList(search)}>
        <SearchImg src='/assets/img/searchGlass-4786fa.png'></SearchImg>
      </SearchButton>
    </Search00>
  );
};
const SearchDiv02 = ({ regionText, category, search, setSearch }) => {
  const navigate = useNavigate();
  const goTradeList = (search: string) => {
    navigate(
      `/tradeList?region=${regionText}&category=${category}&search=${search}`
    );
  };
  return (
    <Search02>
      <SearchInput02
        id='trade-list-input'
        type='text'
        placeholder='원하는 제품을 검색해 보세요!'
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            goTradeList(search);
          }
        }}
      ></SearchInput02>
      <SearchButton>
        <SearchImg src='/assets/img/searchGlass-4786fa.png'></SearchImg>
      </SearchButton>
    </Search02>
  );
};
const AuctionSearchInput = () => {
  return (
    <Search01>
      <SearchInput01
        type='text'
        placeholder='원하는 제품을 검색해 보세요!'
      ></SearchInput01>
      <SearchButton>
        <SearchImg src='/assets/img/searchGlass-4786fa.png'></SearchImg>
      </SearchButton>
    </Search01>
  );
};

const TradeProductItem01 = ({ item }) => {
  // console.log('item : ', item);
  let productLike: string = '';
  if (item.like) {
    productLike = '/assets/img/heartColor.png';
  } else {
    productLike = '/assets/img/heartWhite.png';
  }

  // --- 지역 데이터는 도시가 아니라, "동" 단위로 가져와야 한다.

  // 날짜 포맷
  const formatDate = (date) => {
    const time = new Date(date);
    const timeNow = new Date();
    const diffSec = timeNow.getTime() - time.getTime();
    const minute = diffSec / (60 * 1000);
    if (minute < 1) {
      return `방금 전`;
    } else if (minute < 60) {
      return `${minute.toFixed(0)}분 전`;
    } else if (minute < 24 * 60) {
      return `${Math.floor(minute / 60)}시간 전`;
    } else if (minute < 24 * 60 * 30) {
      return `${Math.floor(minute / (24 * 60))}일 전`;
    } else {
      return `${Math.floor(minute / (24 * 60 * 30))}달 전`;
    }
  };

  // 지역 포맷
  const formatRegion = (region) => {
    switch (region) {
      case 'SEOUL':
        return '서울';
      case 'DAEJEON':
        return '대전';
      case 'GUMI':
        return '구미';
      case 'GWANGJU':
        return '광주';
      case 'BUG':
        return '부울경';
    }
  };

  const navigate = useNavigate();
  const goTradeDetail = (no: number) => {
    navigate(`/tradeDetail/${no}`);
  };
  return (
    <ProductStyle01 onClick={() => goTradeDetail(item.productNo)}>
      <ProductImgStyle01
        // src={item.usedProductPhotoResponseDto.link}
        src={item.usedProductPhotoResponseDto.link}
      ></ProductImgStyle01>
      <ProductLike01>
        <img
          src={productLike}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt='like'
        />
      </ProductLike01>
      <ProductDetailStyle01>
        <ProductName01>{item.title}</ProductName01>
        <ProductPrice01>{item.price} 원</ProductPrice01>
        <SellerLocationAndTime01>
          {formatRegion(item.region)} | {formatDate(item.createDate)}
        </SellerLocationAndTime01>
      </ProductDetailStyle01>
    </ProductStyle01>
  );
};
const TradeProductItem02 = ({ item }) => {
  // console.log('item : ', item);
  // console.log('item.item : ', item.item);

  let productLike: string = '';
  if (item.like) {
    productLike = '/assets/img/heartColor.png';
  } else {
    productLike = '/assets/img/heartWhite.png';
  }

  // 날짜 포맷
  const formatDate = (date) => {
    const time = new Date(date);
    const timeNow = new Date();
    const diffSec = timeNow.getTime() - time.getTime();
    const minute = diffSec / (60 * 1000);
    if (minute < 1) {
      return `방금 전`;
    } else if (minute < 60) {
      return `${minute.toFixed(0)}분 전`;
    } else if (minute < 24 * 60) {
      return `${Math.floor(minute / 60)}시간 전`;
    } else if (minute < 24 * 60 * 30) {
      return `${Math.floor(minute / (24 * 60))}일 전`;
    } else {
      return `${Math.floor(minute / (24 * 60 * 30))}달 전`;
    }
  };

  // 지역 포맷
  const formatRegion = (region) => {
    switch (region) {
      case 'SEOUL':
        return '서울';
      case 'DAEJEON':
        return '대전';
      case 'GUMI':
        return '구미';
      case 'GWANGJU':
        return '광주';
      case 'BUG':
        return '부울경';
    }
  };

  const navigate = useNavigate();
  const goTradeDetail = (no: number) => {
    navigate(`/tradeDetail/${no}`);
  };
  // --- 지역 데이터는 도시가 아니라, "동" 단위로 가져와야 한다.

  return (
    <ProductStyle02
      key={item.productNo}
      onClick={() => goTradeDetail(item.productNo)}
    >
      <ProductImgStyle02
        // src={item.usedProductPhotoResponseDto.link}
        src={item.usedProductPhotoResponseDto.link}
      ></ProductImgStyle02>
      <ProductLike02>
        <img
          src={productLike}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt='like'
        />
      </ProductLike02>
      <ProductDetailStyle02>
        <ProductName02>{item.title}</ProductName02>
        <ProductPrice02>{item.price} 원</ProductPrice02>
        <SellerLocationAndTime02>
          {formatRegion(item.region)} | {formatDate(item.createDate)}
        </SellerLocationAndTime02>
      </ProductDetailStyle02>
    </ProductStyle02>
  );
};
const TradeProductItem03 = ({ item, setProductNo }) => {
  let productLike: string = '';
  if (item.like) {
    productLike = '/assets/img/heartColor.png';
  } else {
    productLike = '/assets/img/heartWhite.png';
  }

  // 날짜 포맷
  const formatDate = (date) => {
    const time = new Date(date);
    const timeNow = new Date();
    const diffSec = timeNow.getTime() - time.getTime();
    const minute = diffSec / (60 * 1000);
    if (minute < 1) {
      return `방금 전`;
    } else if (minute < 60) {
      return `${minute.toFixed(0)}분 전`;
    } else if (minute < 24 * 60) {
      return `${Math.floor(minute / 60)}시간 전`;
    } else if (minute < 24 * 60 * 30) {
      return `${Math.floor(minute / (24 * 60))}일 전`;
    } else {
      return `${Math.floor(minute / (24 * 60 * 30))}달 전`;
    }
  };

  // 지역 포맷
  const formatRegion = (region) => {
    switch (region) {
      case 'SEOUL':
        return '서울';
      case 'DAEJEON':
        return '대전';
      case 'GUMI':
        return '구미';
      case 'GWANGJU':
        return '광주';
      case 'BUG':
        return '부울경';
    }
  };

  const navigate = useNavigate();
  const goTradeDetail = (no: number) => {
    setProductNo(no);
    navigate(`/tradeDetail/${no}`);
  };

  // --- 지역 데이터는 도시가 아니라, "동" 단위로 가져와야 한다.

  return (
    <ProductStyle03 onClick={() => goTradeDetail(item.productNo)}>
      <ProductImgStyle03
        // src={item.usedProductPhotoResponseDto.link}
        src={item.usedProductPhotoResponseDto.link}
      ></ProductImgStyle03>
      <ProductLike03>
        <img
          src={productLike}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt='like'
        />
      </ProductLike03>
      <ProductDetailStyle03>
        <ProductName03>{item.title}</ProductName03>
        <ProductPrice03>{item.price} 원</ProductPrice03>
        <SellerLocationAndTime03>
          {formatRegion(item.region)} | {formatDate(item.createDate)}
        </SellerLocationAndTime03>
      </ProductDetailStyle03>
    </ProductStyle03>
  );
};

const TradeMainProduct = (region) => {
  const [recentData, setRecentData] = useState([]);
  const [popularData, setPopularData] = useState([]);

  let regionText: string = '';

  switch (region.region) {
    case '서울':
      regionText = 'SEOUL';
      break;
    case '대전':
      regionText = 'DAEJEON';
      break;
    case '구미':
      regionText = 'GUMI';
      break;
    case '광주':
      regionText = 'GWANGJU';
      break;
    case '부울경':
      regionText = 'BUG';
      break;
  }

  // console.log(regionText);
  const navigate = useNavigate();
  const goTradeList = (regionText) => {
    // console.log('change Page to List', regionText);
    navigate(`/tradeList?region=${regionText}`);
  };
  const goProductCreate = () => {
    // console.log('change Page to List', regionText);
    navigate(`/tradeCreate`);
  };

  const userNo = localStorage.getItem('userNo');
  const accessToken = sessionStorage.getItem('accessToken');
  axios.defaults.headers.common['Authorization'] = `${accessToken}`;

  useEffect(() => {
    // recentData
    axios
      .get(
        `/usedproduct/${userNo}?region=${regionText}&sort=no,desc&page=0&size=4`
      )
      .then((res) => {
        setRecentData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    // popularData
    axios
      .get(
        `/usedproduct/${userNo}?region=${regionText}&sort=like,desc&page=0&size=4`
      )
      .then((res) => {
        setPopularData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [regionText]);

  return (
    <TradeMainProductDiv>
      <RegionAndSearch>
        <Region>지역: {region.region} </Region>
        <SearchRegion onClick={() => goTradeList(regionText)}>
          지역 물품 목록
        </SearchRegion>
        <SearchDiv01 region={region.region}></SearchDiv01>
      </RegionAndSearch>
      <RecentOrPopularProductDiv>
        <RecentOrPopularProductTitle>
          방금 등록된 물품
          <ProductCreate onClick={goProductCreate}>물품 등록</ProductCreate>
        </RecentOrPopularProductTitle>
        <ProductList01>
          {recentData.map((item: ProductItemType, id) => (
            <TradeProductItem01 key={id} item={item}></TradeProductItem01>
          ))}
        </ProductList01>
      </RecentOrPopularProductDiv>
      <RecentOrPopularProductDiv>
        <RecentOrPopularProductTitle>
          실시간 인기 물품
        </RecentOrPopularProductTitle>
        <ProductList01>
          {popularData.map((item: ProductItemType, id) => (
            <TradeProductItem01 key={id} item={item}></TradeProductItem01>
          ))}
        </ProductList01>
      </RecentOrPopularProductDiv>
    </TradeMainProductDiv>
  );
};

export {
  TradeMain,
  SearchDiv02,
  AuctionSearchInput,
  ProductList02,
  TradeProductItem02,
  ProductList03,
  TradeProductItem03
};
