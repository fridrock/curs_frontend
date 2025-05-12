import { AxiosResponse } from "axios";
import useAxios from "../../hooks/useAxios";
import { ProjectDto } from "../../interfaces/projectInterfaces";
import Button from "../default/Button";
import { NavLink } from "react-router";

interface ProjectProps {
  project: ProjectDto;
  patchCallback: () => Promise<void>;
  deleteCallback: (id?: string) => Promise<void>;
}

export default function Project({
  project,
  patchCallback,
  deleteCallback,
}: ProjectProps) {
  const { api } = useAxios();

  return (
    <div>
      <NavLink to={`/projects/${project.projectId}`}>{project.name}</NavLink>
      <Button
        isPrimary={true}
        name="Delete"
        onClick={(e) => deleteCallback(project.projectId)}
      ></Button>

      <Button
        isPrimary={true}
        name="Patch"
        onClick={(e) => patchCallback()}
      ></Button>
    </div>
  );
}
