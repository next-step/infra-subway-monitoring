package nextstep.subway.member.application;

import nextstep.subway.auth.application.AuthorizationException;
import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private static final Logger fileLog = LoggerFactory.getLogger("file");

    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        try {
            Member member = memberRepository.save(request.toMember());
            log.info("Member #{} ({}) has been created.", member.getId(), member.getEmail());
            fileLog.info("Member #{} has been created.", member.getId());
            return MemberResponse.of(member);
        } catch (IllegalArgumentException exception) {
            log.warn("MemberRequest contains null value.", exception);
            fileLog.warn("MemberRequest contains null value.", exception);
            throw new AuthorizationException();
        } catch (DataAccessException exception) {
            log.warn("Something wrong during creating member.", exception);
            fileLog.warn("Something wrong during creating member.", exception);
            throw new AuthorizationException();
        }
    }

    public MemberResponse findMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        member.update(param.toMember());
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}
