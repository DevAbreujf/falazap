import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MessageSquare, Instagram, MessagesSquare } from "lucide-react"

interface AgentDetailsProps {
  selectedAgent: number | null;
  onClose: () => void;
}

export function AgentDetails({ selectedAgent, onClose }: AgentDetailsProps) {
  return (
    <Sheet open={selectedAgent !== null} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Agent Details</SheetTitle>
          <SheetDescription>
            View and manage agent configuration
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Configuration</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Name</label>
                <Input defaultValue="Customer Support Bot" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Description</label>
                <Input defaultValue="24/7 customer support assistant" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Integrations</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" className="justify-start">
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </Button>
              <Button variant="outline" className="justify-start">
                <MessagesSquare className="mr-2 h-4 w-4" />
                Web Chat
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}