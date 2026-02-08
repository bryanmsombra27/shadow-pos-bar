import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface NotificationsProps {}
const Notifications: FC<NotificationsProps> = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 overflow-y-scroll h-100"
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">New deal created</p>
            <p className="text-xs text-muted-foreground">
              Sarah added a $25k deal with TechCorp
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Task due soon</p>
            <p className="text-xs text-muted-foreground">
              Follow up with Acme Inc in 2 hours
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Deal closed</p>
            <p className="text-xs text-muted-foreground">
              Mike closed a $15k deal with StartupXYZ
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Deal closed</p>
            <p className="text-xs text-muted-foreground">
              Mike closed a $15k deal with StartupXYZ
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Deal closed</p>
            <p className="text-xs text-muted-foreground">
              Mike closed a $15k deal with StartupXYZ
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Deal closed</p>
            <p className="text-xs text-muted-foreground">
              Mike closed a $15k deal with StartupXYZ
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Deal closed</p>
            <p className="text-xs text-muted-foreground">
              Mike closed a $15k deal with StartupXYZ
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Deal closed</p>
            <p className="text-xs text-muted-foreground">
              Mike closed a $15k deal with StartupXYZ
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Deal closed</p>
            <p className="text-xs text-muted-foreground">
              Mike closed a $15k deal with StartupXYZ
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
