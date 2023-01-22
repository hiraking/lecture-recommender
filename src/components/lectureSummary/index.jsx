import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThumbContext } from "src/components/main";
import { ThumbContextTemp } from "src/pages/result";

const SingleAccordion = (props) => {
  const { text, expanded, setExpanded, header } = props;
  return (
    <div>
      {text ? (
        <Accordion
          disableGutters
          expanded={expanded}
          onChange={() => setExpanded((prev) => !prev)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            className="lecture-accordion-summary"
          >
            <p className="lecture-accordion-header">{header}</p>
          </AccordionSummary>
          <AccordionDetails className="lecture-accordion-details">
            <p className="lecture-accordion-text">{text}</p>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </div>
  );
};

const LectureAccordion = memo((props) => {
  const { goal, plan, page } = props;
  const [showGoal, setShowGoal] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    setShowGoal(false);
    setShowPlan(false);
  }, [page]);

  return (
    <div className="lecture-accordions">
      <SingleAccordion
        text={goal}
        expanded={showGoal}
        setExpanded={setShowGoal}
        header="授業の目標、概要"
      />
      <div style={{ height: "10px" }}></div>
      <SingleAccordion
        text={plan}
        expanded={showPlan}
        setExpanded={setShowPlan}
        header="授業計画"
      />
    </div>
  );
});
LectureAccordion.displayName = "LectureAccordion";

const ThumbIconsDetail = (props) => {
  const {
    id,
    lecture,
    favorites,
    unfavorites,
    toggleFavorites,
    toggleUnfavorites,
  } = props;
  const tipTexts = useMemo(() => {
    return {
      like: [
        { first: null, second: "高く評価" },
        { first: "高評価を取り消し", second: null },
      ],
      dislike: [
        { first: null, second: "低く評価" },
        { first: "低評価を取り消し", second: null },
      ],
    };
  }, []);
  const [tipLike, setTipLike] = useState(
    favorites.includes(id) ? tipTexts.like[1] : tipTexts.like[0]
  );
  const [tipDislike, setTipDislike] = useState(
    unfavorites.includes(id) ? tipTexts.dislike[1] : tipTexts.dislike[0]
  );
  const toggleTip = useCallback((setTip, tipArray) => {
    setTip((prev) => {
      if (prev.first) return tipArray[0];
      return tipArray[1];
    });
  }, []);

  const handleClickLike = useCallback(() => {
    if (!favorites.includes(id) && unfavorites.includes(id)) {
      toggleTip(setTipDislike, tipTexts.dislike);
    }
    toggleFavorites(id, lecture);
    setTimeout(() => toggleTip(setTipLike, tipTexts.like), 500);
  }, [
    id,
    toggleFavorites,
    tipTexts,
    toggleTip,
    favorites,
    unfavorites,
    lecture,
  ]);

  const handleClikeDislike = useCallback(() => {
    if (favorites.includes(id) && !unfavorites.includes(id)) {
      toggleTip(setTipLike, tipTexts.like);
    }
    toggleUnfavorites(id, lecture);
    setTimeout(() => toggleTip(setTipDislike, tipTexts.dislike), 500);
  }, [
    id,
    toggleUnfavorites,
    tipTexts,
    toggleTip,
    favorites,
    unfavorites,
    lecture,
  ]);

  return (
    <>
      <Tooltip title={favorites.includes(id) ? tipLike.first : tipLike.second}>
        <IconButton
          aria-label="add to favorites"
          onClick={handleClickLike}
          className={
            favorites.includes(id)
              ? "thumb-icon thumb-up-selected"
              : "thumb-icon thumb-icon-unselected"
          }
        >
          <ThumbUpIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={unfavorites.includes(id) ? tipDislike.first : tipDislike.second}
      >
        <IconButton
          aria-label="add to unfavorites"
          onClick={handleClikeDislike}
          className={
            unfavorites.includes(id)
              ? "thumb-icon thumb-down-selected"
              : "thumb-icon thumb-icon-unselected"
          }
        >
          <ThumbDownIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

const ThumbIcons = memo((props) => {
  const { id, lecture } = props;
  const { favorites, unfavorites, toggleFavorites, toggleUnfavorites } =
    useContext(ThumbContext);
  return (
    <ThumbIconsDetail
      id={id}
      lecture={lecture}
      favorites={favorites}
      unfavorites={unfavorites}
      toggleFavorites={toggleFavorites}
      toggleUnfavorites={toggleUnfavorites}
    />
  );
});
ThumbIcons.displayName = "ThumbIcons";

const ThumbIconsTemp = memo((props) => {
  const { id, lecture } = props;
  const { favTemp, unfavTemp, toggleFavTemp, toggleUnfavTemp } =
    useContext(ThumbContextTemp);
  return (
    <ThumbIconsDetail
      id={id}
      lecture={lecture}
      favorites={favTemp}
      unfavorites={unfavTemp}
      toggleFavorites={toggleFavTemp}
      toggleUnfavorites={toggleUnfavTemp}
    />
  );
});
ThumbIconsTemp.displayName = "ThumbIconsTemp";

const SearchHeader = (props) => {
  const { title, lecturer, id, lecture, temp } = props;
  return (
    <CardHeader
      className="lecture-card-header"
      title={title}
      subheader={lecturer}
      action={
        <>
          {temp ? (
            <ThumbIconsTemp id={id} lecture={lecture} />
          ) : (
            <ThumbIcons id={id} lecture={lecture} />
          )}
        </>
      }
    />
  );
};

const LectureCardContent = (props) => {
  const { offered_by, semester, period, goal, plan, page } = props;
  return (
    <CardContent>
      <div className="lecture-card-chips">
        <Chip label={offered_by} />
        <Chip label={semester} />
        <Chip label={period} />
      </div>
      <LectureAccordion goal={goal} plan={plan} page={page} />
    </CardContent>
  );
};

export const SearchedLecture = memo((props) => {
  const { lecture, page, temp } = props;
  const { id, title, lecturer, offered_by, semester, period, goal, plan } =
    lecture;

  return (
    <Card variant="outlined" className="lecture-card">
      <SearchHeader
        title={title}
        lecturer={lecturer}
        id={id}
        lecture={lecture}
        temp={temp}
      />
      <LectureCardContent
        offered_by={offered_by}
        semester={semester}
        period={period}
        goal={goal}
        plan={plan}
        page={page}
      />
    </Card>
  );
});

SearchedLecture.displayName = "SearchedLecture";

const RecommendHeader = (props) => {
  const { title, lecturer } = props;
  return (
    <CardHeader
      title={title}
      subheader={lecturer}
      className="lecture-card-header"
    />
  );
};

export const RecommendedLecture = memo((props) => {
  const lecture = props.lecture;
  const { id, title, lecturer, offered_by, semester, period, goal, plan } =
    lecture;
  const page = props.page;

  return (
    <Card variant="outlined" className="lecture-card recommend-lecture-card">
      <RecommendHeader title={title} lecturer={lecturer} />
      <LectureCardContent
        offered_by={offered_by}
        semester={semester}
        period={period}
        goal={goal}
        plan={plan}
        page={page}
      />
    </Card>
  );
});
RecommendedLecture.displayName = "RecommendedLecture";
