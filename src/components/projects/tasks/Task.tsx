import useAxios from "../../../hooks/useAxios";
import { TaskDto } from "../../../interfaces/taskInterfaces";
import Button from "../../default/Button";
import { calculateTimePercentage } from "../../../util/DateUtil";
import IconButton from "../../default/IconButton";
import editLogo from "../../../img/edit.svg";

interface TaskProps {
  task: TaskDto;
  patchCallback: () => Promise<void>;
  deleteCallback: (id?: string) => Promise<void>;
}
function getPercentageColor(percentage: number): string {
  const pct = Math.max(0, Math.min(100, percentage));

  let r: number, g: number;
  if (pct < 50) {
    r = Math.floor(255 * (pct / 50));
    g = 255;
  } else {
    r = 255;
    g = Math.floor(255 * ((100 - pct) / 50));
  }

  return `rgba(${r}, ${g}, 0, 0.3)`;
}
export default function Task({
  task,
  patchCallback,
  deleteCallback,
}: TaskProps) {
  const { api } = useAxios();

  return (
    <div
      style={{
        ...taskContainerStyle,
        backgroundColor: getPercentageColor(
          calculateTimePercentage(task.issued, task.deadline)
        ),
      }}
    >
      <div style={taskHeaderStyle}>
        <h2
          style={{
            fontWeight: 1000,
            fontSize: "2vw",
            textTransform: "uppercase",
          }}
        >
          {" "}
          {task.title}
        </h2>
        <p
          style={{
            marginLeft: "1vw",
            color: "#555555",
            fontWeight: 600,
            fontSize: "1.4vw",
          }}
        >
          {task.priority}
        </p>
        <IconButton
          logo={editLogo}
          style={{ marginLeft: "auto" }}
          onClick={(e) => patchCallback()}
        />
        <Button
          style={{
            marginLeft: "0.5vw",
          }}
          isPrimary={true}
          name="Done"
          onClick={(e) => deleteCallback(task.taskId)}
        />
      </div>
      <p style={{ ...defaultText, marginBottom: "1vw" }}>
        <span style={highlightedText}>Description: </span>
        {task.description}
      </p>
      <p style={{ ...defaultText, marginBottom: "1vw" }}>
        <span style={highlightedText}>Hours spent: </span>
        {task.hoursSpent}
      </p>
      <p style={{ ...defaultText, marginBottom: "1vw" }}>
        <span style={highlightedText}>Issued at: </span>
        {task.issued}
      </p>
      <p style={defaultText}>
        <span style={highlightedText}>Deadline is: </span>
        {task.deadline}
      </p>
    </div>
  );
}

const taskContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "fit-content",
  width: "100%",
  padding: "1vw",
  borderRadius: "10px",
  marginBottom: "1vw",
};

const taskHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
};

const highlightedText: React.CSSProperties = {
  color: "#555555",
  textTransform: "uppercase",
  fontSize: "1.3vw",
  fontWeight: 600,
};

const defaultText: React.CSSProperties = {
  fontSize: "1.2vw",
  width: "100%",
  wordBreak: "break-all",
  fontWeight: 500,
};
