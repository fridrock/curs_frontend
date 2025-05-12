interface TaskDto{
    taskId?: string;
    projectId?: string;
    title: string;
    description: string;
    deadline: string;
    issued: string;
    priority: string;
    hoursSpent: number | string;
}

export type {TaskDto}