"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Target } from "lucide-react";

type Goal = {
  id: number;
  text: string;
  completed: boolean;
};

const initialGoals: Goal[] = [
  { id: 1, text: "Achieve 95% in Mathematics final exam", completed: false },
  { id: 2, text: "Read 2 non-fiction books this month", completed: true },
  { id: 3, text: "Start a personal project on web development", completed: false },
];

export function GoalSetting() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState("");

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        { id: Date.now(), text: newGoal.trim(), completed: false },
        ...goals,
      ]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            My Goals
        </CardTitle>
        <CardDescription>Set and track your personal and academic goals.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
          />
          <Button onClick={handleAddGoal} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[200px] w-full pr-4 -mr-4">
          <div className="space-y-2">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center space-x-3 p-2 rounded-md transition-colors hover:bg-secondary/50"
              >
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoal(goal.id)}
                />
                <label
                  htmlFor={`goal-${goal.id}`}
                  className={`flex-1 text-sm font-medium leading-none cursor-pointer ${
                    goal.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {goal.text}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
