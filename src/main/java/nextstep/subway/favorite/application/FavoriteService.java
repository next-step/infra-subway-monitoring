package nextstep.subway.favorite.application;

import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.common.LogMarker;
import nextstep.subway.favorite.domain.Favorite;
import nextstep.subway.favorite.domain.FavoriteRepository;
import nextstep.subway.favorite.domain.HasNotPermissionException;
import nextstep.subway.favorite.dto.FavoriteRequest;
import nextstep.subway.favorite.dto.FavoriteResponse;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.domain.Station;
import nextstep.subway.station.domain.StationRepository;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final StationRepository stationRepository;
    private final StationService stationService;

    private static final Logger logger = LoggerFactory.getLogger(FavoriteService.class);

    public FavoriteService(FavoriteRepository favoriteRepository,
                           StationRepository stationRepository,
                           StationService stationService) {
        this.favoriteRepository = favoriteRepository;
        this.stationRepository = stationRepository;
        this.stationService = stationService;
    }

    public FavoriteResponse createFavorite(LoginMember loginMember, FavoriteRequest request) {
        Favorite favorite = new Favorite(loginMember.getId(), request.getSource(), request.getTarget());
        Favorite savedFavorite = favoriteRepository.save(favorite);
        Station source = stationService.findStationById(savedFavorite.getSourceStationId());
        Station target = stationService.findStationById(savedFavorite.getTargetStationId());
        FavoriteResponse response = new FavoriteResponse(savedFavorite.getId(),StationResponse.of(source),StationResponse.of(target));
        logger.info(LogMarker.JSON.getMarker(), "{},{}", kv("event","CREATE_FAVORITE"),kv("payload", response));
        return response;
    }

    public List<FavoriteResponse> findFavorites(LoginMember loginMember) {
        List<Favorite> favorites = favoriteRepository.findByMemberId(loginMember.getId());
        Map<Long, Station> stations = extractStations(favorites);

        return favorites.stream()
            .map(it -> FavoriteResponse.of(
                it,
                StationResponse.of(stations.get(it.getSourceStationId())),
                StationResponse.of(stations.get(it.getTargetStationId()))))
            .collect(Collectors.toList());
    }

    public void deleteFavorite(LoginMember loginMember, Long id) {
        Favorite favorite = favoriteRepository.findById(id).orElseThrow(RuntimeException::new);
        if (!favorite.isCreatedBy(loginMember.getId())) {
            throw new HasNotPermissionException(loginMember.getId() + "는 삭제할 권한이 없습니다.");
        }
        favoriteRepository.deleteById(id);
        logger.info(LogMarker.JSON.getMarker(), "{},{}", kv("event","DELETE_FAVORITE"), kv("payload", favorite.getId()));
    }

    private Map<Long, Station> extractStations(List<Favorite> favorites) {
        Set<Long> stationIds = extractStationIds(favorites);
        return stationRepository.findAllById(stationIds).stream()
            .collect(Collectors.toMap(Station::getId, Function.identity()));
    }

    private Set<Long> extractStationIds(List<Favorite> favorites) {
        Set<Long> stationIds = new HashSet<>();
        for (Favorite favorite : favorites) {
            stationIds.add(favorite.getSourceStationId());
            stationIds.add(favorite.getTargetStationId());
        }
        return stationIds;
    }
}
