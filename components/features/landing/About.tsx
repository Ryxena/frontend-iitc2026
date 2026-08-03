"use client";
import { motion } from "framer-motion";
import { Users, Origami } from "lucide-react";

export default function About() {
  return (
    <section id="tentang" className="w-full scroll-mt-24">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between h-full lg:col-span-5 xl:col-span-4"
        >
          <div>
            <h2 className="leading-none mb-4">
              <span className="block text-4xl lg:text-[3rem] font-light text-slate-800 mb-2">
                Tentang
              </span>
              <span className="block text-6xl lg:text-[7.5rem] font-extrabold text-slate-900 tracking-tight">
                IITC
              </span>
            </h2>
            <div className="w-full h-1.5 bg-blue-700 mt-2"></div>
          </div>

          <div className="w-full border border-slate-600 bg-slate-50/50 rounded-tl-md rounded-tr-[2.5rem] rounded-br-md rounded-bl-[2.5rem] p-7 shadow-sm mt-8">
            <p className="text-xs font-bold tracking-[0.15em] text-blue-700 mb-4 uppercase">
              Visi Kami
            </p>
            <p className="italic font-bold text-slate-800 leading-relaxed text-[1.05rem]">
              "Memanfaatkan teknologi digital sebagai sarana pelestarian dan perayaan keberagaman bahasa di Indonesia."
            </p>
          </div>
        </motion.div>

        {/* Kolom Kanan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-6 lg:col-start-7 space-y-7 text-slate-600"
        >
          <p className="leading-[1.8] text-[1.05rem]">
            IITC 2026 merupakan wadah bagi generasi muda untuk mengekspresikan ide kreatif dan mentransformasikan visi mereka menjadi karya visual. Kami menantang peserta untuk menciptakan solusi teknologi yang inklusif dan edukatif.
          </p>
          <p className="leading-[1.8] text-[1.05rem]">
            Dengan semangat <span className="font-semibold text-slate-800">"From Vision to Innovation"</span>, IITC menginspirasi generasi muda untuk menciptakan inovasi digital yang tidak hanya menjawab tantangan masa depan, tetapi juga mengangkat dan melestarikan keberagaman bahasa Indonesia sebagai bagian dari identitas bangsa di era digital.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-6">
            <div className="w-full bg-white border border-slate-200 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-md rounded-bl-md p-6 lg:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <Origami className="w-8 h-8 text-[#EA580C]" strokeWidth={2} />
              <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Pelestarian Bahasa</h3>
              <p className="text-[0.95rem] text-slate-600 leading-relaxed">
                Mendigitalisasi dan mendokumentasikan kekayaan bahasa daerah sebagai warisan budaya.
              </p>
            </div>
            <div className="w-full bg-white border border-slate-200 rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-md rounded-br-md p-6 lg:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Edukasi Interaktif</h3>
              <p className="text-[0.95rem] text-slate-600 leading-relaxed">
                Membangun platform pembelajaran bahasa yang interaktif dan memotivasi penggunanya.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
