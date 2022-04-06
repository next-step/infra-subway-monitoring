package nextstep.subway.station.dto;

import java.util.List;

public class StationResponseList {
    private List<StationResponse> list;

    public StationResponseList(List<StationResponse> list) {
        this.list = list;
    }

    public List<StationResponse> getList() {
        return list;
    }
}
