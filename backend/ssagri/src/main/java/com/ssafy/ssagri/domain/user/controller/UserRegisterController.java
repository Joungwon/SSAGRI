package com.ssafy.ssagri.domain.user.controller;

import com.ssafy.ssagri.domain.user.service.UserRegisterService;
import com.ssafy.ssagri.dto.user.UserRegisterDTO;
import com.ssafy.ssagri.util.exception.CustomException;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user/regist")
@Api(tags = "유저 회원가입에 사용되는 인증 로직 및 이메일 인증 관리에 사용되는 컨트롤러")
public class UserRegisterController {

    private final UserRegisterService userRegisterService;


    //유저 회원가입 최종 등록
    @PostMapping("/")
    public ResponseEntity<?> registUser(@RequestBody UserRegisterDTO userRegisterDTO) throws Exception {
        return userRegisterService.registUser(userRegisterDTO);
    }

    //닉네임 중복 확인
    @GetMapping("/check/nickname")
    public ResponseEntity<?> checkDuplicateNickname(@RequestParam("nickname")String nickname) throws CustomException {
        log.warn("NICKNAME 컨트롤러");
        return userRegisterService.checkDuplicateNickname(nickname);
    }

    //이메일 중복 확인
    @GetMapping("/check/email")
    public ResponseEntity<?> checkDuplicateEmail(@RequestParam("email")String email) throws CustomException {
        log.warn("EMAIL 컨트롤러");
        return userRegisterService.checkDuplicateEmail(email);
    }

    //인증번호 유효 검증(개발필요)
    @PostMapping("/check/auth-number")
    public ResponseEntity<?> checkNumberIsCorrect(@RequestParam("email") String email) throws CustomException {
        return userRegisterService.checkNumberIsCorrect(email);
    }

    //이미지 받기(개발필요)
    public ResponseEntity<?> getUserImageURI(@RequestParam("email") String email, @RequestParam("uri") String uri) throws CustomException {
        return userRegisterService.getUserImageURI(email, uri);
    }

}
