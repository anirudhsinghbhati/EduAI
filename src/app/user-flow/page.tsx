
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

const flowData = [
  {
    role: "Student",
    color: "bg-red-100 dark:bg-red-900/50 border-red-200 dark:border-red-800",
    textColor: "text-red-800 dark:text-red-200",
    steps: [
      "View Dashboard",
      "Get AI Recommendations",
      "Set Personal Goals",
      "Track Course Progress",
      "View Daily Schedule",
    ],
  },
  {
    role: "Teacher",
    color: "bg-green-100 dark:bg-green-900/50 border-green-200 dark:border-green-800",
    textColor: "text-green-800 dark:text-green-200",
    steps: [
      "View Dashboard",
      "Take Attendance via AI",
      "Take Attendance Manually",
      "View Class Averages",
      "Monitor Student Activity",
    ],
  },
  {
    role: "Admin",
    color: "bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800",
    textColor: "text-blue-800 dark:text-blue-200",
    steps: [
      "Monitor Platform Stats",
      "Manage Student Roster",
      "Add/Remove Classes",
      "Broadcast Announcements",
      "Oversee All Data",
    ],
  },
];

const FlowStep = ({ text, color, textColor }: { text: string, color: string, textColor: string }) => (
  <Card className={`w-full max-w-xs p-4 text-center shadow-md ${color} ${textColor}`}>
    <CardContent className="p-0">
      <p className="font-semibold">{text}</p>
    </CardContent>
  </Card>
);

const RoleColumn = ({ role, color, textColor, steps }: { role: string, color: string, textColor: string, steps: string[] }) => (
  <div className="flex flex-col items-center gap-4">
    <h2 className={`text-2xl font-bold p-2 rounded-md ${color} ${textColor}`}>{role}</h2>
    <div className="flex flex-col items-center gap-2">
      {steps.map((step, index) => (
        <>
          <FlowStep text={step} color={color} textColor={textColor} />
          {index < steps.length - 1 && <ArrowDown className={`w-6 h-6 ${textColor}`} />}
        </>
      ))}
    </div>
  </div>
);

export default function UserFlowPage() {
  return (
    <div className="w-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">User Flow</h1>
            <p className="text-muted-foreground mt-2">A high-level overview of the primary user journeys in EduAI.</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
        {flowData.map((data) => (
          <RoleColumn key={data.role} {...data} />
        ))}
      </div>
    </div>
  );
}
