package com.ssafy.ssagri.util.oauth.contoller;

import com.ssafy.ssagri.domain.user.repository.UserRegistAndModifyRepository;
import com.ssafy.ssagri.domain.user.service.UserLoginAndLogoutService;
import com.ssafy.ssagri.util.exception.CustomException;
import com.ssafy.ssagri.util.oauth.service.OauthService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import static com.ssafy.ssagri.util.exception.CustomExceptionStatus.OAUTH_KAKAO_NOT_VALID_EMAIL;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
@Slf4j
@Api(tags = "[Oauth](Kakao) 컨트롤러")
public class OauthController {

    private final OauthService oauthService;
    private final UserRegistAndModifyRepository userRegistAndModifyRepository;
    private final UserLoginAndLogoutService userLoginAndLogoutService;

    /*
    1. 인증 : 카카오 로그인 이후
    여기가 카카오 리다이렉팅 주소. 사용자 동의를 거쳐 인가 코드를 발급합니다.
    동의 화면은 앱에 설정된 동의 항목에 대해 사용자에게 인가(동의)를 구합니다.
    인가 코드는 동의 화면을 통해 인가받은 동의 항목 정보를 갖고 있으며, 인가 코드를 사용해 토큰 받기를 요청할 수 있습니다.
    OpenID Connect를 사용하는 앱일 경우, 앱 설정에 따라 ID 토큰을 함께 발급받을 수 있는 인가 코드를 발급합니다.
    => 이거 받은 값으로 토큰 받기를 수행해야 한다.

    2. 토큰 코드 받기
    인가코드만으로는 정상적인 로그인을 할 수 없다. 토큰까지 받아와야 정말로 로그인 처리가 되는 것이다.

    3. 파싱
    토큰 코드 내부의 유저 액세스 토큰을 사용하여, KAKAO API에 유저 정보를 추가 요청 후 파싱한다.
     */

    @GetMapping
    @Operation(summary = "로그인 결과값 가져오기", description = "KAKAO 로그인 시 해당 API로 리다이렉팅됩니다. \n" +
            "일부러 호출할 필요는 없습니다.(카카오 로그인 시 자동 리다이렉팅)\n" +
            "1. 인가된 코드를 바탕으로 유효한 토큰을 받아옵니다.\n" +
            "2. 토큰 내부의 엑세스 토큰으로 유저 정보를 요청한 뒤, 이를 파싱 후 핵심 정보만 가져옵니다. \n" +
            "결과적으로 nickname, profile, email의 세 가지 정보를 리턴합니다.")
    public String[] getToken(@RequestParam("code") String code) {
        String accessToken = oauthService.getToken(code); //2. 토큰 받기
        return oauthService.getUserInfo(accessToken); //3. 유저 정보를 추가 요청 후 파싱
    }

    @GetMapping("/page")
    @Operation(summary = "카카오 로그인 페이지 url", description = "요청 시 카카오 로그인 페이지를 가져옵니다.")
    public String getLoginPage() {
        return oauthService.getKakaoLoginPage();
    }

    //카카오 로그인하기 : 이 부분 토큰 인가 추가 과정 필요
    //로그인 oauth 결과값을 BE -> FE로 넘겨줄 때 RT토큰을 같이 보내야 함(바로 이 주소로 로그인하면 뚫리는 문제 발생, 이후 FE에서 이쪽 엔드포인트로 토큰 포함)
    @GetMapping("/kakao-login")
    @Operation(summary = "카카오 로그인", description = "1. 카카오 로그인 창에서 로그인 \n" +
            "2. 백엔드에서 로그인한 유저의 핵심 정보를 FE로 넘겨줍니다.\n" +
            ">> 3. FE에서는 다시 백엔드로 이메일을 보내줍니다. : 이 부분에 해당하는 컨트롤러입니다.(1~2는 그냥 로그인 링크) <<" +
            "FE에서는 email을 Param으로 넘겨주시면 됩니다. 이후 해당 이메일이 존재한다면 맞는 계정으로 로그인합니다.\n" +
            "계정이 맞지 않다면 OAUTH_KAKAO_NOT_VALID_EMAIL(-901, \"해당 계정이 존재하지 않습니다.\") 가 발생합니다. \n" +
            "이후는 기존 로그인 로직과 동일합니다.")
    public ResponseEntity<?> kakaoLogin(@RequestParam("email") String email, HttpServletResponse response) {
        if(!userRegistAndModifyRepository.isEmailExists(email)) throw new CustomException(OAUTH_KAKAO_NOT_VALID_EMAIL); //이메일 존재 체크
        return userLoginAndLogoutService.loginUserForKakao(response, email);
    }

}
