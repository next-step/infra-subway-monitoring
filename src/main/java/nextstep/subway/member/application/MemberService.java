package nextstep.subway.member.application;

import nextstep.subway.auth.application.AuthorizationException;
import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {
    private static final Logger log = LoggerFactory.getLogger("file");

    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        log.info("회원가입을 요청 되었습니다. email : {}", request.getEmail());

        Member member = memberRepository.save(request.toMember());

        log.info("회원가입 되었습니다. email : {}", request.getEmail());

        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        log.info("회원 조회가 요청 되었습니다. id : {}", id);

        Member member = findById(id);

        log.info("회원 조회되었습니다. id : {}", id);

        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        log.info("회원 수정이 요청 되었습니다. id : {}", id);

        Member member = findById(id);
        member.update(param.toMember());

        log.info("회원 수정되었습니다. id : {}", id);
    }

    public void deleteMember(Long id) {
        log.info("회원 삭제가 요청 되었습니다. id : {}", id);

        memberRepository.deleteById(id);

        log.info("회원 삭제되었습니다. id : {}", id);
    }

    private Member findById(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> {
            log.error("회원 조회 중 오류가 발생하였습니다. id : {}", id);
            return new RuntimeException();
        });
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("로그인 중 오류가 발생하였습니다. email : {}", email);
                    return new AuthorizationException();
                });
    }
}
