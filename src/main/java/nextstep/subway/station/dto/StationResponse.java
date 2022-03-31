package nextstep.subway.station.dto;

import nextstep.subway.station.domain.Station;

import java.io.Serializable;
import java.time.LocalDateTime;

public class StationResponse implements Serializable {
    private Long id;
    private String name;
    private String createdDate;
    private String modifiedDate;

    public static StationResponse of(Station station) {
        return new StationResponse(station.getId(), station.getName(), station.getCreatedDate().toString(), station.getModifiedDate().toString());
    }

    public StationResponse() {
    }

    public StationResponse(Long id, String name, String createdDate, String modifiedDate) {
        this.id = id;
        this.name = name;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public String getModifiedDate() {
        return modifiedDate;
    }
}
