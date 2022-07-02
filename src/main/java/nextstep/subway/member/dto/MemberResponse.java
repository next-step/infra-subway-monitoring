package nextstep.subway.member.dto;

import nextstep.subway.member.domain.Member;

import java.util.Objects;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberResponse that = (MemberResponse) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getEmail(), that.getEmail()) && Objects.equals(getAge(), that.getAge());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmail(), getAge());
    }

    @Override
    public String toString() {
        return "MemberResponse{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", age=" + age +
                '}';
    }
}
