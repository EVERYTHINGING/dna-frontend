import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Sticky from "react-sticky-el";

const dummyCategories = [
  "Best Sellers",
  "Latest",
  "Seasonal",
  "Luxury",
  "On Sale",
  "Coming Soon",
];

export const Header = () => {
  const { pathname } = useRouter();

  return (
    <header>
      <div className="top-header">
        <Link href="/">
          <a className={pathname === "/" ? "is-active" : ""}>Home</a>
        </Link>
        <div className="logo">
          <Link href="/">
            <a className={pathname === "/" ? "is-active" : ""}>LOGO</a>
          </Link>
        </div>
        <Link href="/client-only">
          <a className={pathname === "/client-only" ? "is-active" : ""}>
            Client-Only
          </a>
        </Link>
        <style jsx>{`
          .top-header {
            padding: 30px 0px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .logo {
            padding: 15px 30px;
            background: grey;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          header {
            margin-bottom: 25px;
          }
          a {
            font-size: 14px;
            text-decoration: none;
          }
          .is-active {
            text-decoration: underline;
          }
        `}</style>
      </div>
      <Sticky>
        <div className="bottom-header">
          {dummyCategories.map((category) => (
            <Link href="/">
              <a className={pathname === "/" ? "is-active" : ""}>{category}</a>
            </Link>
          ))}
          <style jsx>{`
            .bottom-header {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              padding: 30px 0px;
              background: black;
            }
            header {
              margin-bottom: 25px;
            }
            a {
              font-size: 14px;
              margin-right: 15px;
              text-decoration: none;
            }
            .is-active {
              text-decoration: underline;
            }
          `}</style>
        </div>
      </Sticky>
    </header>
  );
};
