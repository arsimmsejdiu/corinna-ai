import React from "react";
import { CardDescription } from "../ui/card";
import { Loader } from "../loader";

type TabDescriptionProps = {
  loading: boolean;
  description: string;
};

const TabDescription = ({ loading, description }: TabDescriptionProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <Loader loading={loading}>
        <CardDescription>{description}</CardDescription>
      </Loader>
    </div>
  );
};

export default TabDescription;
