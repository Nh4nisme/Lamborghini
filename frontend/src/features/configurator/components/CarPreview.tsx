export function CarPreview({ ten, image, tenMau }: { ten: string; image?: string; tenMau?: string }) {
    return (
        <section className="relative flex-1 p-8">
            <h1 className="text-6xl font-bold uppercase">{ten}</h1>
            {tenMau && <p className="absolute right-8 top-10 text-sm uppercase">{tenMau}</p>}
            {image && <img src={image} alt={ten} className="mx-auto mt-10 max-h-[360px] object-contain" />}
        </section>
    )
}