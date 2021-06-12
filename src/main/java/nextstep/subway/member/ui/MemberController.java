package nextstep.subway.member.ui;

import nextstep.subway.auth.domain.AuthenticationPrincipal;
import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.common.LogName;
import nextstep.subway.member.application.MemberService;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
public class MemberController {
    private static final String CREATE_MEMBER_MESSAGE_FORMAT = "이메일이 [ %s ] 인 회원의 정보를 생성했습니다.";
    private static final String FIND_MEMBER_MESSAGE_FORMAT = "이메일이 [ %s ] 인 회원의 정보를 찾았습니다.";
    private static final String UPDATE_MEMBER_MESSAGE_FORMAT = "[ %s ] 번째 회원의 정보를 찾았습니다.";
    private static final String DELETE_MEMBER_MESSAGE_FORMAT = "[ %s ] 번째 회원의 정보를 삭제했습니다.";
    private static final String FIND_MEMBER_OF_MINE_MESSAGE = "자신의 정보를 찾았습니다.";
    private static final String UPDATE_MEMBER_OF_MINE_MESSAGE = "자신의 정보를 업데이트 했습니다.";
    private static final String DELETE_MEMBER_OF_MINE_MESSAGE = "자신의 정보를 삭제 했습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/members")
    public ResponseEntity createMember(@RequestBody MemberRequest request) {
        MemberResponse member = memberService.createMember(request);
        logInfo(formatCreateMemberMessage(request));
        return ResponseEntity.created(URI.create("/members/" + member.getId())).build();
    }

    @GetMapping("/members/{id}")
    public ResponseEntity<MemberResponse> findMember(@PathVariable Long id) {
        MemberResponse member = memberService.findMember(id);
        logInfo(formatUpdateMemberMessage(member));
        return ResponseEntity.ok().body(member);
    }

    @PutMapping("/members/{id}")
    public ResponseEntity<MemberResponse> updateMember(@PathVariable Long id, @RequestBody MemberRequest param) {
        memberService.updateMember(id, param);
        logInfo(formatUpdateMemberMessage(id));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/members/{id}")
    public ResponseEntity<MemberResponse> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        logInfo(formatDeleteMemberMessage(id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/members/me")
    public ResponseEntity<MemberResponse> findMemberOfMine(@AuthenticationPrincipal LoginMember loginMember) {
        MemberResponse member = memberService.findMember(loginMember.getId());
        logInfo(FIND_MEMBER_OF_MINE_MESSAGE);
        return ResponseEntity.ok().body(member);
    }

    @PutMapping("/members/me")
    public ResponseEntity<MemberResponse> updateMemberOfMine(@AuthenticationPrincipal LoginMember loginMember, @RequestBody MemberRequest param) {
        memberService.updateMember(loginMember.getId(), param);
        logInfo(UPDATE_MEMBER_OF_MINE_MESSAGE);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/members/me")
    public ResponseEntity<MemberResponse> deleteMemberOfMine(@AuthenticationPrincipal LoginMember loginMember) {
        memberService.deleteMember(loginMember.getId());
        logInfo(DELETE_MEMBER_OF_MINE_MESSAGE);
        return ResponseEntity.noContent().build();
    }

    private String formatCreateMemberMessage(MemberRequest request) {
        return String.format(CREATE_MEMBER_MESSAGE_FORMAT, request.getEmail());
    }

    private String formatUpdateMemberMessage(MemberResponse member) {
        return String.format(FIND_MEMBER_MESSAGE_FORMAT, member.getEmail());
    }

    private String formatUpdateMemberMessage(Long id) {
        return String.format(UPDATE_MEMBER_MESSAGE_FORMAT, id);
    }

    private String formatDeleteMemberMessage(Long id) {
        return String.format(DELETE_MEMBER_MESSAGE_FORMAT, id);
    }

    private void logInfo(String logMessage) {
        CONSOLE_LOGGER.info(logMessage);
        FILE_LOGGER.info(logMessage);
    }

}
