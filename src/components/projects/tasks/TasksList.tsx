import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { AxiosResponse } from "axios";
import { TaskDto } from "../../../interfaces/taskInterfaces";
import Task from "./Task";
import TaskForm from "./TaskForm";
import {
  prepareDate,
  parseDate,
  calculateTimePercentage,
} from "../../../util/DateUtil";

interface ChoosenTask extends TaskDto {
  perform: (task: TaskDto) => void;
}

interface TaskListProps {
  dashboardId?: string;
}

export default function TasksList({ dashboardId }: TaskListProps) {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  let [taskForm, setTaskForm] = useState<ChoosenTask | undefined>();
  const { api } = useAxios();

  async function getTasks() {
    try {
      const response: AxiosResponse<TaskDto[]> = await api.get(
        `/tasks/byProject/${dashboardId}`
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
      projectId: dashboardId,
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
      projectId: dashboardId,
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
  }, [dashboardId]);

  return (
    <>
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
      <div className="mt-[5vw] flex justify-start items-center flex-col pl-[15vw] w-full">
        <div className="flex justify-start items-center">
          <h1 className="text-3xl">Ваши задачи</h1>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded ml-[2vw]"
            onClick={() => {
              chooseTask({ projectId: dashboardId } as TaskDto, createTask);
            }}
          >
            Создать задачу
          </button>
        </div>
        <div className="flex justify-start items-center flex-col mt-[3vw] pb-[3vw]">
          {tasks.map((task) => (
            <Task
              key={task.taskId}
              task={task}
              patch={async () => chooseTask(task, patchTask)}
              del={deleteTask}
            />
          ))}
        </div>
      </div>
    </>
  );
}
