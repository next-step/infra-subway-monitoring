package nextstep.subway.member.ui;

import java.net.URI;
import nextstep.subway.auth.domain.AuthenticationPrincipal;
import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.member.application.MemberService;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MemberController {

	private static final Logger log = LoggerFactory.getLogger(MemberController.class); //logger 객체 사용
	private static final Logger fileLog = LoggerFactory.getLogger("fileLog");

	private MemberService memberService;

	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}

	@PostMapping("/members")
	public ResponseEntity createMember(@RequestBody MemberRequest request) {
		log.info("회원가입 컨트롤러. email = {}", request.getEmail());
		MemberResponse member = memberService.createMember(request);
        fileLog.info("회원가입 컨트롤러. email = {}", request.getEmail());
		return ResponseEntity.created(URI.create("/members/" + member.getId())).build();
	}

	@GetMapping("/members/{id}")
	public ResponseEntity<MemberResponse> findMember(@PathVariable Long id) {
		MemberResponse member = memberService.findMember(id);
		return ResponseEntity.ok().body(member);
	}

	@PutMapping("/members/{id}")
	public ResponseEntity<MemberResponse> updateMember(@PathVariable Long id,
		@RequestBody MemberRequest param) {
		memberService.updateMember(id, param);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/members/{id}")
	public ResponseEntity<MemberResponse> deleteMember(@PathVariable Long id) {
		memberService.deleteMember(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/members/me")
	public ResponseEntity<MemberResponse> findMemberOfMine(
		@AuthenticationPrincipal LoginMember loginMember) {
		MemberResponse member = memberService.findMember(loginMember.getId());
		return ResponseEntity.ok().body(member);
	}

	@PutMapping("/members/me")
	public ResponseEntity<MemberResponse> updateMemberOfMine(
		@AuthenticationPrincipal LoginMember loginMember, @RequestBody MemberRequest param) {
		memberService.updateMember(loginMember.getId(), param);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/members/me")
	public ResponseEntity<MemberResponse> deleteMemberOfMine(
		@AuthenticationPrincipal LoginMember loginMember) {
		memberService.deleteMember(loginMember.getId());
		return ResponseEntity.noContent().build();
	}
}
