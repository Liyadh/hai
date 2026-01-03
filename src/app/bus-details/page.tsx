
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Bus,
  ChevronDown,
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  Home,
  MapPin,
  MoreVertical,
  Printer,
  Replace,
  Route,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  Upload,
  User,
  Users,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


const documents = [
    { name: "Fitness Certificate (FC)", validTill: "15/06/2026", daysLeft: 15, status: "warning", certNo: "TCAP123456789", issueDate: "01/01/2025", authority: "AP RTO Gudur", file: "fc_cert.pdf" },
    { name: "Insurance Policy", validTill: "30/12/2026", daysLeft: 350, status: "valid", certNo: "IRDA1234567890", issueDate: "31/12/2025", authority: "New India Assurance", file: "insurance.pdf" },
    { name: "Pollution Certificate (PUC)", validTill: "15/03/2026", daysLeft: 72, status: "valid", certNo: "PUCAP123456", issueDate: "16/09/2025", authority: "Galaxy Services", file: "puc.pdf" },
    { name: "Route Permit", validTill: "31/03/2027", daysLeft: 440, status: "valid", certNo: "EDUAP123456", issueDate: "01/04/2022", authority: "AP RTO Gudur", file: "permit.pdf" },
    { name: "Tax Receipt", validTill: "15/04/2026", daysLeft: 94, status: "valid", certNo: "TAXREC_Q1_2026", issueDate: "14/04/2026", authority: "AP Transport Dept.", file: "tax.pdf" },
];

const getStatusInfo = (status: string) => {
    switch (status) {
        case 'warning': return { icon: AlertTriangle, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' };
        case 'expired': return { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20' };
        case 'valid':
        default: return { icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' };
    }
}

export default function BusDetailsPage() {
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

  const pageTitle = navItems.find(item => item.href === pathname)?.name || "Bus Details";

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r bg-primary text-primary-foreground">
        <SidebarHeader>
          <div className="flex h-10 items-center justify-center gap-2">
            <Bus className="h-6 w-6 text-primary-foreground" />
            <span className="text-lg font-semibold text-primary-foreground group-data-[collapsible=icon]:hidden">
              Bus Dashboard
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
                placeholder="Quick find bus..."
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

        <main className="flex-1 overflow-auto p-4 md:p-6 flex flex-col">
            <div className={cn("p-4 rounded-lg mb-6 flex items-center justify-between", getStatusInfo('warning').bgColor, getStatusInfo('warning').borderColor)}>
                <div className="flex items-center gap-3">
                    <AlertTriangle className={cn("h-6 w-6", getStatusInfo('warning').color)} />
                    <div>
                        <h3 className="font-semibold text-lg">2 Documents Expiring Soon</h3>
                        <p className="text-sm text-muted-foreground">FC: 15 days | Insurance: 45 days</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Bulk Renew</Button>
                    <Button variant="outline" size="sm">Print Checklist</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                {/* Left Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Select Bus</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Select defaultValue="AP01AB1234">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a bus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AP01AB1234">AP01AB1234</SelectItem>
                                    <SelectItem value="AP01AB5678">AP01AB5678</SelectItem>
                                    <SelectItem value="AP01AC7890">AP01AC7890</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between"><span>Bus No.</span><span className="font-medium flex items-center gap-2">AP01AB1234 <Copy className="w-4 h-4 cursor-pointer"/></span></div>
                            <div className="flex justify-between"><span>Capacity</span><span className="font-medium">50 Seats</span></div>
                            <div className="flex justify-between"><span>Registration</span><span className="font-medium">AP01AB1234</span></div>
                            <div className="flex justify-between"><span>Model</span><span className="font-medium">Ashok Leyland 2022</span></div>
                            <div className="flex justify-between items-center"><span>Status</span><Badge className="bg-green-500 hover:bg-green-600">Active</Badge></div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Quick Stats</CardTitle></CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><strong>Total Trips:</strong> 12 this week</p>
                            <p><strong>Total Distance:</strong> 450 km</p>
                            <p><strong>Fuel Consumed:</strong> ~₹2,500</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2">
                     <Tabs defaultValue="documents" className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="photos">Photos & Maintenance</TabsTrigger>
                            <TabsTrigger value="history">Trip History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="documents" className="flex-1 mt-6">
                            <Card>
                                <CardHeader><CardTitle>Compliance Documents</CardTitle></CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible defaultValue="item-0">
                                        {documents.map((doc, index) => {
                                            const status = getStatusInfo(doc.status);
                                            return (
                                            <AccordionItem value={`item-${index}`} key={index}>
                                                <AccordionTrigger>
                                                    <div className="flex items-center justify-between w-full pr-4">
                                                        <div className="flex items-center gap-3">
                                                           <status.icon className={cn("w-5 h-5", status.color)} />
                                                           <span className="font-semibold">{doc.name}</span>
                                                        </div>
                                                        <Badge variant={doc.status === 'valid' ? 'default': 'destructive'} className={cn({'bg-yellow-500 text-white': doc.status === 'warning'}, {'bg-green-500 text-white': doc.status === 'valid'})}>
                                                            Valid till: {doc.validTill}
                                                        </Badge>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 bg-muted/50 rounded-md">
                                                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                                        <p><strong>Certificate No:</strong> {doc.certNo}</p>
                                                        <p><strong>Issuing Authority:</strong> {doc.authority}</p>
                                                        <p><strong>Issue Date:</strong> {doc.issueDate}</p>
                                                        <p><strong>Expiry Date:</strong> {doc.validTill}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between p-2 rounded-md border bg-background">
                                                         <div className="flex items-center gap-2 font-medium">
                                                            <FileText className="w-5 h-5 text-primary" />
                                                            <span>{doc.file}</span>
                                                         </div>
                                                         <div className="flex items-center gap-2">
                                                            <Button variant="ghost" size="sm"><Eye className="mr-2 h-4 w-4"/>Preview</Button>
                                                            <Button variant="ghost" size="sm"><Upload className="mr-2 h-4 w-4"/>Replace</Button>
                                                            <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
                                                         </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )})}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="photos" className="flex-1 mt-6">
                            <Card>
                                <CardHeader><CardTitle>Photos & Maintenance</CardTitle></CardHeader>
                                <CardContent>
                                    <h3 className="font-semibold mb-4">Photo Gallery</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        {["Exterior Front", "Exterior Side", "Interior Seats", "Dashboard"].map(label => (
                                            <div key={label} className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center text-sm text-muted-foreground p-2">
                                                <Upload className="w-6 h-6 mb-2"/>
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                    <h3 className="font-semibold mb-4">Maintenance Log</h3>
                                    <p className="text-muted-foreground">Maintenance history will be shown here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="history" className="flex-1 mt-6">
                             <Card>
                                <CardHeader><CardTitle>Trip History</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">A table of past trips for this bus will be shown here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            
            <div className="sticky bottom-0 mt-auto bg-background/95 py-4 border-t flex justify-end gap-2">
                 <Button variant="outline">Back to Buses</Button>
                 <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                 <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download ZIP</Button>
                 <Button>Save Changes</Button>
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
