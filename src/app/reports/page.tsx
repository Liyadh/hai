
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AreaChart,
  BarChart3,
  Bus,
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  FileText,
  Filter,
  Home,
  MapPin,
  Route,
  Search,
  Settings,
  Share2,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const onTimeData = [
  { name: 'Week 1', onTime: 92, target: 95 },
  { name: 'Week 2', onTime: 94, target: 95 },
  { name: 'Week 3', onTime: 91, target: 95 },
  { name: 'Week 4', onTime: 96, target: 95 },
];

const occupancyData = [
  { name: 'Jan', occupancy: 75 },
  { name: 'Feb', occupancy: 78 },
  { name: 'Mar', occupancy: 82 },
  { name: 'Apr', occupancy: 80 },
];

const topRoutesData = [
    { name: 'Gudur Main', value: 45000 },
    { name: 'Rural Area', value: 32000 },
    { name: 'City Center', value: 28000 },
    { name: 'Industrial Zone', value: 15000 },
];

const tripSummaryData = [
    { date: '01/03/24', route: 'Gudur Main', bus: 'AP01AB1234', onTime: '✅', km: 28.5, students: '42/50', status: 'Completed' },
    { date: '01/03/24', route: 'Rural Area', bus: 'AP01AB5678', onTime: '❌ (12m)', km: 35.2, students: '38/45', status: 'Completed' },
];

export default function ReportsPage() {
  const [user, setUser] = React.useState<{ name: string; email: string; role: string } | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const navItems = [
    { name: "Home", icon: Home, href: "/dashboard" },
    { name: "Buses", icon: Bus, href: "/buses" },
    { name: "Drivers", icon: User, href: "/drivers" },
    { name: "Routes", icon: Route, href: "/routes" },
    { name: "Students", icon: Users, href: "/students" },
    { name: "Trips", icon: MapPin, href: "/trips" },
    { name: "Bus Details", icon: FileText, href: "/bus-details" },
    { name: "Reports", icon: TrendingUp, href: "/reports" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const pageTitle = navItems.find(item => item.href === pathname)?.name || "Page";

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r bg-primary text-primary-foreground">
        <SidebarHeader>
          <div className="flex h-10 items-center justify-center gap-2">
            <Bus className="h-6 w-6 text-primary-foreground" />
            <span className="text-lg font-semibold text-primary-foreground group-data-[collapsible=icon]:hidden">
              NBKR
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      tooltip={item.name}
                      isActive={pathname.startsWith(item.href)}
                      asChild
                    >
                      <div>
                        <item.icon />
                        <span>{item.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>
          </div>
          <div className="flex flex-1 items-center gap-4">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-full"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.name} />
                    <AvatarFallback>{user ? getInitials(user.name) : 'A'}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{user?.name || 'Admin'}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Reports &amp; Analytics</h1>
                    <p className="text-muted-foreground">Transport performance and compliance overview</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Share2 className="mr-2 h-4 w-4"/> Share</Button>
                    <Button><Download className="mr-2 h-4 w-4"/> Export PDF</Button>
                </div>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Filters</CardTitle>
                        <Button variant="ghost" size="sm">Reset</Button>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-4">
                     <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <Select defaultValue="month">
                            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                     <Select><SelectTrigger className="w-[180px]"><SelectValue placeholder="All Routes"/></SelectTrigger></Select>
                     <Select><SelectTrigger className="w-[180px]"><SelectValue placeholder="All Buses"/></SelectTrigger></Select>
                     <Select><SelectTrigger className="w-[180px]"><SelectValue placeholder="All Drivers"/></SelectTrigger></Select>
                     <Button>Apply Filters</Button>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">On-Time Performance</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">92%</div><p className="text-xs text-muted-foreground text-green-500">+2% MoM</p></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg Occupancy</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">78%</div><p className="text-xs text-muted-foreground">420/540 seats</p></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">4.2 km/L</div><p className="text-xs text-muted-foreground text-red-500">-5% MoM</p></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Incidents</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2</div><p className="text-xs text-muted-foreground">1 breakdown, 1 late</p></CardContent></Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader><CardTitle>On-Time Performance</CardTitle></CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={onTimeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="onTime" stroke="#10b981" />
                                <Line type="monotone" dataKey="target" stroke="#8884d8" strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Top Routes by Revenue</CardTitle></CardHeader>
                    <CardContent className="h-[300px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topRoutesData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={80} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#1E40AF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Detailed Reports</CardTitle>
                        <Button variant="outline" size="sm">Export All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                     <Tabs defaultValue="trips">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="trips">Trip Summary</TabsTrigger>
                            <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
                            <TabsTrigger value="capacity">Capacity Report</TabsTrigger>
                        </TabsList>
                        <TabsContent value="trips" className="mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Route</TableHead>
                                        <TableHead>Bus</TableHead>
                                        <TableHead>On-Time</TableHead>
                                        <TableHead>KM</TableHead>
                                        <TableHead>Students</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tripSummaryData.map((trip, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{trip.date}</TableCell>
                                            <TableCell>{trip.route}</TableCell>
                                            <TableCell>{trip.bus}</TableCell>
                                            <TableCell>{trip.onTime}</TableCell>
                                            <TableCell>{trip.km}</TableCell>
                                            <TableCell>{trip.students}</TableCell>
                                            <TableCell>{trip.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                         <TabsContent value="drivers" className="mt-4">
                            <p className="text-muted-foreground text-center py-8">Driver performance data will be shown here.</p>
                        </TabsContent>
                         <TabsContent value="capacity" className="mt-4">
                             <p className="text-muted-foreground text-center py-8">Capacity and overload reports will be shown here.</p>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    