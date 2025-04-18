import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Package,
  Truck,
  Warehouse,
  FileText,
  ChevronDown,
  Bell,
  Settings,
  User,
  Home as HomeIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Warehouse className="h-6 w-6" />
              <span className="font-bold">Warehouse ERP</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 flex items-center space-x-1 md:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-3"
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  <span>Production Processes</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Link to="/production/quality-control" className="w-full">
                    Quality Control Audit Queue
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/production/hard-drive" className="w-full">
                    Hard Drive Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/production/scrap" className="w-full">
                    Scrap Inventory Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/production/tag-reprinter" className="w-full">
                    Tag Reprinter
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-3"
                >
                  <Package className="h-4 w-4 mr-1" />
                  <span>Inventory Management</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Link to="/inventory/dashboard" className="w-full">
                    Inventory Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/asset" className="w-full">
                    Asset Inventory
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/lot-tracked" className="w-full">
                    Lot Tracked Parts Check-In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/parts" className="w-full">
                    Part Inventory
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/scrap" className="w-full">
                    Scrap Inventory
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/rma" className="w-full">
                    RMA Receiving
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/reconciliation/scrap" className="w-full">
                    Scrap Inventory Reconciliation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/inventory/reconciliation/warehouse"
                    className="w-full"
                  >
                    Warehouse Floor Reconciliation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/reconciliation/asset" className="w-full">
                    Asset Pallet Reconciliation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/inventory/pallet/create" className="w-full">
                    Create Pallet
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-3"
                >
                  <Truck className="h-4 w-4 mr-1" />
                  <span>Fulfillment</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Link to="/fulfillment/orders" className="w-full">
                    Order Processing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/fulfillment/picking" className="w-full">
                    Picking
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/fulfillment/packing" className="w-full">
                    Packing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/fulfillment/shipping" className="w-full">
                    Shipping Logistics
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-3"
                >
                  <Warehouse className="h-4 w-4 mr-1" />
                  <span>Warehouse Management</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Link to="/warehouse/pallet-builder" className="w-full">
                    Pallet Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/warehouse/location-setup" className="w-full">
                    Location Setup
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/warehouse/pallet-building" className="w-full">
                    Pallet Building
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/warehouse/scanning" className="w-full">
                    Skid-Pallet-Asset to Location Scanning
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/warehouse/zone-management" className="w-full">
                    Zone Management
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-3"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  <span>Reports</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Link to="/reports/dashboard" className="w-full">
                    Reports Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/reports/receiving" className="w-full">
                    Receiving Summary
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/reports/sort" className="w-full">
                    Sort Summary
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/reports/audit" className="w-full">
                    Audit Summary
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/reports/repair" className="w-full">
                    Repair Summary
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/reports/resale" className="w-full">
                    Resale Inventory Report
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=warehouse"
                      alt="User"
                    />
                    <AvatarFallback>WH</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container py-2 flex items-center text-sm text-muted-foreground">
        <Link to="/" className="flex items-center hover:text-foreground">
          <HomeIcon className="h-3 w-3 mr-1" />
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Dashboard</span>
      </div>

      {/* Main Content */}
      <main className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">Export</Button>
            <Button>Refresh Data</Button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
              <Progress className="h-1 mt-2" value={75} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                6 require immediate attention
              </p>
              <Progress className="h-1 mt-2" value={45} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Production Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                On track for weekly target
              </p>
              <Progress className="h-1 mt-2" value={87} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Warehouse Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">63%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
              <Progress className="h-1 mt-2" value={63} />
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest warehouse operations and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New shipment received</p>
                    <p className="text-xs text-muted-foreground">
                      Order #45892 - 120 items processed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      30 minutes ago
                    </p>
                  </div>
                  <Badge>Receiving</Badge>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-green-100 text-green-600">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Order shipped</p>
                    <p className="text-xs text-muted-foreground">
                      Order #45887 - Shipped via FedEx
                    </p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <Badge variant="outline">Fulfillment</Badge>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-amber-100 text-amber-600">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      Quality control completed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Batch #A789 - 98% pass rate
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge>Production</Badge>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-red-100 text-red-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      Inventory reconciliation alert
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Zone B - 3 items require attention
                    </p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                  <Badge variant="destructive">Alert</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common warehouse operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Scan New Item
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Process Order
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Warehouse className="mr-2 h-4 w-4" />
                Location Transfer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Quality Control Check
              </Button>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Actions
              </Button>
            </CardFooter>
          </Card>

          {/* Inventory Status */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>
                Current inventory levels by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Electronics</span>
                    <span className="text-sm text-muted-foreground">
                      4,532 items
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Computer Parts</span>
                    <span className="text-sm text-muted-foreground">
                      2,845 items
                    </span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Peripherals</span>
                    <span className="text-sm text-muted-foreground">
                      1,298 items
                    </span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Storage Devices</span>
                    <span className="text-sm text-muted-foreground">
                      3,868 items
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View Detailed Inventory
              </Button>
            </CardFooter>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-sm">Quality control audit (5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Orders to process (8)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Inventory reconciliation (2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">RMA processing (3)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
