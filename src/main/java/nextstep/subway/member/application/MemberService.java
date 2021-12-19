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
        Member member = memberRepository.save(request.toMember());
        log.info("회원가입 되었습니다. email : {}", request.getEmail());
        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> {
            log.error("회원 조회 중 오류가 발생하였습니다. id : {}", id);
            return new RuntimeException();
        });
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("회원 업데이트 중 오류가 발생하였습니다. id : {}", id);
                    return new RuntimeException();
                });
        member.update(param.toMember());
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("로그인 중 오류가 발생하였습니다. email : {}", email);
                    return new AuthorizationException();
                });
    }
}
