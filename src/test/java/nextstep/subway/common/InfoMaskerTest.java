package nextstep.subway.common;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class InfoMaskerTest {

    @DisplayName("이메일 마스킹")
    @Test
    void email() {
        String email = "koola976@gmail.com";
        String result = InfoMasker.getMaskedEmail(email);
        assertThat(result).isEqualTo("koola***@gmail.com");
    }

    @DisplayName("비밀번호 마스킹")
    @Test
    void password() {
        String password = "password123!@#";
        String result = InfoMasker.getMaskedPassword(password);
        assertThat(result).isEqualTo("**************");
    }

}
