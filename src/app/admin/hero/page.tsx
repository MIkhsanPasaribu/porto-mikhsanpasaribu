import { db } from "@/db";
import { heroInfo } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateHero(formData: FormData) {
  "use server";
  const existing = await db.query.heroInfo.findFirst();
  if (!existing) return;

  await db
    .update(heroInfo)
    .set({
      name: formData.get("name") as string,
      title: formData.get("title") as string,
      tagline: formData.get("tagline") as string,
      bio: formData.get("bio") as string,
      location: formData.get("location") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      linkedinUrl: (formData.get("linkedinUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      websiteUrl: (formData.get("websiteUrl") as string) || null,
      cvUrl: (formData.get("cvUrl") as string) || null,
      avatarPath:
        (formData.get("avatarPath") as string) || "/images/ikhsan.jpg",
    })
    .where(eq(heroInfo.id, existing.id));

  revalidatePath("/");
  redirect("/admin");
}

export default async function HalamanHero() {
  const data = await db.query.heroInfo.findFirst();

  if (!data) {
    return (
      <div className="text-neutral-500 text-sm">
        Data hero belum ada. Jalankan seed terlebih dahulu.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-on-surface">Hero Info</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Edit informasi utama halaman portfolio.
        </p>
      </div>

      <form action={updateHero} className="space-y-4 max-w-2xl">
        {[
          { label: "Nama", name: "name", defaultValue: data.name },
          { label: "Jabatan / Title", name: "title", defaultValue: data.title },
          { label: "Tagline", name: "tagline", defaultValue: data.tagline },
          { label: "Lokasi", name: "location", defaultValue: data.location },
          { label: "Email", name: "email", defaultValue: data.email, type: "email" },
          { label: "Telepon", name: "phone", defaultValue: data.phone ?? "" },
          { label: "LinkedIn URL", name: "linkedinUrl", defaultValue: data.linkedinUrl ?? "" },
          { label: "GitHub URL", name: "githubUrl", defaultValue: data.githubUrl ?? "" },
          { label: "Website URL", name: "websiteUrl", defaultValue: data.websiteUrl ?? "" },
          { label: "CV URL", name: "cvUrl", defaultValue: data.cvUrl ?? "" },
          { label: "Avatar Path", name: "avatarPath", defaultValue: data.avatarPath ?? "/images/ikhsan.jpg" },
        ].map(({ label, name, defaultValue, type }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-on-surface mb-1.5"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type ?? "text"}
              defaultValue={defaultValue}
              className="w-full px-3 py-2 rounded-md border border-neutral-300/50 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-on-surface mb-1.5"
          >
            Bio (About)
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            defaultValue={data.bio}
            className="w-full px-3 py-2 rounded-md border border-neutral-300/50 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Simpan
          </button>
          <a
            href="/admin"
            className="px-5 py-2 rounded-md border border-neutral-300/50 text-neutral-600 text-sm font-medium hover:bg-surface-variant transition-colors"
          >
            Batal
          </a>
        </div>
      </form>
    </div>
  );
}
