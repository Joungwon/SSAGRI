import { styled, keyframes } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { Avatar } from 'antd';
import axios from 'axios';
import { onLoginSuccess } from '../utils/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInAtom } from '../states/account/loginAtom';

const show = keyframes`
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  /* border: 2px solid red; */
`;

const H1 = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const A = styled.a`
  color: #4786fa;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid #4786fa;
  background-color: #4786fa;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &.inactive {
    cursor: default;
    opacity: 0.5;
  }
`;

// 중복확인 버튼
const DoubleCheck = styled.button`
  cursor: pointer;
  width: 180px;
  height: 42px;

  border: none;
  background-color: grey;
  color: white;
  letter-spacing: 0.5px;

  &.inactive {
    cursor: default;
    opacity: 0.5;
  }
`;

const Verify = styled.button`
  cursor: pointer;
  width: 180px;
  height: 42px;

  border: none;
  background-color: grey;
  color: white;
  letter-spacing: 0.5px;

  &.inactive {
    cursor: default;
    opacity: 0.5;
  }
`;

const Select = styled.select`
  width: 60px;
  height: 42px;
  margin: 8px 0px;
`;

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  gap: 5px;
`;

const SelectLabel = styled.label`
  display: flex;
  font-weight: bold;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  height: 42px;
`;

const FileInput = styled.input`
  display: none;
`;
// @ts-ignore
const CustomFileInput = styled(FileInput)`
  /* 여기에 원하는 스타일 추가*/
`;

// Container
const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 1200px;
  top: 100px;
  max-width: 100%;
  min-height: 800px;
`;

// input form
const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;

  &.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;

    &.right-panel-active {
      transform: translateX(100%);
    }
  }

  &.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;

    &.right-panel-active {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: ${show} 0.6s;
    }
  }
`;

const FormContent = styled.div`
  margin: 30px 0;
`;

const ValidMsg = styled.div`
  color: green;
  font-size: 12px;
`;

const InvalidMsg = styled.div`
  color: #ff4b2b;
  font-size: 12px;
`;

// overlay Container
const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  &.right-panel-active {
    transform: translateX(-100%);
  }
`;

const Overlay = styled.div`
  background-image: url('/assets/img/overlayImg.png');
  background-size: contain;
  /* background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  &.right-panel-active {
    transform: translateX(50%);
  }
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 0 40px; */
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  &.overlay-left {
    transform: translateX(0);
  }

  &.overlay-right {
    right: 0;
    transform: translateX(0);
  }
`;

const KakaoLogin = styled.div`
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  height: 42px;
`;

