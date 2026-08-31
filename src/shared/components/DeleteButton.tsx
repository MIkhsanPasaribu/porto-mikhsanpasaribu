"use client";

interface DeleteButtonProps {
  action: () => Promise<void>;
  confirmMessage?: string;
}

export function DeleteButton({
  action,
  confirmMessage = "Hapus entri ini?",
}: DeleteButtonProps) {
  return (
    <form
      action={async () => {
        if (!confirm(confirmMessage)) return;
        await action();
      }}
    >
      <button
        type="submit"
        className="text-xs px-2.5 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
      >
        Hapus
      </button>
    </form>
  );
}
