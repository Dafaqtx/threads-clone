"use client";
import { sidebarLinks } from "@/constants";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;

          const text = label.split(/\s+/)[0];

          return (
            <Link
              href={route}
              key={label}
              className={clsx("bottombar_link", {
                "bg-primary-500": isActive,
              })}
            >
              <Image
                src={imgURL}
                alt={label}
                width={16}
                height={16}
                className="object-contain"
              />

              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {text}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
