package nextstep.subway.line.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LineRepository extends JpaRepository<Line, Long> {

    @Query(value = "SELECT * FROM line", nativeQuery = true) // todo SLEEP이 왜 있었나 알아보기!!
    List<Line> findAll();
}
