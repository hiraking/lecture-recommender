import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";
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
      {isLoading ? (
        <Spinner />
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
