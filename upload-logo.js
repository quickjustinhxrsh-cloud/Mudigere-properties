const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Load .env file manually
const envPath = path.join(__dirname, ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase credentials in .env");
  console.error("URL:", supabaseUrl);
  console.error("Key:", supabaseAnonKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const bucket = "property-media";
const logoPath = "C:\\Users\\user\\Downloads\\Frontlogo.png";

async function uploadLogo() {
  try {
    console.log("📤 Reading logo file...");
    if (!fs.existsSync(logoPath)) {
      throw new Error(`File not found: ${logoPath}`);
    }

    const fileBuffer = fs.readFileSync(logoPath);
    const fileName = path.basename(logoPath);
    const extension = fileName.split(".").pop();
    const safeName = fileName
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    const storagePath = `${new Date().getFullYear()}/logo-${safeName}.${extension}`;

    console.log(`📁 Uploading to Supabase: ${storagePath}`);
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png"
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;
    console.log(`✅ Logo uploaded: ${publicUrl}`);

    // Update settings table
    console.log("📝 Updating settings in database...");
    const { error: updateError, data: updateData } = await supabase
      .from("settings")
      .upsert({ id: 1, logo_image: publicUrl }, { onConflict: "id" })
      .select();

    if (updateError) {
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    console.log("✅ Settings updated successfully!");
    console.log("🎉 Logo is now live on your website!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

uploadLogo();
