package nextstep.subway.member.dto;

import static nextstep.subway.common.MaskingUtil.maskingAll;
import static nextstep.subway.common.MaskingUtil.maskingExceptFirst3;

import nextstep.subway.member.domain.Member;

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
        return "MemberRequest{" +
            "email='" + maskingExceptFirst3(email) + '\'' +
            ", password='" + maskingAll(password) + '\'' +
            ", age=" + age +
            '}';
    }
}
