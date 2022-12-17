package nextstep.subway.member.dto;

import static nextstep.subway.utils.MaskingUtil.*;

import nextstep.subway.member.domain.Member;
import nextstep.subway.utils.MaskingUtil;

public class MemberResponse {
    private Long id;
    private String email;
    private Integer age;

    public MemberResponse() {
    }

    public MemberResponse(Long id, String email, Integer age) {
        this.id = id;
        this.email = email;
        this.age = age;
    }

    public static MemberResponse of(Member member) {
        return new MemberResponse(member.getId(), member.getEmail(), member.getAge());
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Integer getAge() {
        return age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", email='" + maskingEmail(email) + '\'' +
                '}';
    }
}
