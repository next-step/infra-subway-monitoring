package nextstep.subway.member.application;

import lombok.extern.slf4j.Slf4j;
import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j(topic = "file")
@Service
@Transactional
public class MemberService {

    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponse createMember(MemberRequest request) {
        log.info("회원 가입 요청 [memberMail={}]", request.getEmail());
        Member member = memberRepository.save(request.toMember());
        log.info("회원 가입 완료 [id={}/memberMail={}]", member.getId(), request.getEmail());
        return MemberResponse.of(member);
    }

    public MemberResponse findMember(Long id) {
        log.info("회원 찾기 요청 [id={}]", id);
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest param) {
        log.info("회원 정보 수정 요청[id={}]", id);
        Member member = memberRepository.findById(id).orElseThrow(RuntimeException::new);
        member.update(param.toMember());
        log.info("회원 정보 수정 완료 [id={}]", id);
    }

    public void deleteMember(Long id) {
        log.info("회원 정보 삭제 요청 [id={}]", id);
        memberRepository.deleteById(id);
        log.info("회원 정보 삭제 완료 [id={}]", id);
    }
}
