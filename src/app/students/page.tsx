
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Bus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  FilePen,
  FileText,
  Filter,
  GraduationCap,
  Home,
  Loader2,
  MapPin,
  MoreHorizontal,
  PlusCircle,
  QrCode,
  Route,
  Search,
  Settings,
  TrendingUp,
  User,
  Users,
  Upload,
  Download,
  UserCheck,
  UserX,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const studentSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  studentId: z.string().optional(),
  classYear: z.string().min(1, "Class/Year is required."),
  parentName: z.string().min(1, "Parent's name is required."),
  parentPhone: z.string().regex(/^\+91-\d{10}$/, "Enter a valid 10-digit phone number with country code."),
  route: z.string().min(1, "Route is required."),
  stop: z.string().min(1, "Stop is required."),
  bus: z.string().optional(),
  boardingStatus: z.enum(["Confirmed", "Waitlist"]),
});

type Student = z.infer<typeof studentSchema>;

const sampleStudents: (Student & { id: number; avatar: string, status: string })[] = [
  { id: 1, name: "Priya Sharma", studentId: "S001", classYear: "10A", route: "Gudur Main", stop: "Gandhi Circle", bus: "AP01AB1234", status: "Allocated", parentName: "Anita Sharma", parentPhone: "+91-9876543210", boardingStatus: "Confirmed", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: 2, name: "Rahul Kumar", studentId: "S002", classYear: "12B", route: "Rural Area", stop: "Village Center", bus: "AP01AB5678", status: "Pending", parentName: "Sunil Kumar", parentPhone: "+91-9988776655", boardingStatus: "Confirmed", avatar: "https://i.pravatar.cc/150?u=rahul" },
  { id: 3, name: "Aisha Khan", studentId: "S003", classYear: "11C", route: "City Center", stop: "Main Market", bus: "AP01AC7890", status: "Allocated", parentName: "Imran Khan", parentPhone: "+91-9123456789", boardingStatus: "Confirmed", avatar: "https://i.pravatar.cc/150?u=aisha" },
  { id: 4, name: "Suresh Reddy", studentId: "S004", classYear: "10A", route: "Gudur Main", stop: "Hospital Jn", bus: "AP01AB1234", status: "No Fee Paid", parentName: "Ramesh Reddy", parentPhone: "+91-9000011111", boardingStatus: "Waitlist", avatar: "https://i.pravatar.cc/150?u=suresh" },
  { id: 5, name: "Anjali Verma", studentId: "S005", classYear: "12A", route: "Rural Area", stop: "Temple Street", bus: "AP01AB5678", status: "Allocated", parentName: "Prakash Verma", parentPhone: "+91-9222233333", boardingStatus: "Confirmed", avatar: "https://i.pravatar.cc/150?u=anjali" },
];

