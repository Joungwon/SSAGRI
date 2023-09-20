package com.ssafy.ssagri.domain.user.service;

import com.ssafy.ssagri.domain.user.repository.UserLoginAndLogoutRepository;
import com.ssafy.ssagri.domain.user.repository.UserRegistRepository;
import com.ssafy.ssagri.domain.user.repository.UserTokenRepository;
import com.ssafy.ssagri.dto.user.ResponseDTO;
import com.ssafy.ssagri.dto.user.UserLoginDTO;
import com.ssafy.ssagri.entity.user.RefreshToken;
import com.ssafy.ssagri.util.exception.CustomException;
import com.ssafy.ssagri.util.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.ssafy.ssagri.util.ResponseStatusEnum.LOGIN_IS_OK;
import static com.ssafy.ssagri.util.ResponseStatusEnum.REGISTER_NICKNAME_IS_OK;
import static com.ssafy.ssagri.util.exception.CustomExceptionStatus.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserLoginAndLogoutService {

    private final UserLoginAndLogoutRepository userLoginAndLogoutRepository;
    private final UserTokenRepository userTokenRepository;

    /**
     * 해당 메서드를 중심으로 하여 모듈화된 메서드를 통합
     * @param userLoginDTO
     * @return responseResult
     * @throws CustomException
     */
    @Transactional
    public ResponseEntity<ResponseDTO> loginUser(UserLoginDTO userLoginDTO) throws CustomException {
        //1. 유저 DB 존재 체크
        ResponseEntity<ResponseDTO> responseResult = checkAccount(userLoginDTO);
        Long userNo = userLoginAndLogoutRepository.getUserNoUsingEmail(userLoginDTO.getEmail()); //userNo 찾기

        //2. 유저가 존재한다면 Access token과 Refresh token 발급
        String accessToken = getToken(userNo, "Access");
        String refreshToken = getToken(userNo, "Refresh");
        log.info("토큰 : {} {}", accessToken, refreshToken);

        //3. Redis에 Refresh 토큰 저장
        saveRefreshToken(userNo, refreshToken);

        //4. 유저에게 토큰 및 메시지 발급
        return responseResult;
    }

    private void saveRefreshToken(Long userNo, String refreshToken) throws CustomException{
        try {
            userTokenRepository.save(new RefreshToken(userNo, refreshToken));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(LOGIN_SAVE_TOKEN_ERROR);
        }
    }

    public ResponseEntity<ResponseDTO> checkAccount(UserLoginDTO userLoginDTO) throws CustomException {
        String email = userLoginDTO.getEmail();
        String password = userLoginDTO.getPassword();
        if (!userLoginAndLogoutRepository.isAccountIsExists(email, password)) {
            throw new CustomException(LOGIN_HAVE_NO_ACCOUT);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(LOGIN_IS_OK.getCode(),LOGIN_IS_OK.getMessage()));
    }

    public String getToken(Long userNo, String tokenType) throws CustomException {
        try {
            log.info("{} {}", userNo, tokenType);
            switch (tokenType) {
                case "Access" :
                    return JwtUtil.createAccessToken(userNo);
                case "Refresh" :
                    return JwtUtil.createRefreshToken(userNo);
                default:
                    throw new Exception();
            }
        }
        catch (Exception e) {
            throw new CustomException(LOGIN_GET_TOKEN_ERROR);
        }
    }
}
