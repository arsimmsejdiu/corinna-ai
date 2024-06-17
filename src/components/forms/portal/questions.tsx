import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { PortalQuestionsFormProps } from "@/constants/types";

const QuestionsForm = ({
  questions,
  register,
  error,
  onNext,
}: PortalQuestionsFormProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold mb-5">Details</h2>
      </div>
      {questions.map((question) => (
        <FormGenerator
          defaultValue={question.answered || ""}
          key={question.id}
          name={`question-${question.id}`}
          errors={error}
          register={register}
          label={question.question}
          type="text"
          inputType="input"
          placeholder={question.answered || "No answer"}
        />
      ))}
      <Button className="" type="button" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};
