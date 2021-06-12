package nextstep.subway.favorite.ui;

import nextstep.subway.auth.domain.AuthenticationPrincipal;
import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.common.LogName;
import nextstep.subway.favorite.application.FavoriteService;
import nextstep.subway.favorite.dto.FavoriteRequest;
import nextstep.subway.favorite.dto.FavoriteResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
public class FavoriteController {
    private static final String CREATE_FAVORITE_MESSAGE_FORMAT = "즐겨찾기에 [ %s ] 와 [ %s ] 를 등록했습니다.";
    private static final String DELETE_FAVORITE_MESSAGE_FORMAT = "[ %s ] 번째 즐겨찾기를 삭제 했습니다.";
    private static final String GET_FAVORITES_MESSAGE_FORMAT = "즐겨찾기 목록 [ %s ] 개를 가져왔습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/favorites")
    public ResponseEntity createFavorite(@AuthenticationPrincipal LoginMember loginMember, @RequestBody FavoriteRequest request) {
        favoriteService.createFavorite(loginMember, request);
        logInfo(formatCreateFavoriteMessage(request));
        return ResponseEntity
                .created(URI.create("/favorites/" + 1L))
                .build();
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<FavoriteResponse>> getFavorites(@AuthenticationPrincipal LoginMember loginMember) {
        List<FavoriteResponse> favorites = favoriteService.findFavorites(loginMember);
        logInfo(formatGetFavoritesMessage(favorites));
        return ResponseEntity.ok().body(favorites);
    }

    @DeleteMapping("/favorites/{id}")
    public ResponseEntity deleteFavorite(@AuthenticationPrincipal LoginMember loginMember, @PathVariable Long id) {
        favoriteService.deleteFavorite(loginMember, id);
        logInfo(formatDeleteFavoriteMessage(id));
        return ResponseEntity.noContent().build();
    }

    private String formatCreateFavoriteMessage(FavoriteRequest request) {
        return String.format(CREATE_FAVORITE_MESSAGE_FORMAT, request.getSource(), request.getTarget());
    }

    private String formatDeleteFavoriteMessage(Long id) {
        return String.format(DELETE_FAVORITE_MESSAGE_FORMAT, id);
    }

    private String formatGetFavoritesMessage(List<FavoriteResponse> favorites) {
        return String.format(GET_FAVORITES_MESSAGE_FORMAT, favorites.size());
    }

    private void logInfo(String logMessage) {
        CONSOLE_LOGGER.info(logMessage);
        FILE_LOGGER.info(logMessage);
    }
}
