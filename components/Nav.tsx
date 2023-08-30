"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null); // Adjust the type here
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image src={"/assets/icons/logo.png"} alt="Rhythm Logo" width={37} height={37} className="object-contain" />
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-rhythm" className="black_btn">
              Create Rhythm
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut({ callbackUrl: "http://localhost:3000/" });
              }}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href={`/profile/${(session?.user as User)?.id}`}>
              <Image
                src={session?.user?.image || "/assets/icons/logo.png"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* {alert(session?.user?.image)} */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image || "/assets/icons/logo.png"}
              alt="Promptopia Logo"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  Create Rhythm
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown((prev) => !prev);

                    signOut({ callbackUrl: "http://localhost:3000/" });
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
