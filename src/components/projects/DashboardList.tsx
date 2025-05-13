import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { ProjectDto } from "../../interfaces/projectInterfaces";
import useAxios from "../../hooks/useAxios";
import { AxiosResponse } from "axios";
import DashboardForm from "./DashboardForm";
import TasksList from "./tasks/TasksList";

interface EditDashboard {
  name: string;
  projectId?: string;
  perform: (project: ProjectDto) => void;
}

export default function DashboardList() {
  const [dashboards, setDashboards] = useState<ProjectDto[]>([]);
  let [dashboardForm, setDashboardForm] = useState<EditDashboard | undefined>();
  let [dashboardChoosen, setDashboardChoosen] = useState<string | undefined>();
  const { api } = useAxios();

  async function getDashboards() {
    try {
      const response: AxiosResponse<ProjectDto[]> = await api.get("/projects");
      setDashboards(response.data);
    } catch (error) {
      console.log(`error fetching dashboards ${error}`);
    }
  }

  async function createDashboard(dashboard: ProjectDto) {
    try {
      const response: AxiosResponse<ProjectDto> = await api.post<ProjectDto>(
        "/projects",
        dashboard
      );
      setDashboards([...dashboards, response.data]);
      closeForm();
    } catch (error) {
      console.log(`error creating dashboard ${error}`);
    }
  }

  async function patchDashboard(dashboard: ProjectDto): Promise<void> {
    try {
      const response: AxiosResponse<ProjectDto> = await api.patch<ProjectDto>(
        "/projects",
        dashboard
      );
      setDashboards([
        ...dashboards.filter((pr) => pr.projectId != dashboard.projectId),
        response.data,
      ]);
      closeForm();
    } catch (error) {
      console.log(`error patching dashboard ${error}`);
    }
  }

  async function deleteDashboard(id?: string): Promise<void> {
    try {
      const response: AxiosResponse<void> = await api.delete<void>(
        `/projects/${id}`
      );
      setDashboards(
        dashboards.filter((dashboard) => dashboard.projectId != id)
      );
      setDashboardChoosen(undefined);
    } catch (error) {
      console.log(`error deleting project with id ${id}`);
    }
  }

  function openEditDashboardForm(
    project: ProjectDto,
    callback: (dto: ProjectDto) => void
  ) {
    setDashboardForm({ ...project, perform: callback });
  }

  function closeForm() {
    setDashboardForm(undefined);
  }

  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <>
      {dashboardForm ? (
        <DashboardForm
          name={dashboardForm.name}
          perform={dashboardForm ? dashboardForm.perform : createDashboard}
          projectId={dashboardForm.projectId}
          close={closeForm}
        ></DashboardForm>
      ) : (
        <></>
      )}
      <div className="w-full h-full flex justify-center items-center">
        <div className="fixed top-[0] left-[0] py-[5vw] w-[15vw] h-[100%] bg-red-900">
          <div className="flex justify-start items-center p-5">
            <p className="text-[white] text-3xl">Доски</p>
            <button
              className="bg-white text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-md ml-[auto]"
              onClick={() => {
                openEditDashboardForm({ name: "" }, createDashboard);
              }}
            >
              Создать доску
            </button>
          </div>
          {dashboards.map((project) => (
            <Dashboard
              key={project.projectId}
              choosen={dashboardChoosen == project.projectId}
              choose={() => {
                setDashboardChoosen((prevstate) => project.projectId);
              }}
              dashboard={project}
              del={deleteDashboard}
              patch={async () => openEditDashboardForm(project, patchDashboard)}
            />
          ))}
        </div>
        {dashboardChoosen ? (
          <>
            <TasksList dashboardId={dashboardChoosen}></TasksList>
          </>
        ) : (
          <h1 className="text-[black] self-center mt-[20vw] text-5xl">
            Выберите доску
          </h1>
        )}
      </div>
    </>
  );
}
