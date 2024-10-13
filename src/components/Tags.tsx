type Props = {
  availableOrigins: string[];
  filterByTag: (tags: string[], shouldUpdate?: boolean) => void;
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
};

export default function Tags(props: Props) {
  return (
    <>
      {props.availableOrigins.length > 0 && (
        <div className="availableTagsContainer">
          {props.availableOrigins.map((origin: string, index: number) => (
            <div
              className={`tagButton ${
                props.selectedTags.includes(origin) && "active"
              }`}
              id={`tagButton${index}`}
              key={origin}
              onClick={() => {
                if (props.selectedTags.includes(origin)) {
                  props.setSelectedTags(
                    props.selectedTags.filter((tag) => tag !== origin)
                  );
                } else {
                  props.setSelectedTags([...props.selectedTags, origin]);
                }
              }}
            >
              {origin}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
