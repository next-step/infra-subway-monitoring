package nextstep.subway.line.dto;

import nextstep.subway.line.domain.Line;
import nextstep.subway.station.dto.StationResponse;
import org.apache.commons.lang3.ObjectUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class LineResponse {
    private Long id;
    private String name;
    private String color;
    private List<StationResponse> stations;

    private String createdDate;
    private String modifiedDate;

    public LineResponse() {
    }

    public LineResponse(Long id, String name, String color, List<StationResponse> stations, String createdDate, String modifiedDate) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.stations = stations;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public static LineResponse of(Line line) {
        LocalDateTime createdDate = ObjectUtils.defaultIfNull(line.getCreatedDate(), LocalDateTime.now());
        LocalDateTime modifiedDate = ObjectUtils.defaultIfNull(line.getModifiedDate(), LocalDateTime.now());

        if(isEmpty(line)) {
            return new LineResponse(line.getId(), line.getName(), "", new ArrayList<>(), createdDate.toString(), modifiedDate.toString());
        }
        return new LineResponse(line.getId(), line.getName(),"", assembleStations(line), createdDate.toString(), modifiedDate.toString());
    }

    private static boolean isEmpty(Line line) {
        return line.getStations().isEmpty();
    }

    private static List<StationResponse> assembleStations(Line line) {
        return line.getStations().stream()
            .map(StationResponse::of)
            .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    public List<StationResponse> getStations() {
        return stations;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public String getModifiedDate() {
        return modifiedDate;
    }
}
