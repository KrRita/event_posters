import Link from "next/link";
import {HoldingEvent} from "~/types/HoldingEvent";

type HoldingEventCardProps = {
    holdingEvent : HoldingEvent;
}

export const HoldingEventCard = ({holdingEvent}:HoldingEventCardProps) => {
    return (
    <Link href={`/holdingEvent/${holdingEvent.id}`}>
    <div className="w-full bg-[#ffdbc5] my-4 rounded-lg px-3 pt-3 pb-3 text-xl">
        <div className="mx-auto max-w-5xl font-bold text-4xl text-[#5f0707]">{holdingEvent.event.name}</div>
        <div className="mx-auto max-w-4xl">{holdingEvent.event.eventType} {holdingEvent.event.ageViewer} +</div>
        <div className="mx-auto max-w-4xl">Цена билета: {holdingEvent.ticketPrice} р.</div>
        <div className="mx-auto max-w-4xl">Место проведения: {holdingEvent.location.name}</div>
        <div className="mx-auto max-w-4xl">Краткое описание: {holdingEvent.description}</div>
        <div className="mx-auto max-w-4xl">Рейтинг: {holdingEvent.rating}&#9733;</div>
    </div>
    </Link>
    )
}