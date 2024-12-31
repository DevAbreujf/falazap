import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EditorSidebar } from "@/components/app/funnel-editor/EditorSidebar";
import { FlowEditor } from "@/components/app/funnel-editor/FlowEditor";
import { EditorHeader } from "@/components/app/funnel-editor/EditorHeader";

export default function FunnelEditor() {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <FlowEditor />
      </div>
    </div>
  );
}