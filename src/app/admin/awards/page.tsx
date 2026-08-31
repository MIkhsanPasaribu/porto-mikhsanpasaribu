import { db } from "@/db";
import { awards } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function toggleVisibility(id: string, isVisible: boolean) {
  "use server";
  await db
    .update(awards)
    .set({ isVisible: !isVisible })
    .where(eq(awards.id, id));
  revalidatePath("/admin/awards");
  revalidatePath("/");
}

async function deleteAward(id: string) {
  "use server";
  await db.delete(awards).where(eq(awards.id, id));
  revalidatePath("/admin/awards");
  revalidatePath("/");
}

export default async function HalamanPenghargaan() {
  const data = await db.query.awards.findMany({
    orderBy: asc(awards.order),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Penghargaan</h1>
          <p className="text-neutral-500 text-sm mt-1">{data.length} entri</p>
        </div>
        <Link
          href="/admin/awards/new"
          className="px-4 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          + Tambah
        </Link>
      </div>

      <div className="space-y-2">
        {data.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
              item.isVisible
                ? "bg-surface border-neutral-300/30"
                : "bg-surface-variant border-neutral-300/20 opacity-60"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-on-surface text-sm truncate">
                {item.title}
              </p>
              <p className="text-neutral-500 text-xs">
                {item.issuer ?? "—"} · {item.date ?? "—"}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <form
                action={toggleVisibility.bind(null, item.id, item.isVisible)}
              >
                <button
                  type="submit"
                  className="text-xs px-2.5 py-1 rounded-md border border-neutral-300/50 text-neutral-600 hover:bg-surface-variant transition-colors"
                >
                  {item.isVisible ? "Sembunyikan" : "Tampilkan"}
                </button>
              </form>
              <Link
                href={`/admin/awards/${item.id}/edit`}
                className="text-xs px-2.5 py-1 rounded-md border border-neutral-300/50 text-neutral-600 hover:bg-surface-variant transition-colors"
              >
                Edit
              </Link>
              <form action={deleteAward.bind(null, item.id)}>
                <button
                  type="submit"
                  className="text-xs px-2.5 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  onClick={(e) => {
                    if (!confirm("Hapus penghargaan ini?")) e.preventDefault();
                  }}
                >
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
