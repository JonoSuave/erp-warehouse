import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  Package,
  Truck,
  Warehouse,
  BarChart2,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  footer?: React.ReactNode;
}

const MetricCard = (
  { title, value, description, icon, trend, footer }: MetricCardProps = {
    title: "Metric",
    value: "0",
    description: "Description",
    icon: <BarChart2 className="h-4 w-4" />,
  },
) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-2xl font-bold">
            {value}
          </CardDescription>
        </div>
        <div className="rounded-full bg-muted p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <span
              className={`text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <ArrowUpRight
              className={`h-3 w-3 ${trend.isPositive ? "text-green-500" : "text-red-500"} ${!trend.isPositive ? "rotate-180" : ""}`}
            />
            <span className="text-xs text-muted-foreground">
              vs last period
            </span>
          </div>
        )}
      </CardContent>
      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
    </Card>
  );
};

interface StatusCardProps {
  title: string;
  items: {
    id: string;
    name: string;
    status: "pending" | "in-progress" | "completed" | "error";
    value?: number;
  }[];
  actionLabel?: string;
  onAction?: () => void;
}

const StatusCard = (
  { title, items, actionLabel, onAction }: StatusCardProps = {
    title: "Status",
    items: [
      { id: "1", name: "Item 1", status: "pending" },
      { id: "2", name: "Item 2", status: "in-progress" },
      { id: "3", name: "Item 3", status: "completed" },
    ],
    actionLabel: "View All",
  },
) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "in-progress":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "error":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Error
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(item.status)}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value !== undefined && (
                <span className="text-sm font-medium">{item.value}%</span>
              )}
              {getStatusBadge(item.status)}
            </div>
          </div>
        ))}
      </CardContent>
      {actionLabel && (
        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            className="w-full"
          >
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

interface ActivityItemProps {
  timestamp: string;
  description: string;
  user?: string;
  icon?: React.ReactNode;
}

const ActivityItem = (
  { timestamp, description, user, icon }: ActivityItemProps = {
    timestamp: "10:30 AM",
    description: "Activity description",
    user: "User Name",
  },
) => {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="rounded-full bg-muted p-2 mt-1">
        {icon || <Clock className="h-3 w-3" />}
      </div>
      <div className="space-y-1">
        <p className="text-sm">{description}</p>
        <div className="flex items-center gap-2">
          {user && <span className="text-xs font-medium">{user}</span>}
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  // Mock data for inventory levels
  const inventoryItems = [
    { id: "1", name: "Hard Drives", status: "completed" as const, value: 92 },
    {
      id: "2",
      name: "Memory Modules",
      status: "in-progress" as const,
      value: 68,
    },
    { id: "3", name: "Processors", status: "pending" as const, value: 45 },
    { id: "4", name: "Motherboards", status: "error" as const, value: 23 },
  ];

  // Mock data for production processes
  const productionItems = [
    {
      id: "1",
      name: "Quality Control Audit",
      status: "in-progress" as const,
      value: 75,
    },
    {
      id: "2",
      name: "Hard Drive Management",
      status: "completed" as const,
      value: 100,
    },
    {
      id: "3",
      name: "Scrap Processing",
      status: "pending" as const,
      value: 30,
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      timestamp: "10:30 AM",
      description: "Pallet #A12345 moved to Zone B",
      user: "John Smith",
      icon: <Warehouse className="h-3 w-3" />,
    },
    {
      timestamp: "09:45 AM",
      description: "Order #ORD-5678 prepared for shipping",
      user: "Sarah Johnson",
      icon: <Package className="h-3 w-3" />,
    },
    {
      timestamp: "09:15 AM",
      description: "Inventory reconciliation completed for Zone C",
      user: "Mike Davis",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    {
      timestamp: "Yesterday",
      description: "Shipment #SHP-9012 delivered to customer",
      user: "Emily Wilson",
      icon: <Truck className="h-3 w-3" />,
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">Refresh</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Inventory"
          value="12,458"
          description="Items in stock"
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Pending Orders"
          value="64"
          description="Awaiting fulfillment"
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 8, isPositive: false }}
        />
        <MetricCard
          title="Shipping Today"
          value="18"
          description="Orders to be shipped"
          icon={<Truck className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="QC Audit Queue"
          value="37"
          description="Items awaiting audit"
          icon={<AlertCircle className="h-4 w-4" />}
          trend={{ value: 15, isPositive: false }}
        />
      </div>

      {/* Status Cards and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="inventory">Inventory Levels</TabsTrigger>
              <TabsTrigger value="production">Production Status</TabsTrigger>
            </TabsList>
            <TabsContent value="inventory" className="mt-4">
              <StatusCard
                title="Inventory Levels"
                items={inventoryItems}
                actionLabel="View Inventory Dashboard"
              />
            </TabsContent>
            <TabsContent value="production" className="mt-4">
              <StatusCard
                title="Production Processes"
                items={productionItems}
                actionLabel="View Production Dashboard"
              />
            </TabsContent>
          </Tabs>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Pending Orders</CardTitle>
              <CardDescription>Orders awaiting fulfillment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Order #ORD-1234</span>
                  <Badge>High Priority</Badge>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Picking: Complete</span>
                  <span>Packing: In Progress</span>
                  <span>Shipping: Pending</span>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm font-medium">Order #ORD-5678</span>
                  <Badge variant="outline">Standard</Badge>
                </div>
                <Progress value={25} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Picking: In Progress</span>
                  <span>Packing: Pending</span>
                  <span>Shipping: Pending</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Orders
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest warehouse operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  timestamp={activity.timestamp}
                  description={activity.description}
                  user={activity.user}
                  icon={activity.icon}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Warehouse Overview */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Warehouse Zones Overview</CardTitle>
          <CardDescription>Current capacity and utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Zone A</span>
                <span className="text-sm text-muted-foreground">85% Full</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Zone B</span>
                <span className="text-sm text-muted-foreground">62% Full</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Zone C</span>
                <span className="text-sm text-muted-foreground">45% Full</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Zone D</span>
                <span className="text-sm text-muted-foreground">93% Full</span>
              </div>
              <Progress value={93} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            View Zone Management
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardOverview;
