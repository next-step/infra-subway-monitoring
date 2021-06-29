package nextstep.subway.member.application;

import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static net.logstash.logback.argument.StructuredArguments.kv;

@Service
@Transactional
public class MemberService {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        Member member = memberRepository.save(request.toMember());

        fileLogger.info("{}, {}",
                kv("회원가입 이메일:", member.getEmail()),
                kv("나이: ", member.getAge())
        );

        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        fileLogger.debug("{}, {}",
                kv("회원 검색 성공 이메일:", member.getEmail()),
                kv("나이: ", member.getAge()));
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        fileLogger.debug("{}, {}",
                kv("회원 수정 성공, 수정 전 이메일:", param.getEmail()),
                kv("수정 전 나이: ", param.getAge()),
                kv("수정 후 이메일:", member.getEmail()),
                kv("수정 후 나이: ", member.getAge()));
        member.update(param.toMember());
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}