export default function StudentsPage() {
  const [user, setUser] = React.useState<{ name: string; email: string; role: string } | null>(null);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<(Student & { id: number }) | null>(null);

  const form = useForm<Student>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      parentPhone: "+91-",
      boardingStatus: "Confirmed",
    },
  });

  React.useEffect(() => {
    if (isModalOpen && editingStudent) {
      form.reset(editingStudent);
    } else if (!isModalOpen) {
      form.reset({
        name: "",
        studentId: `S${String(sampleStudents.length + 1).padStart(3, '0')}`,
        classYear: "",
        parentName: "",
        parentPhone: "+91-",
        route: "",
        stop: "",
        bus: "",
        boardingStatus: "Confirmed",
      });
      setEditingStudent(null);
    }
  }, [isModalOpen, editingStudent, form]);

  const onSubmit = (values: Student) => {
    console.log("Form submitted", values);
    // TODO: API call to add/edit student
    setIsModalOpen(false);
  };
  
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
    { name: "Bus Details", icon: Bus, href: "/bus-details" },
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
  
  const handleEditClick = (student: Student & { id: number }) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
        case "Allocated": return "bg-green-500 hover:bg-green-600";
        case "Pending": return "bg-yellow-500 hover:bg-yellow-600";
        case "No Fee Paid": return "bg-orange-500 hover:bg-orange-600";
        case "Absent Today": return "bg-gray-500 hover:bg-gray-600";
        default: return "bg-gray-400";
    }
  }

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
            <h1 className="text-lg font-semibold md:text-xl">Students</h1>
          </div>
          <div className="flex flex-1 items-center gap-4">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
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
              <h1 className="text-3xl font-bold">Student Transport Management</h1>
              <p className="text-muted-foreground">Manage student allocations and bus passes</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Import Excel
                </Button>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" onClick={() => setIsModalOpen(true)}>
                    <PlusCircle className="mr-2 h-5 w-5" /> Add Student
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                    <DialogTitle>{editingStudent ? `Edit ${editingStudent.name}` : "Add New Student"}</DialogTitle>
                    <DialogDescription>
                        {editingStudent
                        ? `Update details for student ID ${editingStudent.studentId}`
                        : "Fill in the details for the new student."}
                    </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Personal</h3>
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Priya Sharma" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                 <FormField control={form.control} name="studentId" render={({ field }) => (
                                    <FormItem><FormLabel>Student ID</FormLabel><FormControl><Input disabled {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="classYear" render={({ field }) => (
                                    <FormItem><FormLabel>Class/Year</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger></FormControl>
                                        <SelectContent><SelectItem value="10A">10A</SelectItem><SelectItem value="10B">10B</SelectItem><SelectItem value="11A">11A</SelectItem><SelectItem value="12B">12B</SelectItem></SelectContent>
                                    </Select>
                                    <FormMessage /></FormItem>
                                )} />
                                <FormItem>
                                    <FormLabel>Photo</FormLabel>
                                    <FormControl><Input type="file" /></FormControl>
                                </FormItem>
                            </div>
                             <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Contact</h3>
                                <FormField control={form.control} name="parentName" render={({ field }) => (
                                    <FormItem><FormLabel>Parent Name</FormLabel><FormControl><Input placeholder="Anita Sharma" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="parentPhone" render={({ field }) => (
                                    <FormItem><FormLabel>Parent Phone</FormLabel><FormControl><Input placeholder="+91-9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Transport Assignment</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                               <FormField control={form.control} name="route" render={({ field }) => (
                                    <FormItem><FormLabel>Route</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger></FormControl>
                                        <SelectContent><SelectItem value="Gudur Main">Gudur Main</SelectItem><SelectItem value="Rural Area">Rural Area</SelectItem><SelectItem value="City Center">City Center</SelectItem></SelectContent>
                                    </Select>
                                    <FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="stop" render={({ field }) => (
                                    <FormItem><FormLabel>Stop</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select stop" /></SelectTrigger></FormControl>
                                        <SelectContent><SelectItem value="Gandhi Circle">Gandhi Circle</SelectItem><SelectItem value="Village Center">Village Center</SelectItem></SelectContent>
                                    </Select>
                                    <FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="bus" render={({ field }) => (
                                    <FormItem><FormLabel>Bus (Auto)</FormLabel><FormControl><Input placeholder="AP01AB1234" disabled {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Student
                            </Button>
                        </div>
                    </form>
                    </Form>
                </DialogContent>
                </Dialog>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Students</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">450</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Allocated</CardTitle><UserCheck className="h-4 w-4 text-green-500" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">420</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle><UserX className="h-4 w-4 text-yellow-500" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">30</div></CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Route Capacity</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">94%</div></CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Student List</CardTitle>
                     <div className="flex items-center gap-2">
                        <Input placeholder="Search by Name, ID, Phone..." className="w-[250px]"/>
                         <Select>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by Route" /></SelectTrigger>
                            <SelectContent><SelectItem value="all">All Routes</SelectItem><SelectItem value="gudur-main">Gudur Main</SelectItem><SelectItem value="rural-area">Rural Area</SelectItem></SelectContent>
                        </Select>
                         <Select>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
                            <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="Allocated">Allocated</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="No Fee Paid">No Fee Paid</SelectItem></SelectContent>
                        </Select>
                     </div>
                </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"><Checkbox /></TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Route/Stop</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Parent Phone</TableHead>
                    <TableHead>QR Code</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell><Checkbox /></TableCell>
                      <TableCell className="font-medium flex items-center gap-3">
                          <Avatar className="h-8 w-8"><AvatarImage src={student.avatar} alt={student.name} /><AvatarFallback>{getInitials(student.name)}</AvatarFallback></Avatar>
                          {student.name}
                      </TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.classYear}</TableCell>
                      <TableCell>
                          <div>{student.route}</div>
                          <div className="text-xs text-muted-foreground">{student.stop}</div>
                      </TableCell>
                      <TableCell>{student.bus}</TableCell>
                      <TableCell>
                        <Badge variant="default" className={cn("text-white", getStatusBadge(student.status))}>
                          {student.status}
                        </Badge>
                      </TableCell>
                       <TableCell>{student.parentPhone}</TableCell>
                       <TableCell>
                           <Button variant="outline" size="sm">
                               <QrCode className="mr-2 h-4 w-4" /> Generate
                           </Button>
                       </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Profile</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditClick(student)}><FilePen className="mr-2 h-4 w-4" />Edit Student</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500"><Trash className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
             <div className="flex items-center justify-between p-4 border-t">
                 <div className="text-sm text-muted-foreground">
                    Showing <strong>1-5</strong> of <strong>{sampleStudents.length}</strong> students.
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled><ChevronsLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="text-sm font-medium">Page 1 of 1</span>
                     <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm"><ChevronsRight className="h-4 w-4" /></Button>
                </div>
            </div>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


    