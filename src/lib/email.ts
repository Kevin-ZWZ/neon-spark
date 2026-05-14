const RESEND_KEY = process.env.AUTH_RESEND_KEY;

// Resend requires a verified domain. If neonspark.dev isn't verified,
// use the default Resend sandbox domain for testing.
const FROM_ADDRESS = process.env.RESEND_FROM || "NEON SPARK <onboarding@resend.dev>";

export async function sendWaitlistConfirmation(email: string) {
  if (!RESEND_KEY || RESEND_KEY === "re_placeholder") {
    console.log(`📧 [DEV] Welcome email skipped for ${email} (no Resend key)`);
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_KEY);

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "You're on the NEON SPARK waitlist!",
      html: `
        <div style="background:#000;color:#fff;font-family:monospace;padding:40px 20px;text-align:center;">
          <h1 style="font-size:24px;background:linear-gradient(135deg,#00f0ff,#8b5cf6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
            NEON SPARK
          </h1>
          <p style="font-size:16px;margin:20px 0;color:#aaa;">You're on the list, creator.</p>
          <p style="font-size:14px;color:#666;max-width:400px;margin:0 auto;">
            We'll let you know when NEON SPARK's next evolution drops — 
            AI-powered palettes, cloud sync, and more.
          </p>
          <div style="margin-top:30px;padding-top:20px;border-top:1px solid #222;font-size:12px;color:#444;">
            NEON SPARK — cyberpunk palette generator
          </div>
        </div>
      `,
    });
    console.log(`✅ Welcome email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}:`, error);
  }
}
