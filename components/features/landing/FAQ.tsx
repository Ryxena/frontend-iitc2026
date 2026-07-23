"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Apa itu IITC?",
    answer:
      "Intermedia Information Technology Competition (IITC) adalah ajang kompetisi teknologi bergengsi yang memadukan inovasi digital modern dengan nilai-nilai luhur kebudayaan Indonesia.",
  },
  {
    question: "Siapa saja yang bisa mendaftar?",
    answer:
      "Kompetisi ini terbuka untuk siswa SMA/SMK sederajat seluruh Indonesia sesuai dengan kategori lomba yang dipilih.",
  },
  {
    question: "Bagaimana cara mendaftar tim?",
    answer:
      "Pendaftaran dilakukan melalui dashboard peserta. Ketua tim membuat tim, mendapatkan kode tim, dan membagikannya kepada anggota untuk bergabung.",
  },
  {
    question: "Apakah ada biaya pendaftaran?",
    answer:
      "Ya, biaya pendaftaran bervariasi tergantung kategori kompetisi. Detail biaya dapat dilihat pada kartu kategori kompetisi di atas.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="w-full scroll-mt-24 max-w-3xl mx-auto pt-12 border-t border-slate-200"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3">Pertanyaan Sering Diajukan</h2>
        <p className="text-slate-500">
          Temukan jawaban untuk pertanyaan umum seputar kompetisi.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx + 1}`}
            className="border border-slate-200 rounded-2xl px-6 bg-white"
          >
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-500 pb-5 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
