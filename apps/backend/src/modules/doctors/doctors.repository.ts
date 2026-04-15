import { Doctor } from "@shared/index";

const doctors: Doctor[] = [
  { id: "doc-1", name: "Dr. Ada Anizoba" },
  { id: "doc-2", name: "Dr. Jane Obi" },
  { id: "doc-3", name: "Dr. Chris Okon" },
  { id: "doc-4", name: "Dr. Victory Emeka" },
  { id: "doc-5", name: "Dr. Ahmed Bello" },
  { id: "doc-6", name: "Dr. Adeola Adeniji" },

];

export class DoctorRepository {
  findById(id: string): Doctor | undefined {
    return doctors.find((doc) => doc.id === id);
  }
}