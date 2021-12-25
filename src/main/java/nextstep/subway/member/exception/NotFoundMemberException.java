package nextstep.subway.member.exception;

public class NotFoundMemberException extends RuntimeException {
    public NotFoundMemberException(Long id) {
        super("회원이 존재하지 않습니다. memberId : " + id);
    }
}
