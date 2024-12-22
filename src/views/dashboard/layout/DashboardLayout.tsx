import {
  Home,
  Landmark,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  SquareChartGantt,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import User from "../thisComponents/User";
import Providers from "../thisComponents/providers";
import NavItem from "../thisComponents/NavItem";
import SearchInput from "../thisComponents/SearchInput";
import NavItemMobile from "../thisComponents/NavItemMobile";
import { Link } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="items-center justify-between space-y-2 hidden sm:flex">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
           </div>
            <MobileNav />
            <SearchInput />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-neutral-950 text-lg font-semibold text-white md:h-8 md:w-8 md:text-base"
        >
          <SquareChartGantt className="h-4 w-4" />
          <span className="sr-only">Certifia</span>
        </Link>

        <NavItem href="/dashboard" label="All students">
            <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/dashboard/insurances" label="All insurances">
          <Landmark className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <SheetClose asChild>
            <Link
              to="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Vercel</span>
            </Link>
          </SheetClose>

          <NavItemMobile href="/dashboard/" label="users">
            <Home className="h-5 w-5" />
          </NavItemMobile>

          <NavItemMobile href="/dashboard/insurances" label="insurances">
            <ShoppingCart className="h-5 w-5" />
          </NavItemMobile>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

