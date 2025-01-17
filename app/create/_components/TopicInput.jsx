import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const TopicInput = ({
  setTopic,
  setDifficultyLevel,
  topicValue,
  difficultyLevel,
}) => {
  return (
    <div className="w-full ">
      <div className="mb-5">
        <h2>Enter Topic Name</h2>
        <Textarea
          placeholder="Enter Topic"
          onChange={(e) => setTopic(e.target.value)}
          value={topicValue}
          className="mt-2 w-full"
        ></Textarea>
      </div>
      <div>
        <h2>Select Difficulty Level</h2>
        <Select
          onValueChange={(value) => setDifficultyLevel(value)}
          value={difficultyLevel}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Difficulty Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Pro">Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TopicInput;
