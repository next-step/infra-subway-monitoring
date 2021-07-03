package nextstep.subway.map.domain;

import nextstep.subway.line.domain.Line;
import nextstep.subway.line.domain.Section;
import nextstep.subway.station.domain.Station;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class PathCacheTest {

    @BeforeEach
    void setUp() {
        PathCache.resetCache();
    }

    @DisplayName("케쉬에 조회내용이 존재하지 않을때 null을 반환한다.")
    @Test
    void findCacheIfNull() {
        Long source = 1L;
        Long target = 10L;
        SubwayPath path = PathCache.findPath(source, target);

        assertNull(path);
    }

    @DisplayName("케쉬에 조회내용이 존재할 경우 해당 경로정보를 반환한다.")
    @Test
    void findCache() {
        Long source = 1L;
        Long target = 10L;

        Line 이호선 = new Line(1L, "2호선", "초록색");
        Station 강남역 = new Station("강남역");
        Station 잠실역 = new Station("잠실역");
        Section 구간 = new Section(이호선, 강남역, 잠실역, 20);
        SectionEdge sectionEdge = new SectionEdge(구간, 이호선.getId());
        List<SectionEdge> sectionEdges = Arrays.asList(sectionEdge);
        List<Station> stations = Arrays.asList(강남역, 잠실역);

        SubwayPath subwayPath = new SubwayPath(sectionEdges, stations);

        PathCache.addCacheData(source, target, subwayPath);

        SubwayPath path = PathCache.findPath(source, target);

        assertNotNull(path);
        assertThat(path.getSectionEdges()).contains(sectionEdge);
        assertThat(path.getStations()).contains(강남역, 잠실역);
    }

}
