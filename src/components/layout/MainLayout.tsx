import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { ChevronDown, ChevronRight, Home } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps = {}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Navigation structure with dropdown items
  const navigationItems = [
    {
      title: "Production Processes",
      path: "/production",
      items: [
        {
          title: "Quality Control Audit Queue",
          path: "/production/quality-control",
        },
        { title: "Hard Drive Management", path: "/production/hard-drive" },
        { title: "Scrap Inventory Management", path: "/production/scrap" },
        { title: "Tag Reprinter", path: "/production/tag-reprinter" },
      ],
    },
    {
      title: "Inventory Management",
      path: "/inventory",
      items: [
        { title: "Inventory Dashboard", path: "/inventory/dashboard" },
        { title: "Asset Inventory", path: "/inventory/asset" },
        { title: "Lot Tracked Parts Check-In", path: "/inventory/lot-tracked" },
        { title: "Part Inventory", path: "/inventory/part" },
        { title: "eBay Listings", path: "/inventory/ebay" },
        { title: "Scrap Inventory", path: "/inventory/scrap" },
        { title: "RMA Receiving", path: "/inventory/rma" },
        {
          title: "Scrap Inventory Reconciliation",
          path: "/inventory/scrap-reconciliation",
        },
        {
          title: "Warehouse Floor Reconciliation",
          path: "/inventory/floor-reconciliation",
        },
        {
          title: "Asset Pallet Reconciliation",
          path: "/inventory/pallet-reconciliation",
        },
        { title: "Create Pallet", path: "/inventory/create-pallet" },
      ],
    },
    {
      title: "Fulfillment",
      path: "/fulfillment",
      items: [
        { title: "Order Processing", path: "/fulfillment/orders" },
        { title: "Picking", path: "/fulfillment/picking" },
        { title: "Packing", path: "/fulfillment/packing" },
        { title: "Shipping Logistics", path: "/fulfillment/shipping" },
      ],
    },
    {
      title: "Warehouse Management",
      path: "/warehouse",
      items: [
        { title: "Pallet Builder", path: "/warehouse/pallet-builder" },
        { title: "Location Setup", path: "/warehouse/location-setup" },
        { title: "Pallet Building", path: "/warehouse/pallet-building" },
        {
          title: "Skid-Pallet-Asset to Location Scanning",
          path: "/warehouse/scanning",
        },
        { title: "Zone Management", path: "/warehouse/zone-management" },
      ],
    },
    {
      title: "Reports",
      path: "/reports",
      items: [
        { title: "Reports Dashboard", path: "/reports/dashboard" },
        { title: "Receiving Summary", path: "/reports/receiving" },
        { title: "Sort Summary", path: "/reports/sort" },
        { title: "Audit Summary", path: "/reports/audit" },
        { title: "Repair Summary", path: "/reports/repair" },
        { title: "Resale Inventory Report", path: "/reports/resale-inventory" },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">W</span>
              </div>
              <span className="font-bold text-xl">Warehouse ERP</span>
            </Link>
          </div>

          <NavigationMenu className="mx-6">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuTrigger className="h-10">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {item.items.map((subItem) => (
                        <li key={subItem.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={subItem.path}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ml-auto flex items-center space-x-4">
            {/* User profile or additional actions can go here */}
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="container py-2 border-b">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>

            {pathSegments.map((segment, index) => {
              const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;

              // Find the navigation item that matches this segment
              const navItem = navigationItems.find(
                (item) =>
                  item.path.startsWith(`/${pathSegments[0]}`) &&
                  (index === 0 ||
                    item.items.some((subItem) => subItem.path === path))
              );

              // Get the title from navigation items if possible
              let title =
                segment.charAt(0).toUpperCase() +
                segment.slice(1).replace(/-/g, " ");
              if (index === 0 && navItem) {
                title = navItem.title;
              } else if (index > 0 && navItem) {
                const subItem = navItem.items.find(
                  (item) => item.path === path
                );
                if (subItem) title = subItem.title;
              }

              return (
                <li key={path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                  {isLast ? (
                    <span className="text-sm font-medium text-foreground">
                      {title}
                    </span>
                  ) : (
                    <Link
                      to={path}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 container py-6">{children || <Outlet />}</main>

      {/* Footer */}
      <footer className="border-t py-4 bg-background">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Warehouse ERP System
          </p>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
