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
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTastes } from "src/hooks/useTastes";

const LectureAccordion = memo((props) => {
  const { goal, plan, page } = props;
  const [showGoal, setShowGoal] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const textStyles = { whiteSpace: "pre-line" };

  useEffect(() => {
    setShowGoal(false);
    setShowPlan(false);
  }, [page]);

  return (
    <div>
      {goal ? (
        <Accordion
          disableGutters
          expanded={showGoal}
          onChange={() => setShowGoal((prev) => !prev)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>授業の目標、概要</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={textStyles}>{goal}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : null}
      {plan ? (
        <Accordion
          disableGutters
          expanded={showPlan}
          onChange={() => setShowPlan((prev) => !prev)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>授業計画</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={textStyles}>{plan}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </div>
  );
});
LectureAccordion.displayName = "LectureAccordion";

const ThumbIcons = memo((props) => {
  const id = props.id;
  const lecture = props.lecture;
  const { toggleFavorites, toggleUnfavorites, favorites, unfavorites } =
    props.tastes;
  console.log(favorites, unfavorites);

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

  // liked, dislikedのstateをこのコンポーネント内で定義する。
  // するとpropsのfavorites, unfavoritesの代用になる。
  // この2つはlikedかdislikedのボタンが押されているかを判定するため
  // だけに使われている(全てincludesとセット)。
  // propsをtoggleFavoritesとtoggleUnfavoritesだけにできれば、
  // ボタンを押したときのモーダル全体の再レンダリングは防げるかも。

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
          sx={{
            color: favorites.includes(id) ? "#d45088" : "#999",
            transform: "scale(1.2)",
          }}
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
          sx={{
            color: unfavorites.includes(id) ? "#50afe1" : "#999",
            transform: "scale(1.2)",
          }}
        >
          <ThumbDownIcon />
        </IconButton>
      </Tooltip>
    </>
  );
});
ThumbIcons.displayName = "ThumbIcons";

export const SearchResult = memo((props) => {
  const lecture = props.lecture;
  const { id, title, lecturer, offered_by, semester, period, goal, plan } =
    lecture;
  const page = props.page;

  return (
    <Card sx={{ minWidth: 300 }} variant="outlined">
      <CardHeader
        title={title}
        subheader={lecturer}
        action={
          <>
            <ThumbIcons id={id} lecture={lecture} tastes={props.tastes} />
          </>
        }
      />
      <CardContent>
        <Chip label={offered_by} />
        <Chip label={semester} />
        <Chip label={period} />
        <LectureAccordion goal={goal} plan={plan} page={page} />
      </CardContent>
    </Card>
  );
});

SearchResult.displayName = "SearchResult";
