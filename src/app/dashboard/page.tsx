"use client";

import { Plus, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockHackers } from "@/config/data";
import { DataTable } from "@/components/data-table/data-table";
import { useColumns } from "@/components/data-table/colums";
import { RegisterHackerDialog } from "@/components/register-hacker/register-hacker-dialog";
import { RegisterTeamDialog } from "@/components/register-team-dialog/register-team-dialog";
import { UploadExcelDialog } from "@/components/upload-excel-dialog/upload-excel-dialog";

export default function DashboardPage() {
  const columns = useColumns();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex font-geistSans">
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
        </div>
      </div>

      <DataTable columns={columns} data={mockHackers} />
    </div>
  );
}
