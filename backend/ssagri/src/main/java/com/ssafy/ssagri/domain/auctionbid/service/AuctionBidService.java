package com.ssafy.ssagri.domain.auctionbid.service;

import com.ssafy.ssagri.domain.auction.repository.AuctionRepository;
import com.ssafy.ssagri.domain.auctionbid.dto.AuctionBidSaveRequestDto;
import com.ssafy.ssagri.domain.auctionbid.dto.AuctionBidSelectResponseDto;
import com.ssafy.ssagri.domain.auctionbid.repository.AuctionBidRepository;
import com.ssafy.ssagri.domain.user.repository.UserRegistAndModifyRepository;
import com.ssafy.ssagri.entity.auction.AuctionBid;
import com.ssafy.ssagri.entity.auction.AuctionProduct;
import com.ssafy.ssagri.entity.user.User;
import com.ssafy.ssagri.util.exception.CustomException;
import com.ssafy.ssagri.util.exception.CustomExceptionStatus;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class AuctionBidService {
    private final AuctionBidRepository auctionBidRepository;
    private final UserRegistAndModifyRepository userRegistAndModifyRepository;
    private final AuctionRepository auctionRepository;

    //SseEmitter Map
    //String에 User 정보가 들어가야 함
    private final Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

    @Transactional
    public void save(AuctionBidSaveRequestDto auctionBidSaveRequestDto){
        log.info("AuctionBidService save");
        log.info("auctionBidSaveRequestDto = {}",auctionBidSaveRequestDto);
        //User, AuctionProduct 조회한다.
        Optional<AuctionProduct> findAuction = auctionRepository.findById(auctionBidSaveRequestDto.getAuctionNo());
        Optional<User> findUser = userRegistAndModifyRepository.findById(auctionBidSaveRequestDto.getUserNo());
        AuctionProduct auctionProduct = null;
        User user = null;

        //조회 했을 때 없으면 예외발생
        if(findAuction.isPresent()){
            auctionProduct = findAuction.get();
        }else {
            throw new CustomException(CustomExceptionStatus.AUCTION_PRODUCT_DOES_NOT_EXIST);
        }
        if(findUser.isPresent()){
            user = findUser.get();
        }else{
            throw new CustomException(CustomExceptionStatus.USER_DOES_NOT_EXSIST);
        }

        //비드 Entity 만들어 주고 DB에 저장
        AuctionBid auctionBid = AuctionBid.builder()
                .auctionProduct(auctionProduct)
                .user(user)
                .price(auctionBidSaveRequestDto.getAuctionBidPrice())
                .build();
        auctionBidRepository.save(auctionBid);

        //여기에 SSE 이벤트 추가해 줘야 함 private 메서드 만들고 호출하기


    }

    public List<AuctionBidSelectResponseDto> selectAuctionBid(Long auctionProductNo){
        //경매상품에 대한 비드 정보 조회
        List<AuctionBid> auctionBidList = auctionBidRepository.selectAuctionBidByAuctionProduct(auctionProductNo);

        //비드 ResponseDto List 생성
        List<AuctionBidSelectResponseDto> auctionBidResponseDtoList = new ArrayList<>();

        //Response로 변환
        for (AuctionBid auctionBid : auctionBidList) {
            AuctionBidSelectResponseDto responseDto = auctionBid.toResponse();

            auctionBidResponseDtoList.add(responseDto);
        }
        //ResponseList 반환
        return auctionBidResponseDtoList;
    }

}
