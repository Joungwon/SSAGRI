package com.ssafy.ssagri.domain.usedproduct.controller;

import com.ssafy.ssagri.domain.usedproduct.dto.request.UsedProductSaveRequestDto;
import com.ssafy.ssagri.domain.usedproduct.dto.response.UsedProductDetailResponseDto;
import com.ssafy.ssagri.domain.usedproduct.dto.response.UsedProductResponseDto;
import com.ssafy.ssagri.domain.usedproduct.service.UsedProductService;
import com.ssafy.ssagri.entity.usedproduct.ProductCategory;
import com.ssafy.ssagri.entity.user.Region;
import com.ssafy.ssagri.util.jwt.JwtUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usedproduct")
@CrossOrigin("*")
public class UsedProductController {

    private final UsedProductService usedProductService;

    @PostMapping("")
    @ApiOperation("formdata로 사진, UsedProductSaveRequest 넘겨줘야 함")
    public Long save(@RequestPart UsedProductSaveRequestDto usedProductSaveRequest,@RequestPart("s3uploadMain") MultipartFile multipartFileMain, @RequestPart("s3uploadSub") List<MultipartFile> multipartFileSubList)throws Exception {
        System.out.println("usedProductSaveRequest = " + usedProductSaveRequest);

        Long id = usedProductService.saveUsedProduct(usedProductSaveRequest,multipartFileMain,multipartFileSubList);
        return id;
    }


    @GetMapping("/{userNo}")
    @ApiOperation("중고물품 리스트 조회하는 메서드 파라미터 값으로 userNo를 넣어주면 좋아요 상태도 같이 조회")
    @Operation(description = "category, region, size, page 넘겨주기, 정렬은 sort=likeCount,asc 같은 식으로 넘긴다.")
    public Page<UsedProductResponseDto> selectList(@PathVariable(name = "userNo")Long userNo
            , @RequestParam(name = "category", required = false) ProductCategory productCategory
            , @RequestParam(name = "region", required = false) Region region
            , @RequestParam(name = "search", required = false) String search
            , Pageable pageable
            ) {
        pageable.getSort().get().forEach(sort -> {
            System.out.println("sort.getProperty() = " + sort.getProperty());
            System.out.println("sort.getDirection() = " + sort.getDirection());
        });
        System.out.println("pageable.toString() = " + pageable.toString());
        Page<UsedProductResponseDto> usedProductResponseDtos = usedProductService.selectUsedProductList(userNo, productCategory, region, search, pageable);
        return usedProductResponseDtos;
    }
    //중고 물품 디테일 가져오는 메서드 만들어야 함
    @GetMapping("/detail/{userNo}")
    @ApiOperation("중고물품 detail넘겨주는 메서드, userNo, usedProductNo 넘겨줘야 함")
    public UsedProductDetailResponseDto selectDetail(@PathVariable(name = "userNo")Long userNo,@RequestParam(name = "usedProductNo")Long usedProductNo) {
        UsedProductDetailResponseDto usedProductDetailResponseDto = usedProductService.selectUsedProductDetail(userNo,usedProductNo);
        return usedProductDetailResponseDto;
    }
    @GetMapping("/user/{userNo}")
    @ApiOperation("특정 유저가 올린 상품리스트 가져오는 메서드")
    public Page<UsedProductResponseDto> selectListByUser(@PathVariable(name = "userNo")Long userNo, Pageable pageable) {
        Page<UsedProductResponseDto> usedProductResponseDtos = usedProductService.selectUsedProductListByUser(userNo, pageable);
        return usedProductResponseDtos;
    }

    @DeleteMapping("/{usedProductNo}")
    @ApiOperation("삭제하는 메서드")
    public Long delete(@PathVariable(name = "usedProductNo")Long usedProductNo){
        Long id = usedProductService.deleteUsedProduct(usedProductNo);
        return id;
    }
}
