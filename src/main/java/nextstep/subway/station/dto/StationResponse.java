package nextstep.subway.station.dto;

import nextstep.subway.station.domain.Station;
import org.apache.commons.lang3.ObjectUtils;

import java.time.LocalDateTime;

public class StationResponse {
    private Long id;
    private String name;
    private String createdDate;
    private String modifiedDate;

    public static StationResponse of(Station station) {
        LocalDateTime createdDate = ObjectUtils.defaultIfNull(station.getCreatedDate(), LocalDateTime.now());
        LocalDateTime modifiedDate = ObjectUtils.defaultIfNull(station.getModifiedDate(), LocalDateTime.now());

        return new StationResponse(station.getId(), station.getName(), createdDate.toString(), modifiedDate.toString());
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

//    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public String getCreatedDate() {
        return createdDate;
    }

//    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public String getModifiedDate() {
        return modifiedDate;
    }
}
