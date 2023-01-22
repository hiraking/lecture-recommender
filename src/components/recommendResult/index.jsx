import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";
import { RecommendedLecture } from "src/components/lectureSummary";
import { MyPagination } from "src/components/pagination";
import { Spinner } from "src/utils/common";

export const RecommendResult = memo((props) => {
  const router = useRouter();
  const {
    isLoading,
    isWaiting,
    lectures,
    page,
    hits,
    noHit,
    favorites,
    unfavorites,
    faculties,
    semesters,
  } = props;
  const handlePageChange = useCallback(
    (page) => {
      router.push({
        pathname: "/result",
        query: {
          l: favorites,
          dl: unfavorites,
          f: faculties,
          s: semesters,
          p: page,
          at: 0,
        },
      });
    },
    [router, favorites, unfavorites, faculties, semesters]
  );

  return (
    <div>
      {isLoading || isWaiting ? (
        <Spinner />
      ) : noHit ? (
        <NoHitAlert />
      ) : lectures.length > 0 ? (
        <>
          {lectures.map((lecture) => {
            return (
              <RecommendedLecture
                key={lecture.id}
                lecture={lecture}
                page={page}
              />
            );
          })}
          <MyPagination
            page={page}
            hits={hits}
            handlePageChange={handlePageChange}
          />
        </>
      ) : null}
    </div>
  );
});
RecommendResult.displayName = "RecommendResult";

const NoHitAlert = () => {
  return (
    <Alert
      severity="warning"
      variant="outlined"
      className="nohit-alert recommend-nohit-alert"
    >
      条件に合う講義は見つかりませんでした。
    </Alert>
  );
};
