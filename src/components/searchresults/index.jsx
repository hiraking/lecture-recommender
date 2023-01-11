export const SearchResult = (props) => {
  console.log(props);
  const lecture = props.lecture;

  return (
    <div>
      <p>search result component</p>
      <p>{lecture.title}</p>
    </div>
  );
};
