"use client";

import { useEffect, useState } from "react";

import { LogOut, Plus, Upload, Users } from "lucide-react";
import Link from "next/link";

import { useColumns } from "@/components/data-table/colums";
import { DataTable } from "@/components/data-table/data-table";
import { RegisterHackerDialog } from "@/components/register-hacker/register-hacker-dialog";
import { RegisterTeamDialog } from "@/components/register-team-dialog/register-team-dialog";
import { ModeToggle } from "@/components/theme/Toggle";
import { Button } from "@/components/ui/button";
import { UploadExcelDialog } from "@/components/upload-excel-dialog/upload-excel-dialog";
import { listenToHackers } from "@/firebase/hackerOps";
import { Hacker } from "@/types";

export default function DashboardPage() {
  const [hackers, setHackers] = useState<Hacker[]>([]);
  const columns = useColumns();
  useEffect(() => {
    const unsubscribe = listenToHackers((updatedHackers) =>
      setHackers(updatedHackers),
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex font-jakarta">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hackers</h2>
          <p className="text-muted-foreground">
            Manage registered hackers and teams
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <RegisterHackerDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Register Hacker
            </Button>
          </RegisterHackerDialog>
          <RegisterTeamDialog>
            <Button variant="secondary">
              <Users className="mr-2 h-4 w-4" />
              Register Team
            </Button>
          </RegisterTeamDialog>
          <UploadExcelDialog>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Excel
            </Button>
          </UploadExcelDialog>
          <ModeToggle />
          <Link href="/logout">
            <Button variant="outline">
              <LogOut className=" h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <DataTable columns={columns} data={hackers} />
    </div>
  );
}
