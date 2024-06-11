import React from "react";
import FormGenerator from "../form-generator";
import { DomainUpdateProps } from "@/constants/types";

export const DomainUpdate = ({name, register, errors}: DomainUpdateProps) => {
    return (
        <div className="flex gap-2 pt-5 items-end w-[400px]">
            <FormGenerator 
                label="Domain name"
                register={register}
                name="domain"
                errors={errors}
                type="text"
                inputType="input"
                placeholder={name}
            />
        </div>
    )
}