import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminSecret = process.env.ADMIN_SECRET || "hairarena2026";

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    if (password !== adminSecret) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    // Generate secure session token signed with secret and date
    const token = crypto
      .createHmac("sha256", adminSecret)
      .update(`hairarena-admin-${new Date().toISOString().slice(0, 10)}`)
      .digest("hex");

    const res = NextResponse.json({ success: true, token });
    res.cookies.set("hairarena_admin_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET || "hairarena2026";
  const cookieToken = req.cookies.get("hairarena_admin_auth")?.value;

  const validToken = crypto
    .createHmac("sha256", adminSecret)
    .update(`hairarena-admin-${new Date().toISOString().slice(0, 10)}`)
    .digest("hex");

  if (cookieToken && cookieToken === validToken) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("hairarena_admin_auth");
  return res;
}
