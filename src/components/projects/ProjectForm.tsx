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
  top: "25%",
  left: "25%",
  width: "50%",
  height: "50%",
  backgroundColor: "gray",
  display: "flex",
  flexDirection: "column",
};
