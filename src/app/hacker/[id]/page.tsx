import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockHackers } from "@/config/data";

export default function HackerPage({ params }: { params: { id: string } }) {
  const hacker = mockHackers.find((h) => h.id === params.id);

  if (!hacker) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Hacker Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Name</div>
              <div className="col-span-3">{hacker.name}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Email</div>
              <div className="col-span-3">{hacker.email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Team Name</div>
              <div className="col-span-3">{hacker.teamName}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Ticket Link</div>
              <div className="col-span-3">{hacker.ticketLink}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Registered By</div>
              <div className="col-span-3">{hacker.registeredBy}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Registration Date</div>
              <div className="col-span-3">
                {new Date(hacker.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
