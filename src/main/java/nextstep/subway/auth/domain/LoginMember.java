package nextstep.subway.auth.domain;

import java.util.StringJoiner;

public class LoginMember {
    private Long id;
    private String email;
    private Integer age;

    public LoginMember(Long id, String email, Integer age) {
        this.id = id;
        this.email = email;
        this.age = age;
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
        return new StringJoiner(", ", LoginMember.class.getSimpleName() + "[", "]")
            .add("id=" + id)
            .add("email='" + email + "'")
            .add("age=" + age)
            .toString();
    }
}
