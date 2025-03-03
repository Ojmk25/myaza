import Header from "@/components/Header";
import Calendar from "@/components/calendarParts/Calendar";

export default function Home() {
  return (
    <div className="md:h-screen md:overflow-hidden bg-white">
      <div className="bg-white pt-5 sticky top-0 z-40">
        <Header />
      </div>
      <Calendar />
    </div>
  );
}
