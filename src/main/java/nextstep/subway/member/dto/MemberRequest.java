package nextstep.subway.member.dto;

import nextstep.subway.member.domain.Member;
import nextstep.subway.util.MaskingUitls;

import java.util.StringJoiner;

public class MemberRequest {
    private String email;
    private String password;
    private Integer age;

    public MemberRequest() {
    }

    public MemberRequest(String email, String password, Integer age) {
        this.email = email;
        this.password = password;
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Integer getAge() {
        return age;
    }

    public Member toMember() {
        return new Member(email, password, age);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", MemberRequest.class.getSimpleName() + "[", "]")
            .add("email='" + MaskingUitls.maskEmail(email) + "'")
            .add("age=" + age)
            .toString();
    }
}
