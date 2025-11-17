import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from '@clerk/clerk-react';

function SemiAdminHeader({ setOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block   bg-blue-800 hover:bg-blue-400">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end ">
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverActionButton__manageAccount: "hidden", // Hide "Manage Account"
              userButtonPopoverFooter: "hidden",        // Hide footer if needed // Hide "Manage Account"
            },
          }}
        />
      </div>
    </header>
  );
}

export default SemiAdminHeader;
