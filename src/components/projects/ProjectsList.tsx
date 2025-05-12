import { useState, useEffect } from "react";
import Project from "./Project";
import { ProjectDto } from "../../interfaces/projectInterfaces";
import Button from "../default/Button";
import useAxios from "../../hooks/useAxios";
import { AxiosResponse } from "axios";
import ProjectForm from "./ProjectForm";
import Header from "../default/Header";

interface ChoosenProject {
  name: string;
  projectId?: string;
  perform: (project: ProjectDto) => void;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  let [projectForm, setProjectForm] = useState<ChoosenProject | undefined>();
  const { api } = useAxios();

  async function getProjects() {
    try {
      const response: AxiosResponse<ProjectDto[]> = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.log(`error fetching projects ${error}`);
    }
  }

  async function createProject(project: ProjectDto) {
    try {
      const response: AxiosResponse<ProjectDto> = await api.post<ProjectDto>(
        "/projects",
        project
      );
      setProjects([...projects, response.data]);
      closeForm();
    } catch (error) {
      console.log(`error creating project ${error}`);
    }
  }

  async function patchProject(project: ProjectDto): Promise<void> {
    try {
      const response: AxiosResponse<ProjectDto> = await api.patch<ProjectDto>(
        "/projects",
        project
      );
      setProjects([
        ...projects.filter((pr) => pr.projectId != project.projectId),
        response.data,
      ]);
      closeForm();
    } catch (error) {
      console.log(`error creating project ${error}`);
    }
  }

  async function deleteProject(id?: string): Promise<void> {
    try {
      const response: AxiosResponse<void> = await api.delete<void>(
        `/projects/${id}`
      );
      setProjects(projects.filter((project) => project.projectId != id));
    } catch (error) {
      console.log(`error deleting project with id ${id}`);
    }
  }

  function chooseProject(
    project: ProjectDto,
    callback: (dto: ProjectDto) => void
  ) {
    setProjectForm({ ...project, perform: callback });
  }

  function closeForm() {
    setProjectForm(undefined);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <Header></Header>
      {projectForm ? (
        <ProjectForm
          name={projectForm.name}
          perform={projectForm ? projectForm.perform : createProject}
          projectId={projectForm.projectId}
          close={closeForm}
        ></ProjectForm>
      ) : (
        <></>
      )}
      <Button
        name="Create"
        onClick={() => {
          chooseProject({ name: "" }, createProject);
        }}
        isPrimary={false}
      ></Button>
      <div style={projectsListStyle}>
        {projects.map((project) => (
          <Project
            key={project.projectId}
            project={project}
            deleteCallback={deleteProject}
            patchCallback={async () => chooseProject(project, patchProject)}
          />
        ))}
      </div>
    </>
  );
}

const projectsListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
};
