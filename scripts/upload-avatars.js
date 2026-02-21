import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const facilitators = [
  {
    id: "5076592c-2278-4bab-9b3b-fa8dc0c34ee4",
    name: "benjamin-lattanzi",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-21%20at%2014.41.28-56Mx5w3XOGsif7MpMx4TT9RaWHYUi7.jpeg",
  },
  {
    id: "c8399f9a-39ce-4c52-b4aa-60f039ed9c16",
    name: "enrico-oddone",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-21%20at%2014.39.12-CMXjdgplZ1LdQTCzGRoBnYJwFC0fV7.jpeg",
  },
];

async function uploadAndUpdate() {
  for (const f of facilitators) {
    const fileName = `${f.name}.jpg`;
    console.log(`[v0] Downloading image for ${f.name}...`);

    const response = await fetch(f.imageUrl);
    if (!response.ok) {
      console.error(`[v0] Failed to fetch image for ${f.name}: ${response.status}`);
      continue;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`[v0] Uploading ${fileName} to Supabase Storage...`);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error(`[v0] Upload error for ${f.name}:`, uploadError.message);
      continue;
    }

    console.log(`[v0] Uploaded:`, uploadData.path);

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;
    console.log(`[v0] Public URL for ${f.name}: ${publicUrl}`);

    const { error: updateError } = await supabase
      .from("facilitators")
      .update({ avatar_url: publicUrl })
      .eq("id", f.id);

    if (updateError) {
      console.error(`[v0] DB update error for ${f.name}:`, updateError.message);
    } else {
      console.log(`[v0] Updated avatar_url for ${f.name} in DB`);
    }
  }

  console.log("[v0] Done!");
}

uploadAndUpdate().catch(console.error);
