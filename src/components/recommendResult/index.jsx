import { RecommendedLecture } from "src/components/lectureSummary";
import { MyPagination } from "src/components/pagination";
import { Spinner } from "src/utils/common";

export const RecommendResult = (props) => {
  const { isLoading, lectures, page, hits, fetcher, noHit } = props;
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
          <MyPagination page={page} hits={hits} fetcherPagination={fetcher} />
        </>
      ) : null}
    </div>
  );
};
