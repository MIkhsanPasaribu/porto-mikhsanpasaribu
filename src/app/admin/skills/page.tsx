import { db } from "@/db";
import { skillCategories, skills } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { DeleteButton } from "@/shared/components/DeleteButton";

async function toggleCategoryVisibility(id: string, isVisible: boolean) {
  "use server";
  await db
    .update(skillCategories)
    .set({ isVisible: !isVisible })
    .where(eq(skillCategories.id, id));
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

async function deleteCategory(id: string) {
  "use server";
  await db.delete(skillCategories).where(eq(skillCategories.id, id));
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export default async function HalamanKeahlian() {
  const cats = await db.query.skillCategories.findMany({
    orderBy: asc(skillCategories.order),
  });
  const allSkills = await db.query.skills.findMany({
    orderBy: asc(skills.order),
  });

  const catsWithSkills = cats.map((c) => ({
    ...c,
    skills: allSkills.filter((s) => s.categoryId === c.id),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Keahlian</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {cats.length} kategori · {allSkills.length} keahlian
          </p>
        </div>
        <Link
          href="/admin/skills/new"
          className="px-4 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          + Tambah Kategori
        </Link>
      </div>

      <div className="space-y-4">
        {catsWithSkills.map((cat) => (
          <div
            key={cat.id}
            className={`p-4 rounded-lg border transition-colors ${
              cat.isVisible
                ? "bg-surface border-neutral-300/30"
                : "bg-surface-variant border-neutral-300/20 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="font-semibold text-on-surface text-sm">{cat.name}</p>
              <div className="flex items-center gap-2 shrink-0">
                <form
                  action={toggleCategoryVisibility.bind(
                    null,
                    cat.id,
                    cat.isVisible
                  )}
                >
                  <button
                    type="submit"
                    className="text-xs px-2.5 py-1 rounded-md border border-neutral-300/50 text-neutral-600 hover:bg-surface-variant transition-colors"
                  >
                    {cat.isVisible ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </form>
                <DeleteButton
                  action={deleteCategory.bind(null, cat.id)}
                  confirmMessage="Hapus kategori ini beserta seluruh keahliannya?"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`px-2 py-0.5 rounded-md text-xs border ${
                    skill.isVisible
                      ? "bg-surface-variant border-neutral-300/30 text-neutral-700"
                      : "border-neutral-200 text-neutral-400 line-through"
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
