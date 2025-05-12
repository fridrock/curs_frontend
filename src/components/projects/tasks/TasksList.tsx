import { useState, useEffect } from "react";
import Button from "../../default/Button";
import useAxios from "../../../hooks/useAxios";
import { AxiosResponse } from "axios";
import { TaskDto } from "../../../interfaces/taskInterfaces";
import Header from "../../default/Header";
import { useParams } from "react-router";
import Task from "./Task";
import TaskForm from "./TaskForm";
import {
  prepareDate,
  parseDate,
  calculateTimePercentage,
} from "../../../util/DateUtil";
import {
  CENTRALIZED_COLUMN,
  CENTRALIZED_ROW,
} from "../../../styles/defaultStyles";
import logo from "../../../img/illustration3.jpg";

interface ChoosenTask extends TaskDto {
  perform: (task: TaskDto) => void;
}

export default function TasksList() {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  let [taskForm, setTaskForm] = useState<ChoosenTask | undefined>();
  const { api } = useAxios();

  async function getTasks() {
    try {
      const response: AxiosResponse<TaskDto[]> = await api.get(
        `/tasks/byProject/${projectId}`
      );
      response.data.forEach((task) => {
        task.deadline = prepareDate(task.deadline);
        task.issued = prepareDate(task.issued);
      });
      response.data = response.data.sort(
        (task1, task2) =>
          calculateTimePercentage(task2.issued, task2.deadline) -
          calculateTimePercentage(task1.issued, task1.deadline)
      );
      setTasks(response.data);
    } catch (error) {
      console.log(`error fetching projects ${error}`);
    }
  }

  async function createTask(task: TaskDto) {
    let taskDto: TaskDto = {
      projectId: projectId,
      priority: task.priority,
      description: task.description,
      title: task.title,
      deadline: parseDate(task.deadline),
      hoursSpent: Number(task.hoursSpent),
      issued: "",
    };
    try {
      const response: AxiosResponse<TaskDto> = await api.post<TaskDto>(
        "/tasks",
        taskDto
      );
      response.data.deadline = prepareDate(response.data.deadline);
      response.data.issued = prepareDate(response.data.issued);
      setTasks([...tasks, response.data]);
      closeForm();
    } catch (error) {
      console.log(`error creating task ${error}`);
    }
  }

  async function patchTask(task: TaskDto): Promise<void> {
    console.log(task);
    let taskDto: TaskDto = {
      taskId: task.taskId,
      projectId: projectId,
      priority: task.priority,
      description: task.description,
      title: task.title,
      deadline: parseDate(task.deadline),
      hoursSpent: Number(task.hoursSpent),
      issued: "",
    };
    try {
      const response: AxiosResponse<TaskDto> = await api.patch<TaskDto>(
        "/tasks",
        taskDto
      );

      response.data.deadline = prepareDate(response.data.deadline);
      response.data.issued = prepareDate(response.data.issued);
      let newTasks = [
        ...tasks.filter((tsk) => tsk.taskId != taskDto.taskId),
        response.data,
      ];
      newTasks = newTasks.sort(
        (task1, task2) =>
          calculateTimePercentage(task2.issued, task2.deadline) -
          calculateTimePercentage(task1.issued, task1.deadline)
      );
      setTasks(newTasks);
      closeForm();
    } catch (error) {
      console.log(`error patching task ${error}`);
    }
  }

  async function deleteTask(id?: string): Promise<void> {
    try {
      const response: AxiosResponse<void> = await api.delete<void>(
        `/tasks/${id}`
      );
      setTasks(tasks.filter((task) => task.taskId != id));
    } catch (error) {
      console.log(`error deleting task with id ${id}`);
    }
  }

  function chooseTask(task: TaskDto, callback: (dto: TaskDto) => void) {
    setTaskForm({ ...task, perform: callback });
  }

  function closeForm() {
    setTaskForm(undefined);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Header></Header>
      {taskForm ? (
        <TaskForm
          title={taskForm.title}
          taskId={taskForm.taskId}
          perform={taskForm ? taskForm.perform : createTask}
          projectId={taskForm.projectId}
          description={taskForm.description}
          issued={taskForm.description}
          deadline={taskForm.deadline}
          priority={taskForm.priority ? taskForm.priority : "LOW"}
          hoursSpent={taskForm.hoursSpent}
          close={closeForm}
        ></TaskForm>
      ) : (
        <></>
      )}
      <div style={CENTRALIZED_COLUMN}>
        <div style={{ ...CENTRALIZED_ROW, margin: "2vw" }}>
          <h1 style={{ color: "#555555", fontSize: "2vw" }}>
            Create and explore your tasks
          </h1>
          <Button
            style={{ marginLeft: "1vw" }}
            name="Create"
            onClick={() => {
              chooseTask({ projectId } as TaskDto, createTask);
            }}
            isPrimary={true}
          />
        </div>
        <div style={CENTRALIZED_ROW}>
          <img src={logo} style={{ width: "40vw" }}></img>
          <div style={{ ...CENTRALIZED_COLUMN, ...tasksListStyle }}>
            {tasks.map((task) => (
              <Task
                key={task.taskId}
                task={task}
                patchCallback={async () => chooseTask(task, patchTask)}
                deleteCallback={deleteTask}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
const tasksListStyle: React.CSSProperties = {
  flex: "1",
  height: "80vh",
  width: "50vw",
  overflowY: "scroll",
  marginLeft: "3vw",
};
