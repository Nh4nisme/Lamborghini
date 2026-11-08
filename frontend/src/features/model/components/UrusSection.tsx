import { ArrowRight } from "lucide-react";

export function UrusSection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-10 bg-black">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"
                            alt="Urus Family"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </div>

                    <div className="animate-fadeInUp">
                        <p className="text-sm text-lambo-primary uppercase tracking-wider font-barlow font-semibold mb-4">
                            EXPAND YOUR HORIZONS
                        </p>
                        <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-6 tracking-tight">
                            EVERY ROAD.<br />
                            YOUR WORLD.
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            The presence of a super sports car, interpreted for a world of possibilities. Discover the Urus family and a distinctive approach to performance, versatility and everyday emotion.
                        </p>
                        <button className="group border-2 border-lambo-primary hover:bg-lambo-primary text-lambo-primary hover:text-lambo-bold-black font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2">
                            <span>Explore the family</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}