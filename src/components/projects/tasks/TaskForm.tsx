import { useState } from "react";
import { TaskDto } from "../../../interfaces/taskInterfaces";
import FormInput from "../../default/FormInput";
import Label from "../../default/Label";
import Button from "../../default/Button";
import FormSelect from "../../default/FormSelect";

interface TaskFormProps extends TaskDto {
  perform: (data: TaskDto) => void;
  close: () => void;
}

export default function TaskForm(taskFormProps: TaskFormProps) {
  let [task, setTask] = useState<TaskDto>({
    ...taskFormProps,
    hoursSpent: taskFormProps.hoursSpent ? taskFormProps.hoursSpent : 0,
  });

  return (
    <>
      <form style={formStyles}>
        <Label name="Task title"></Label>
        <FormInput
          value={task.title}
          placeHolder="Enter task title"
          onChange={(e) => {
            setTask({ ...task, title: e.target.value });
          }}
        />

        <Label name="Task description"></Label>
        <FormInput
          value={task.description}
          placeHolder="Enter task description"
          onChange={(e) => {
            setTask({ ...task, description: e.target.value });
          }}
        />
        <Label name="Task priority"></Label>
        <FormSelect
          style={{ marginTop: "1vw" }}
          onChangeHandler={(e) => {
            setTask({ ...task, priority: e.target.value });
          }}
          options={["LOW", "NORMAL", "IMPORTANT", "CRITICAL"]}
        ></FormSelect>

        <Label name="Task deadline"></Label>
        <FormInput
          value={task.deadline}
          placeHolder="05.12.2025, 16:40:22 for example"
          onChange={(e) => {
            setTask({ ...task, deadline: e.target.value });
          }}
        ></FormInput>
        <Label name="Task hours spent"></Label>
        <FormInput
          value={String(task.hoursSpent)}
          placeHolder="0 by default"
          onChange={(e) => {
            setTask({ ...task, hoursSpent: e.target.value });
          }}
        ></FormInput>

        <Button
          style={{ marginBottom: "1vw", marginTop: "1vw" }}
          name="Submit"
          onClick={async (e) => {
            e.preventDefault();
            taskFormProps.perform({
              ...task,
            });
          }}
          isPrimary={true}
        ></Button>
        <Button
          name="Close"
          isPrimary={false}
          onClick={(e) => {
            e.preventDefault();
            taskFormProps.close();
          }}
        ></Button>
      </form>
    </>
  );
}

const formStyles: React.CSSProperties = {
  position: "absolute",
  top: "10vh",
  left: "25vw",
  width: "50vw",
  padding: "2vw",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  backgroundColor: "#F3F3FF",
};
