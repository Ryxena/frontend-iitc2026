"use client";
import { motion } from "framer-motion";
import { Users, Origami } from "lucide-react";

export default function About() {
  return (
    <section id="tentang" className="w-full scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="leading-none mb-6">
            <span className="block text-4xl font-normal text-slate-900">
              Tentang
            </span>
            <span className="block text-6xl font-extrabold text-slate-900 mt-1">
              IITC
            </span>
          </h2>
          <div className="w-40 h-1 bg-blue-700 rounded-full mb-10"></div>

          <div className="border border-slate-800 bg-white rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md p-6 max-w-md">
            <p className="text-xs font-bold tracking-widest text-blue-700 mb-3">
              VISI KAMI
            </p>
            <p className="italic font-semibold text-slate-900 leading-relaxed">
              &quot;Menjembatani masa depan tanpa melupakan akar tradisi.&quot;
            </p>
          </div>
        </motion.div>

        {/* Kolom Kanan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-5 text-slate-600"
        >
          <p className="leading-relaxed">
            Melalui kompetisi ini, kami menantang talenta digital terbaik bangsa
            untuk menciptakan solusi teknologi yang relevan, inklusif, dan tetap
            menjunjung tinggi nilai-nilai luhur kebudayaan Nusantara.
          </p>
          <p className="leading-relaxed">
            Melalui kompetisi ini, kami menantang talenta digital terbaik bangsa
            untuk menciptakan solusi teknologi yang relevan, inklusif, dan tetap
            menjunjung tinggi nilai-nilai luhur kebudayaan Nusantara.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <Users className="w-6 h-6 text-blue-700" />
              <h3 className="font-semibold text-slate-900">Inklusivitas</h3>
              <p className="text-sm text-slate-500">
                Membangun teknologi yang dapat diakses oleh seluruh lapisan
                masyarakat Indonesia.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <Origami className="w-6 h-6 text-orange-600" />
              <h3 className="font-semibold text-slate-900">Pelestarian</h3>
              <p className="text-sm text-slate-500">
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
