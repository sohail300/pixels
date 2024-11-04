import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CustomAvatarGroup = ({ maxCount = 5 }) => {
  const data = [
    {
      key: "alice@example.com",
      name: "Alice Johnson",
      src: "https://i.pravatar.cc/150?img=1",
    },
    {
      key: "bob@example.com",
      name: "Bob Smith",
      src: "https://i.pravatar.cc/150?img=2",
    },
    {
      key: "carol@example.com",
      name: "Carol Davis",
      src: "https://i.pravatar.cc/150?img=3",
    },
    {
      key: "dave@example.com",
      name: "Dave Williams",
      src: "https://i.pravatar.cc/150?img=4",
    },
    {
      key: "eve@example.com",
      name: "Eve Taylor",
      src: "https://i.pravatar.cc/150?img=5",
    },
    {
      key: "dave@example.com",
      name: "Dave Williams",
      src: "https://i.pravatar.cc/150?img=6",
    },
    {
      key: "eve@example.com",
      name: "Eve Taylor",
      src: "https://i.pravatar.cc/150?img=7",
    },
  ];

  const [isHovered, setIsHovered] = useState(false);
  const visibleData = data.slice(0, maxCount);
  const remaining = Math.max(0, data.length - maxCount);

  return (
    <TooltipProvider>
      <div className="flex -space-x-4">
        {visibleData.map((user, i) => (
          <Tooltip key={user.key || i}>
            <TooltipTrigger asChild>
              <Avatar className="border-2 border-white hover:translate-y-[-4px] transition-transform cursor-pointer">
                <AvatarImage src={user.src} alt={user.name} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {user.name?.charAt(0)?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        {remaining > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-400 border-2 border-white rounded-full cursor-pointer hover:translate-y-[-4px] transition-transform"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                +{remaining}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{remaining} more users</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default CustomAvatarGroup;
