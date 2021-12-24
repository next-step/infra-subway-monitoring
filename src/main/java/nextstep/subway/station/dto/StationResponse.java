package nextstep.subway.station.dto;

import nextstep.subway.station.domain.Station;

import java.time.LocalDateTime;

public class StationResponse {
    private Long id;
    private String name;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static StationResponse of(Station station) {
        return new StationResponse(station.getId(), station.getName(), station.getCreatedDate(), station.getModifiedDate());
    }

    public StationResponse() {
    }

    public StationResponse(Long id, String name, LocalDateTime createdDate, LocalDateTime modifiedDate) {
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

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("StationResponse{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", createdDate=").append(createdDate);
        sb.append(", modifiedDate=").append(modifiedDate);
        sb.append('}');
        return sb.toString();
    }
}
