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
  {
    question: "Apakah peserta boleh mengikuti lebih dari satu lomba?",
    answer: "Tidak boleh. Setiap peserta hanya diperkenankan mengikuti satu cabang perlombaan.",
  },
  {
    question: "Bagaimana mekanisme pengumpulan hasil karya?",
    answer: "Pengumpulan hasil karya dilakukan melalui dashboard peserta pada menu Submission setelah tim dinyatakan resmi terdaftar dan telah menyelesaikan administrasi/pembayaran.",
  },
  {
    question: "Apa format file untuk pengumpulan hasil karya?",
    answer: "Pengumpulan hasil karya diunggah dalam bentuk link Google Drive (pastikan akses link diset ke 'Anyone with the link can view').",
  },
  {
    question: "Bagaimana cara juri menilai hasil karya?",
    answer: "Juri menilai hasil karya berdasarkan kriteria yang telah ditetapkan secara objektif dan konsisten. Detail rubrik penilaian dan daftar juri dapat dilihat pada Guide Book perlombaan.",
  },
  {
    question: "Bagaimana cara membayar biaya pendaftarannya?",
    answer: (
      <>
        Pembayaran biaya pendaftaran dapat ditransfer ke rekening/e-wallet berikut:
        <ul className="list-disc pl-5 pt-2 pb-6 space-y-1">
          <li>BRI a.n Maylinda Eka Saputri (683901020736507)</li>
          <li>GOPAY a.n Maylinda Eka Saputri (+62 821-3780-5336)</li>
          <li>Seabank a.n Tifa Fitriana (901912316510)</li>
        </ul>
      </>
    ),
  },
  {
    question: "Adakah kontak yang dapat dihubungi?",
    answer: (
      <>
        Kamu bisa menghubungi kami secara online melalui:
        <ul className="list-disc pl-5 pt-2 pb-6 space-y-1">
          <li>
            Instagram: <a href="https://instagram.com/iitc_intermedia" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">@iitc_intermedia</a>
          </li>
          <li>WhatsApp CP 1: Linga (085133711081)</li>
          <li>WhatsApp CP 2: Lingu (085133711082)</li>
        </ul>
      </>
    ),
  },
  {
    question: "Link grup whatsapp nya dimana ya?",
    answer: "Link grup WhatsApp akan otomatis muncul di halaman dashboard setelah ketua tim melakukan pembayaran dan dikonfirmasi oleh admin.",
  },
  {
    question: "Apakah lomba Web Design harus terhubung ke database dan memiliki sistem backend?",
    answer: "Tidak. Lomba Web Design hanya berfokus pada Front-End (FE) dan desain (UI/UX). Peserta tidak perlu menghubungkannya ke database atau membuat sistem backend.",
  },
  {
    question: "Apakah wajib melengkapi data profile pada dashboard?",
    answer: "Ya, setiap peserta wajib melengkapi data profil pada dashboard di menu profile.",
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
