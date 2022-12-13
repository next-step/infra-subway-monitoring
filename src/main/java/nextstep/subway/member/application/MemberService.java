package nextstep.subway.member.application;

import nextstep.subway.common.log.Loggers;
import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {
    private static final Logger LOGGER = Loggers.FILE.logger();
    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        Member member = memberRepository.save(request.toMember());
        LOGGER.info("[EVENT] 회원가입 - email : {}, age = {}",
                request.getEmail(),
                request.getAge());
        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        member.update(param.toMember());
        LOGGER.info("[EVENT] 회원 정보 수정 - id: {}, email : {}, age = {}",
                id,
                param.getEmail(),
                param.getAge());
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}
