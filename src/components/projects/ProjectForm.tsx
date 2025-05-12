import { useState } from "react";
import { ProjectDto } from "../../interfaces/projectInterfaces";
import FormInput from "../default/FormInput";
import Label from "../default/Label";
import Button from "../default/Button";

interface ProjectForm {
  name: string;
  projectId?: string;
}

interface ProjectFormProps extends ProjectForm {
  perform: (data: ProjectDto) => void;
  close: () => void;
}

export default function ProjectForm(projectFormProps: ProjectFormProps) {
  let [projectForm, setProjectForm] = useState<ProjectForm>(projectFormProps);
  return (
    <>
      <form style={formStyles}>
        <Label name="Project name"></Label>
        <FormInput
          value={projectForm.name}
          placeHolder="Enter project name"
          onChange={(e) => {
            setProjectForm({ ...projectForm, name: e.target.value });
          }}
        />

        <Button
          name="Submit"
          style={{
            marginTop: "1vw",
          }}
          onClick={async (e) => {
            e.preventDefault();
            projectFormProps.perform({
              name: projectForm.name,
              projectId: projectForm.projectId ? projectForm.projectId : "",
            });
          }}
          isPrimary={true}
        ></Button>
        <Button
          style={{
            marginTop: "1vw",
          }}
          name="Close"
          isPrimary={false}
          onClick={(e) => {
            e.preventDefault();
            projectFormProps.close();
          }}
        ></Button>
      </form>
    </>
  );
}

const formStyles: React.CSSProperties = {
  position: "absolute",
  top: "25vh",
  left: "25vw",
  width: "50vw",
  height: "50vh",
  borderRadius: "10px",
  backgroundColor: "#F3F3FF",
  padding: "2vw",
  display: "flex",
  flexDirection: "column",
};
