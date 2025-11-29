import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";

export function AppNavbar() {
  const { token, logout } = useAuth();

  return (
    <NavigationMenu className="w-full bg-white shadow-sm">
      <NavigationMenuList className="flex w-full items-center">

        {/* LEFT SIDE LINKS */}
        <div className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className="px-4 py-2 rounded-md hover:bg-gray-100" to="/">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {!token && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="px-4 py-2 rounded-md hover:bg-gray-100"
                    to="/register"
                  >
                    Register
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="px-4 py-2 rounded-md hover:bg-gray-100"
                    to="/login"
                  >
                    Login
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </div>

        {/* RIGHT SIDE (Logout) */}
        {token && (
          <>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className="px-4 py-2 rounded-md hover:bg-gray-100" to="/dashboard">
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
            <NavigationMenuItem>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </NavigationMenuItem>
            </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
