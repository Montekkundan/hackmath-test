"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { upsertUserGrade, upsertUserStudy, upsertUserTopics, upsertUserReason } from "@/actions/user-data";

import { Option } from "./option";

type Props = {
  step: string;
};

const stepOptions = {
  grade: ["< 8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade", "Upper grade"],
  study: ["Coding", "Math", "Math + Coding"],
  topics: ["Statistics", "Calculus"],
  reason: [
    "Hard to keep on track with class",
    "Understand basic Concepts",
    "Wasn’t sure where to start",
  ],
};

export const Steps = ({ step }: Props) => {
  const [pending, startTransition] = useTransition();

  const onClick = (id: string) => {
    if (pending) return;

    const upsertActions = {
      grade: upsertUserGrade,
      study: upsertUserStudy,
      topics: upsertUserTopics,
      reason: upsertUserReason,
    };

    const upsertAction = upsertActions[step as keyof typeof upsertActions];

    if (upsertAction) {
      startTransition(() => {
        upsertAction(id).catch(() => toast.error("Something went wrong."));
      });
    }
  };

  const options = stepOptions[step as keyof typeof stepOptions] || [];

  return (
    <div className="pt-6 flex flex-col gap-4 w-1/2">
      {options.map((title, i) => (
        <Option key={i} title={title} id={title} onClick={() => onClick(title)} />
      ))}
    </div>
  );
}