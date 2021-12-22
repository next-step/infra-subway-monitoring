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
    private final Logger logger = LoggerFactory.getLogger("file");
    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        logger.info("회원 생성. request: {}", request.toString());
        Member member = memberRepository.save(request.toMember());
        logger.info("회원 생성 성공");
        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        logger.info("회원 정보 변경. memberId: {}, request: {}", id, param.toString());
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        member.update(param.toMember());
        logger.info("회원 정보 변경 성공");
    }

    public void deleteMember(Long id) {
        logger.info("회원 삭제. memberId: {}", id);
        memberRepository.deleteById(id);
        logger.info("회원 삭제 성공");
    }
}
