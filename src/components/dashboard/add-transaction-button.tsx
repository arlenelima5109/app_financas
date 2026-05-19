"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { Plus } from "lucide-react";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Nova transação
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nova transação</DialogTitle>
          </DialogHeader>
          <TransactionForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
