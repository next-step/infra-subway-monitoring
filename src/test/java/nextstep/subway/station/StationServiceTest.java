package nextstep.subway.station;

import static org.assertj.core.api.Assertions.assertThat;

import net.sf.ehcache.CacheManager;
import nextstep.subway.AcceptanceTest;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.domain.Station;
import nextstep.subway.station.dto.StationRequest;
import nextstep.subway.station.dto.StationResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class StationServiceTest extends AcceptanceTest {

    @Autowired
    private StationService stationService;

    @Test
    void l2Cache() {
        StationRequest stationRequest = new StationRequest("서대문역");
        StationResponse stationResponse = stationService.saveStation(stationRequest);
        Station station = stationService.findById(stationResponse.getId());
        assertThat(station).isNotNull();
        int size = CacheManager.ALL_CACHE_MANAGERS.get(0)
            .getCache("nextstep.subway.station.domain.Station").getSize();
        assertThat(size).isGreaterThan(0);
    }

}
