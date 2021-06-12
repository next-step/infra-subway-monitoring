package nextstep.subway.member.application;

import nextstep.subway.common.LogName;
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
    private static final String MISSING_ID_MESSAGE_FORMAT = "[ %s ]에 해당하는 id 는 없습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        Member member = memberRepository.save(request.toMember());
        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> runtimeException(id));
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> runtimeException(id));
        member.update(param.toMember());
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    private RuntimeException runtimeException(Long id) {
        logError(formatMissingIdMessage(id));
        return new RuntimeException();
    }

    private String formatMissingIdMessage(Long id) {
        return String.format(MISSING_ID_MESSAGE_FORMAT, id);
    }

    private void logError(String logMessage) {
        CONSOLE_LOGGER.error(logMessage);
        FILE_LOGGER.error(logMessage);
    }

}
