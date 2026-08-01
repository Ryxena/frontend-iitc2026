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
              "Menjembatani masa depan tanpa melupakan akar tradisi."
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
            Melalui kompetisi ini, kami menantang talenta digital terbaik bangsa untuk <br className="hidden xl:block" />
            menciptakan solusi teknologi yang relevan, inklusif, dan tetap menjunjung tinggi <br className="hidden xl:block" />
            nilai-nilai luhur kebudayaan Nusantara.
          </p>
          <p className="leading-[1.8] text-[1.05rem]">
            Melalui kompetisi ini, kami menantang talenta digital terbaik bangsa untuk <br className="hidden xl:block" />
            menciptakan solusi teknologi yang relevan, inklusif, dan tetap menjunjung tinggi <br className="hidden xl:block" />
            nilai-nilai luhur kebudayaan Nusantara.
          </p>

          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-6 lg:pt-8">
            <div className="w-full sm:w-[19rem] xl:w-[21rem] bg-white border border-slate-200 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-md rounded-bl-md p-7 lg:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-blue-700" strokeWidth={2} />
              <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Inklusivitas</h3>
              <p className="text-[0.95rem] text-slate-600 leading-relaxed">
                Membangun teknologi yang dapat diakses oleh seluruh lapisan
                masyarakat Indonesia.
              </p>
            </div>
            <div className="w-full sm:w-[19rem] xl:w-[21rem] bg-white border border-slate-200 rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-md rounded-br-md p-7 lg:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <Origami className="w-8 h-8 text-[#EA580C]" strokeWidth={2} />
              <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Pelestarian</h3>
              <p className="text-[0.95rem] text-slate-600 leading-relaxed">
                Mengintegrasikan nilai budaya ke dalam kode dan desain produk
                digital modern.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
