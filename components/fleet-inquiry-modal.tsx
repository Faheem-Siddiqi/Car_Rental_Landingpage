"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Car, MapPin, Users, X } from "lucide-react";

type Vehicle = {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  passengers: number;
  image: string;
};

export function FleetInquiryModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [pickupDate, setPickupDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (field: string) => String(data.get(field) || "Not provided");
    const message = [
      "Hello Moveit Cars!",
      "",
      "*CAR RENTAL INQUIRY*",
      "",
      "*Vehicle*",
      `• ${vehicle.name} (${vehicle.category})`,
      `• From Rs. ${vehicle.pricePerDay.toLocaleString("en-PK")}/day`,
      `• Capacity: ${vehicle.passengers} passengers`,
      "",
      "*Trip*",
      `• Dates: ${value("pickupDate")} to ${value("returnDate")}`,
      `• Pickup: ${value("pickupLocation")}`,
      `• Destination: ${value("destination")}`,
      `• Rental: ${value("rentalType")}`,
      `• Driver: ${value("driver")}`,
      `• Passengers: ${value("passengers")}`,
      "",
      "*Contact*",
      `• ${value("name")}`,
      `• ${value("phone")}`,
      ...(value("notes") === "Not provided" ? [] : ["", `*Notes:* ${value("notes")}`]),
      "",
      "Please confirm availability and share the final quote. Thank you!",
    ].join("\n");
    window.open(`https://wa.me/923075011252?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const fieldClass = "mt-2 min-h-12 w-full min-w-0 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base outline-none transition focus:border-black focus:bg-white sm:text-sm";
  const labelClass = "text-xs text-neutral-500";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="inquiry-title" className="relative max-h-[calc(100dvh-1rem)] w-full max-w-[780px] overscroll-contain overflow-y-auto rounded-[22px] bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[28px] lg:max-h-[88dvh]">
        <button type="button" onClick={onClose} aria-label="Close inquiry" className="sticky right-3 top-3 z-20 float-right -mb-10 mr-3 mt-3 grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-black shadow-lg transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:right-5 sm:top-5"><X className="h-5 w-5" /></button>
        <div className="grid md:grid-cols-[.68fr_1.32fr]">
          <aside className="relative min-h-48 overflow-hidden bg-black text-white sm:min-h-60 md:min-h-full">
            <img src={vehicle.image} alt={vehicle.name} className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="relative flex min-h-48 h-full flex-col justify-end p-5 sm:min-h-60 sm:p-7 md:min-h-full">
              <span className="text-xs uppercase tracking-[.18em] text-neutral-300">{vehicle.category}</span>
              <h2 id="inquiry-title" className="mt-2 text-3xl tracking-tight">{vehicle.name}</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-300">{vehicle.description}</p>
              <div className="mt-6 flex gap-6 border-t border-white/20 pt-5 text-sm">
                <span><b className="block text-xl">Rs. {vehicle.pricePerDay.toLocaleString("en-PK")}</b><small className="text-neutral-400">starting per day</small></span>
                <span><b className="flex items-center gap-2 text-xl"><Users className="h-4 w-4" />{vehicle.passengers}</b><small className="text-neutral-400">passengers</small></span>
              </div>
            </div>
          </aside>

          <div className="relative p-5 sm:p-6 lg:p-7">
            <div className="pr-12">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[.16em] text-neutral-500"><Car className="h-4 w-4" />Rental inquiry</span>
              <h3 className="mt-3 text-2xl tracking-tight">Tell us about your trip.</h3>
              <p className="mt-2 text-sm text-neutral-500">Required fields are marked with an asterisk.</p>
            </div>

            <form onSubmit={submit} className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5">
              <label className={labelClass}>Pickup date *<span className="relative block"><CalendarDays className="pointer-events-none absolute left-4 top-5 h-4 w-4 text-neutral-400" /><input name="pickupDate" type="date" min={today} required value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={`${fieldClass} pl-11`} /></span></label>
              <label className={labelClass}>Return date *<span className="relative block"><CalendarDays className="pointer-events-none absolute left-4 top-5 h-4 w-4 text-neutral-400" /><input name="returnDate" type="date" min={pickupDate || today} required className={`${fieldClass} pl-11`} /></span></label>
              <label className={`${labelClass} sm:col-span-2`}>Pickup location *<span className="relative block"><MapPin className="pointer-events-none absolute left-4 top-5 h-4 w-4 text-neutral-400" /><input name="pickupLocation" required placeholder="e.g. G-8 Markaz, Islamabad" className={`${fieldClass} pl-11`} /></span></label>
              <label className={labelClass}>Destination<input name="destination" placeholder="Where are you going?" className={fieldClass} /></label>
              <label className={labelClass}>Number of passengers *<input name="passengers" type="number" min="1" max={vehicle.passengers} defaultValue="1" required className={fieldClass} /></label>
              <label className={labelClass}>Rental type *<select name="rentalType" required defaultValue="" className={fieldClass}><option value="" disabled>Select rental type</option><option>Local / within city</option><option>Intercity</option><option>Airport transfer</option><option>Wedding or event</option><option>Monthly rental</option></select></label>
              <label className={labelClass}>Driver preference *<select name="driver" required defaultValue="" className={fieldClass}><option value="" disabled>Select preference</option><option>With driver</option><option>Without driver</option><option>Need advice</option></select></label>
              <label className={labelClass}>Your name *<input name="name" autoComplete="name" required placeholder="Full name" className={fieldClass} /></label>
              <label className={labelClass}>Phone number *<input name="phone" type="tel" autoComplete="tel" required placeholder="03XX XXXXXXX" pattern="[+0-9 ()-]{10,20}" className={fieldClass} /></label>
              <label className={`${labelClass} sm:col-span-2`}>Additional notes<textarea name="notes" rows={3} placeholder="Flight number, luggage, child seat, special route, etc." className={`${fieldClass} resize-none`} /></label>
              <button type="submit" className="group flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm text-white transition hover:bg-neutral-800 sm:col-span-2">Inquire on WhatsApp <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
