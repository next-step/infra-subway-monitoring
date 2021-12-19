package nextstep.subway.favorite.application;

import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.favorite.domain.Favorite;
import nextstep.subway.favorite.domain.FavoriteRepository;
import nextstep.subway.favorite.domain.HasNotPermissionException;
import nextstep.subway.favorite.dto.FavoriteRequest;
import nextstep.subway.favorite.dto.FavoriteResponse;
import nextstep.subway.station.domain.Station;
import nextstep.subway.station.domain.StationRepository;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FavoriteService {
    private static final Logger log = LoggerFactory.getLogger("file");

    private FavoriteRepository favoriteRepository;
    private StationRepository stationRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, StationRepository stationRepository) {
        this.favoriteRepository = favoriteRepository;
        this.stationRepository = stationRepository;
    }

    public void createFavorite(LoginMember loginMember, FavoriteRequest request) {
        log.info("즐겨찾기 생성을 요청하였습니다. id : {}", loginMember.getId());

        Favorite favorite = new Favorite(loginMember.getId(), request.getSource(), request.getTarget());
        favoriteRepository.save(favorite);

        log.info("즐겨찾기 생성되었습니다. id : {}", loginMember.getId());
    }

    public List<FavoriteResponse> findFavorites(LoginMember loginMember) {
        log.info("즐겨찾기 조회를 요청하였습니다. id : {}", loginMember.getId());
        List<Favorite> favorites = favoriteRepository.findByMemberId(loginMember.getId());
        Map<Long, Station> stations = extractStations(favorites);

        log.info("즐겨찾기 조회되었습니다. id : {}", loginMember.getId());
        return favorites.stream()
            .map(it -> FavoriteResponse.of(
                it,
                StationResponse.of(stations.get(it.getSourceStationId())),
                StationResponse.of(stations.get(it.getTargetStationId()))))
            .collect(Collectors.toList());
    }

    public void deleteFavorite(LoginMember loginMember, Long id) {
        log.error("즐겨찾기 삭제를 요청하였습니다. id : {}", id);

        Favorite favorite = favoriteRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("즐겨찾기 조회 중 오류가 발생하였습니다. id : {}", id);
                    return new RuntimeException();
                });

        if (!favorite.isCreatedBy(loginMember.getId())) {
            log.error("{} 는 삭제할 권한이 없습니다.", loginMember.getId());
            throw new HasNotPermissionException(loginMember.getId() + "는 삭제할 권한이 없습니다.");
        }

        favoriteRepository.deleteById(id);

        log.error("즐겨찾기 삭제되었습니다. id : {}", id);
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