const SignInAndUpComponent = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();
  // console.log('state: ', state);

  const [image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  // 프로필 사진 관련
  // @ts-ignore
  const [profile, setProfile] = useState(null);
  const fileInput = useRef(null);

  const [profileImgUrl, setProfileImgUrl] = useState('');

  const formData = new FormData(); // 사진 담아서 전달할 데이터

  // 프로필 사진 등록
  const onChange = (e) => {
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);

      const uploadFile = e.target.files[0];
      formData.append('upload-file', uploadFile);

      for (let image of formData.entries()) {
        console.log(image);
      }
    } else {
      // 업로드 취소할 시
      setProfile(null);
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
      return;
    }
    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // @ts-ignore
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // 회원가입 시 프로필 사진 등록 요청
  const uploadProfile = async () => {
    try {
      // @ts-ignore
      formData.append('upload-file', profile);
      const response = await axios.post(
        `/user/regist/upload/profile`,
        formData
      );
      setProfileImgUrl(response.data);
      return response.data;
    } catch (error) {
      console.error('프로필 이미지 업로드 실패: ', error);
    }
  };

  // 로그인 //

  // 로그인 입력 폼
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  // 안내 메시지
  const [signInEmailMessage, setSignInEmailMessage] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setSignInForm({ ...signInForm, email: currentEmail });
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (currentEmail && !emailRegExp.test(currentEmail)) {
      setSignInEmailMessage('이메일의 형식이 올바르지 않습니다!');
      setIsEmail(false);
    } else {
      setSignInEmailMessage('');
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    setSignInForm({ ...signInForm, password: e.target.value });
  };

  // 로그인여부
  // @ts-ignore
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  // 로그인 요청 api
  const onLoginHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: signInForm.email,
      password: signInForm.password
    };

    try {
      const res = await axios.post('/user/login/', data);

      // 첫 번째 비동기 작업: 로그인 성공 시 처리
      onLoginSuccess(res);
      setIsLoggedIn(true);

      // 마지막 비동기 작업: 메인페이지로 이동
      await navigate('/');
    } catch (error) {
      // ... 에러 처리
      // @ts-ignore
      if (error.response.data.message === '일치하는 계정이 없습니다.') {
        alert('아이디나 비밀번호를 다시 확인해주세요.');
      }
    }
  };

  // 소셜 로그인 요청 api
  const onSocialLogin = () => {
    axios
      .get('/oauth/page')
      .then((res) => {
        console.log('여기로 리다이렉팅 해야함: ', res.data);
        const link = res.data;
        window.location.href = link;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 회원가입 //
  const regionList = ['대전', '서울', '구미', '광주', '부울경'];
  const cardinalList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    region: regionList[0],
    cardinalNumber: cardinalList[0],
    nickname: ''
  });

  const [isEmailStyle, setIsEmailStyle] = useState(false); // 유효한 이메일 형식인지
  const [isEmailUnique, setIsEmailUnique] = useState(false); // 이메일 중복 확인 여부

  // 회원가입에 필요한 입력요소들 유효성 검사
  // @ts-ignore
  const [isEmailValid, setIsEmailValid] = useState(false); // 인증 완료한 이메일인지
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  // @ts-ignore
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameUnique, setIsNicknameUnique] = useState(false);

  // 인증번호 확인 창 보이는 여부
  const [showVerify, setShowVerify] = useState(false);

  // 안내 메시지
  const [signUpEmailMessage, setSignUpEmailMessage] = useState('');
  const [signUpPasswordMessage, setSignUpPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  // @ts-ignore
  const [nickNameMessage, setNicknameMessage] = useState('');

  const onChangeEmailSignUp = (e) => {
    setSignUpForm({ ...signUpForm, email: e.target.value });
    // 값이 바뀌면 중복 확인 여부와 인증 여부를 초기화
    setIsEmailUnique(false);
    setIsEmailValid(false);
    // 이메일 형식 유효성 검증
    const emailRegex =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (e.target.value) {
      // 입력값이 존재
      if (!emailRegex.test(e.target.value)) {
        // 유효성 검증 실패
        setSignUpEmailMessage('이메일의 형식이 올바르지 않습니다!');
        setIsEmailStyle(false);
      } else {
        // 유효성 검증 성공
        setSignUpEmailMessage('');
        setIsEmailStyle(true);
      }
    } else {
      // 입력값이 없는 경우
      setSignUpEmailMessage('');
      setIsEmailStyle(false);
    }
  };

  const onChangeSignUpPassword = (e) => {
    setSignUpForm({ ...signUpForm, password: e.target.value });
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (e.target.value) {
      // 입력값 존재
      if (!passwordRegex.test(e.target.value)) {
        // 유효성 검증 실패
        setSignUpPasswordMessage(
          '숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!'
        );
        setIsPasswordValid(false);
      } else {
        // 유효성 검증 성공
        setSignUpPasswordMessage('안전한 비밀번호입니다 : )');
        setIsPasswordValid(true);
      }
    } else {
      // 입력값이 없는 경우
      setSignUpPasswordMessage('');
      setIsPasswordValid(false);
    }
  };

  const onChangePasswordConfirm = (e) => {
    setSignUpForm({ ...signUpForm, passwordConfirm: e.target.value });

    if (e.target.value) {
      // 입력값 존재
      if (e.target.value === signUpForm.password) {
        setPasswordConfirmMessage('입력한 비밀번호와 일치합니다.');
        setIsConfirmValid(true);
      } else {
        setPasswordConfirmMessage('입력한 비밀번호와 일치하지 않습니다.');
        setIsConfirmValid(false);
      }
    } else {
      // 입력값이 없는 경우
      setPasswordConfirmMessage('');
      setIsConfirmValid(false);
    }
  };

  const onChangeNickname = (e) => {
    setSignUpForm({ ...signUpForm, nickname: e.target.value });
    setIsNicknameValid(false);
    setNicknameMessage('');

    const nameRegex = /^[A-Za-z0-9가-힣]{2,8}$/;

    if (e.target.value) {
      // 입력값이 있는 경우
      if (!nameRegex.test(e.target.value)) {
        // 유효성 검사 실패
        setIsNicknameValid(false);
        setNicknameMessage('영어 대소문자, 숫자, 한글로 2~8자리 입력해주세요');
      } else {
        // 유효한 경우
        setIsNicknameValid(true);
        setNicknameMessage('');
      }
    } else {
      // 입력값이 없는 경우
      setIsNicknameValid(false);
      setNicknameMessage('');
    }
  };

  // 소셜 로그인으로 회원가입하는 경우
  const location = useLocation();
  const [isKakao, setIsKakao] = useState(false);
  const [socialProfileURL, setSocialProfileURL] = useState('');

  // 프로필 사진과 이메일 닉네임을 기본값으로 바꿔주고
  // 이메일은 변경 불가, 중복된 이메일이 있는지는 백엔드에서 분별해줌

  useEffect(() => {
    if (location.state) {
      setIsKakao(true);
      const userData = location.state.userData;

      if (userData) {
        signUpForm.email = userData.email;
        signUpForm.nickname = userData.nickname;
        setImage(userData.profileURL);
        setSocialProfileURL(userData.profileURL);
      }

      setIsEmailValid(true);
      setIsPasswordValid(true);
      setIsConfirmValid(true);
    }
  }, []);

  // 이메일 중복확인
  const doubleCheckEmail = (e) => {
    e.preventDefault();
    if (signUpForm.email) {
      axios
        .get('/user/regist/check/email', {
          params: {
            email: signUpForm.email
          }
        })
        .then(() => {
          // 이메일이 사용가능한 경우
          setSignUpEmailMessage('사용 가능한 이메일입니다.');
          setIsEmailUnique(true);
        })
        .catch((err) => {
          // 이미 등록된 이메일인 경우
          console.log(err);
          setSignUpEmailMessage('이미 등록된 이메일입니다.');
          setIsEmailUnique(false);
        });
    }
  };

  // 이메일 인증번호 전송
  const sendEmail = (e) => {
    e.preventDefault();

    axios
      .get('/user/regist/send-email', {
        params: {
          email: signUpForm.email
        }
      })
      .then((res) => {
        // 메일 전송 성공
        setShowVerify(true);
        console.log(res);
      })
      .catch((err) => {
        // 메일 전송 실패
        setShowVerify(false);
        console.log(err);
      });
  };

  // 사용자가 입력한 이메일 인증번호
  const [verifyCode, setVerifyCode] = useState('');

  const onChangeVerifyCode = (e) => {
    setVerifyCode(e.target.value);
  };

  // 인증번호 확인
  const checkVerificationCode = (e) => {
    e.preventDefault();

    axios
      .get('/user/regist/check/authcode-valid', {
        params: {
          authcode: verifyCode
        }
      })
      .then((res) => {
        // 인증 완료
        console.log(res);
        // 이메일 인증 여부 true로 바꾼다.
        setIsEmailValid(true);
        setSignUpEmailMessage('인증이 완료되었습니다.');
      })
      .catch((err) => {
        // 인증 실패
        console.log(err);
        // 이메일 인증 여부 false
        setIsEmailValid(false);
      });
  };

  // 닉네임 중복확인
  const doubleCheckNickname = (e) => {
    e.preventDefault();
    if (signUpForm.nickname) {
      axios
        .get('/user/regist/check/nickname', {
          params: {
            nickname: signUpForm.nickname
          }
        })
        .then(() => {
          // 닉네임이 사용가능한 경우
          setNicknameMessage('사용 가능한 닉네임입니다.');
          setIsNicknameUnique(true);
        })
        .catch(() => {
          // 이미 등록된 닉네임인 경우
          setNicknameMessage('사용중인 닉네임입니다.');
          setIsNicknameUnique(false);
        });
    }
  };

  // 지역 필터링
  const regionFormat = (region: string) => {
    if (region === '서울') {
      return 'SEOUL';
    } else if (region === '구미') {
      return 'GUMI';
    } else if (region === '광주') {
      return 'GWANGJU';
    } else if (region === '부울경') {
      return 'BUG';
    } else {
      return 'DAEJEON';
    }
  };

  // 회원가입 요청
  const signUpUser = async (profileImageUrl) => {
    const now = new Date();
    console.log(now);

    const data = {
      profile: isKakao ? socialProfileURL : profileImageUrl,
      email: signUpForm.email,
      password: signUpForm.password,
      regions: regionFormat(signUpForm.region),
      number: parseInt(signUpForm.cardinalNumber),
      nickname: signUpForm.nickname,
      userCreateType: isKakao ? 'KAKAO' : 'NORMAL', // 'NORMAL', 'KAKAO'
      userCreateDate: now
    };

    try {
      const response = await axios.post(`/user/regist/`, data);
      return response;
    } catch (error) {
      console.error('회원가입 실패: ', error);
      throw error;
    }
  };

  const [socialSignUpDone, setSocialSignUpDone] = useState(false);

  // 회원가입 버튼 클릭시
  const onSignUp = async (e) => {
    e.preventDefault();

    try {
      // 프로필 사진 이미지 경로 반환받아 profileImgUrl에 저장
      const profileImageUrl = await uploadProfile();
      // 반환받은 이미지 URL을 활용해 회원가입 요청
      const response = await signUpUser(profileImageUrl);

      console.log('회원가입 성공: ', response);
      setSocialSignUpDone(true);
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('회원가입 실패: ', error);
    }
  };

  const [joinBtnActive, setJoinBtnActive] = useState(false);

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    // @ts-ignore
    const container = document.getElementById('container');

    const OverlayContainer = document.getElementById('overlay-container');
    const Overlay = document.getElementById('overlay');
    const signInContainer = document.getElementById('sign-in-container');
    const signUpContainer = document.getElementById('sign-up-container');

    const signUpClickHandler = () => {
      // @ts-ignore
      signInContainer.classList.add('right-panel-active');
      // @ts-ignore
      signUpContainer.classList.add('right-panel-active');
      // @ts-ignore
      OverlayContainer.classList.add('right-panel-active');
      // @ts-ignore
      Overlay.classList.add('right-panel-active');
    };

    const signInClickHandler = () => {
      // @ts-ignore
      signInContainer.classList.remove('right-panel-active');
      // @ts-ignore
      signUpContainer.classList.remove('right-panel-active');
      // @ts-ignore
      OverlayContainer.classList.remove('right-panel-active');
      // @ts-ignore
      Overlay.classList.remove('right-panel-active');
    };
    // @ts-ignore
    signUpButton.addEventListener('click', signUpClickHandler);
    // @ts-ignore
    signInButton.addEventListener('click', signInClickHandler);

    // 소셜 회원가입 시 카카오 계정 로그인이 되면 회원가입 창이 나오도록
    if (location.state) {
      signUpClickHandler();
    }

    // 소셜 회원가입 완료되면 로그인 창이 나오도록
    if (socialSignUpDone) {
      signInClickHandler();
    }

    return () => {
      // @ts-ignore
      signUpButton.removeEventListener('click', signUpClickHandler);
      // @ts-ignore
      signInButton.removeEventListener('click', signInClickHandler);
    };
  }, [socialSignUpDone]);

  useEffect(() => {
    if (isEmailValid && isPasswordValid && isConfirmValid && isNicknameUnique) {
      setJoinBtnActive(true);
    } else {
      setJoinBtnActive(false);
    }
  }, [isEmailValid, isPasswordValid, isConfirmValid, isNicknameUnique]);

  return (
    <Container id='container' style={{ margin: 'auto' }}>
      {/* 로그인 폼*/}
      <FormContainer className='sign-in-container' id='sign-in-container'>
        <Form>
          <H1>로그인</H1>
          <div className='social-container'>
            <KakaoLogin onClick={onSocialLogin}>
              <img
                src='/assets/img/kakao_login_medium_wide.png'
                alt='카카오 로그인'
              />
            </KakaoLogin>
          </div>
          <FormContent>
            <Label htmlFor='email'>
              이메일
              <div style={{ color: 'red', fontSize: '12px' }}>
                {!isEmail ? signInEmailMessage : null}
              </div>
            </Label>
            <Input
              type='email'
              value={signInForm.email}
              onChange={onChangeEmail}
            ></Input>
            <Label htmlFor='password'>비밀번호</Label>
            <Input
              type='password'
              value={signInForm.password}
              onChange={onChangePassword}
            ></Input>
            <A>비밀번호를 잊으셨나요?</A>
          </FormContent>
          <Button onClick={onLoginHandler}>로그인</Button>
        </Form>
      </FormContainer>
      {/* 회원가입 폼*/}
      <FormContainer className='sign-up-container' id='sign-up-container'>
        <Form>
          <H1>회원가입</H1>
          <div className='social-container'>
            <KakaoLogin onClick={onSocialLogin}>
              <img
                src='/assets/img/kakao_login_medium_narrow.png'
                alt='카카오 로그인'
              />
            </KakaoLogin>
          </div>
          <FormContent>
            <Label htmlFor='profile-img'>프로필 사진</Label>
            <Avatar
              src={image}
              style={{ margin: '20px' }}
              size={200}
              onClick={() => {
                // @ts-ignore
                fileInput.current.click();
              }}
            ></Avatar>
            <img style={{ width: '200px' }} src={profileImgUrl} />
            <FileInput
              type='file'
              accept='image/jpg, image/png, image/jpeg'
              name='profile_img'
              onChange={onChange}
              ref={fileInput}
            ></FileInput>
            <Label htmlFor='email'>
              <div>이메일</div>
              {isEmailUnique ? (
                <ValidMsg>{signUpEmailMessage}</ValidMsg>
              ) : (
                <InvalidMsg>{signUpEmailMessage}</InvalidMsg>
              )}
            </Label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Input
                type='email'
                value={signUpForm.email}
                onChange={onChangeEmailSignUp}
              ></Input>
              <DoubleCheck
                className={'' + (!isEmailStyle && 'inactive')}
                disabled={!isEmailStyle}
                onClick={doubleCheckEmail}
              >
                중복 확인
              </DoubleCheck>
              <Verify
                className={'' + (!isEmailUnique && 'inactive')}
                disabled={!isEmailUnique}
                onClick={sendEmail}
              >
                인증번호 전송
              </Verify>
            </div>
            {showVerify ? (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'end'
                }}
              >
                <Input
                  style={{ width: '102px' }}
                  type='text'
                  value={verifyCode}
                  onChange={onChangeVerifyCode}
                ></Input>
                <Verify
                  style={{ width: '102px' }}
                  onClick={checkVerificationCode}
                >
                  인증번호 확인
                </Verify>
              </div>
            ) : null}
            {!isKakao ? (
              <div>
                <Label htmlFor='password'>
                  <div>비밀번호</div>
                  {isPasswordValid ? (
                    <ValidMsg>{signUpPasswordMessage}</ValidMsg>
                  ) : (
                    <InvalidMsg>{signUpPasswordMessage}</InvalidMsg>
                  )}
                </Label>
                <Input
                  type='password'
                  value={signUpForm.password}
                  onChange={onChangeSignUpPassword}
                ></Input>
                <Label htmlFor='passwordConfirm'>
                  <div>비밀번호 확인</div>
                  {isConfirmValid ? (
                    <ValidMsg>{passwordConfirmMessage}</ValidMsg>
                  ) : (
                    <InvalidMsg>{passwordConfirmMessage}</InvalidMsg>
                  )}
                </Label>
                <Input
                  type='password'
                  value={signUpForm.passwordConfirm}
                  onChange={onChangePasswordConfirm}
                ></Input>
              </div>
            ) : null}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <SelectLabel htmlFor='region'>
                <p style={{ width: '40px', lineHeight: '24px' }}>지역</p>
                <Select
                  name='region'
                  value={signUpForm.region}
                  onChange={(e) =>
                    setSignUpForm({ ...signUpForm, region: e.target.value })
                  }
                >
                  {regionList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </SelectLabel>
              <SelectLabel htmlFor='cardinal-number'>
                <p style={{ width: '40px', lineHeight: '24px' }}>기수</p>
                <Select
                  name='cardinal-number'
                  value={signUpForm.cardinalNumber}
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      cardinalNumber: e.target.value
                    })
                  }
                >
                  {cardinalList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </SelectLabel>
              <Label htmlFor='nickname'>
                <p style={{ width: '70px', lineHeight: '24px' }}>닉네임</p>
                <Input
                  type='text'
                  value={signUpForm.nickname}
                  onChange={onChangeNickname}
                ></Input>
              </Label>
              <DoubleCheck onClick={doubleCheckNickname}>중복 확인</DoubleCheck>
            </div>
            {isNicknameValid ? (
              <ValidMsg style={{ textAlign: 'end' }}>
                {nickNameMessage}
              </ValidMsg>
            ) : (
              <InvalidMsg style={{ textAlign: 'end' }}>
                {nickNameMessage}
              </InvalidMsg>
            )}
          </FormContent>
          <Button
            className={'' + (!joinBtnActive && 'inactive')}
            disabled={!joinBtnActive}
            onClick={onSignUp}
          >
            회원 가입
          </Button>
        </Form>
      </FormContainer>
      <OverlayContainer id='overlay-container'>
        <Overlay id='overlay'>
          <OverlayPanel className='overlay-left'>
            <H1>회원이신가요?</H1>
            <P>계정이 이미 있으시다면</P>
            <Button id='signIn'>로그인</Button>
          </OverlayPanel>
          <OverlayPanel className='overlay-right'>
            <H1>안녕하세요!</H1>
            <P>처음이시라면 회원가입 후 필요한 물건을 구해보세요</P>
            <Button id='signUp'>회원가입</Button>
          </OverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export { LoginPage, SignInAndUpComponent };
