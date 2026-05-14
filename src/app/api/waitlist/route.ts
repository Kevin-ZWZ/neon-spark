import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { waitlist } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const db = getDb();

    // Check if already subscribed
    const existing = await db.select().from(waitlist).where(eq(waitlist.email, email));
    if (existing.length > 0) {
      return NextResponse.json({ message: "Already on the waitlist!" }, { status: 200 });
    }

    await db.insert(waitlist).values({ email });

    return NextResponse.json({ message: "Successfully joined the waitlist!" }, { status: 201 });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
