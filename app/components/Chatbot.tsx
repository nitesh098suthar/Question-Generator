"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [numQuestions, setNumQuestions] = useState<number | "">("");
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: `Give me ${numQuestions} only question like = ${input} of type ${type} for class ${level} in ${language} and all the questions should be ${difficulty}`,
      },
    ];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: data.response },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Error occurred." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Main content of your page */}
      <div className="p-4">
        <div className="mb-4 p-4 rounded-lg h-[90vh] overflow-y-scroll">
          {messages.map((msg, index) => (
            <div>
              {msg.role === "user" ? (
                <div
                  key={index}
                  className="bg-secondary w-fit p-2 px-4 rounded-md"
                >
                  {msg.content}
                </div>
              ) : (
                <div
                  key={index}
                  className="border my-2 w-fit p-2 px-4 rounded-md"
                >
                  {msg.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom panel */}
      <div className="fixed bottom-0 left-0 w-full bg-card border-t border-muted gap-2 flex items-center flex-col justify-between p-4 ">
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <Select onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Hindi</SelectItem>
              <SelectItem value="Medium">English</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setLevel(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Standard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1st">First</SelectItem>
              <SelectItem value="2nd">Second</SelectItem>
              <SelectItem value="3rd">Third</SelectItem>
              <SelectItem value="4th">Fourth</SelectItem>
              <SelectItem value="5th">Fifth</SelectItem>
              <SelectItem value="6th">Sixth</SelectItem>
              <SelectItem value="7th">Seventh</SelectItem>
              <SelectItem value="8th">Eighth</SelectItem>
              <SelectItem value="9th">Ninth</SelectItem>
              <SelectItem value="10th">Tenth</SelectItem>
              <SelectItem value="11th">Eleventh</SelectItem>
              <SelectItem value="12th">twelfth</SelectItem>
              <SelectItem value="12th">Graduation</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setDifficulty(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              placeholder="No. of questions"
            />
          </div>
          <Select onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">MCQ</SelectItem>
              <SelectItem value="Medium">True-False</SelectItem>
              <SelectItem value="Hard">One Line</SelectItem>
              <SelectItem value="Hard">Short</SelectItem>
              <SelectItem value="Hard">Medium</SelectItem>
              <SelectItem value="Hard">Long</SelectItem>
              <SelectItem value="Hard">Descriptive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Write your question here..."
          />

          <Button variant={"outline"} onClick={sendMessage} className="w-">
            <KeyboardArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
