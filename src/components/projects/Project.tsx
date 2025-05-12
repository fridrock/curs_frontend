import { AxiosResponse } from "axios";
import useAxios from "../../hooks/useAxios";
import { ProjectDto } from "../../interfaces/projectInterfaces";
import Button from "../default/Button";
import { NavLink } from "react-router";
import IconButton from "../default/IconButton";
import deleteLogo from "../../img/delete.svg";
import editLogo from "../../img/edit.svg";
import Link from "../default/Link";

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
    <div
      style={{
        minHeight: "10vh",
        borderBottom: "1px solid #555555",
        width: "100%",
        padding: "1vw",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Link
        style={{ fontSize: "2vw" }}
        to={`/projects/${project.projectId}`}
        name={project.name}
      />
      <IconButton
        logo={editLogo}
        onClick={(e) => patchCallback()}
        style={{ marginLeft: "auto", marginRight: "2vw" }}
      ></IconButton>
      <IconButton
        logo={deleteLogo}
        onClick={(e) => deleteCallback(project.projectId)}
      />
    </div>
  );
}
