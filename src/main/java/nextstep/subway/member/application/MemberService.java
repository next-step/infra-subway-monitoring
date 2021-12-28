package nextstep.subway.member.application;

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
    private static final Logger log = LoggerFactory.getLogger("console");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        Member member = memberRepository.save(request.toMember());
        log.debug("사용자 생성 키 >> {}", member.getId());
        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        Member member = findById(id);
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        Member member = findById(id);
        member.update(param.toMember());
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    private Member findById(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> {
            fileLogger.error("없는 사용자 입니다. 사용자: {}", id);
            return new RuntimeException();
        });
    }
}
