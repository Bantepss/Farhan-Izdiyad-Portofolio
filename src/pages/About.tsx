import { motion } from 'framer-motion';
import fotoProfil2 from '../assets/FotoBantep2.jpeg';

export function About() {
  // ----------------------------------------------------------------------
  // DATA TECH ARSENAL (KEMAMPUAN TEKNIS BERDASARKAN KATEGORI)
  // Kamu bisa menambahkan, menghapus, atau mengedit isi dari 'skills'
  // di masing-masing kategori di bawah ini.
  // ----------------------------------------------------------------------
  const techArsenal = [
    {
      category: "Language",
      skills: ["TypeScript", "JavaScript", "Python", "C"]
    },
    {
      category: "Design",
      skills: ["UI/UX Design", "Figma", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Business",
      skills: ["Product Strategy", "Agile", "Management"]
    },
    {
      category: "Hardware",
      skills: ["IoT", "Microcontrollers", "Arduino"]
    },
    {
      category: "Problem Solving",
      skills: ["System Architecture", "Algorithms", "Debugging"]
    },
    {
      category: "Project Management",
      skills: ["Leadership", "Staff Organisation", "Human Management", "Human Resource"]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">About Me</h2>
        <p className="text-[#475569] mt-3">My background and technical expertise.</p>
      </div>
      
      {/* Mengubah struktur grid menjadi flex col agar menyusun ke bawah */}
      <div className="flex flex-col gap-8">
        
        {/* Background / Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="saas-card p-8" // Menghapus sticky top-32 karena sekarang berjejer ke bawah
        >
          <h3 className="text-xl font-bold mb-6 text-[#0F172A]">Background</h3>
          
          {/* Flexbox untuk mensejajarkan foto dan teks */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            {/* Wadah Foto */}
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-200">
              {/* PASTIKAN KAMU MENGGANTI 'src' DI BAWAH INI DENGAN PATH FOTOMU */}
              {/* Misalnya: src="/images/farhan.jpg" jika foto ada di folder public/images/ */}
              <img 
                src={fotoProfil2} 
                alt="Farhan Izdiyad" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Wadah Teks */}
            <div className="flex-1">
              <p className="text-slate-600 leading-relaxed mb-4">
                Hello everyone! Let me introduce myself, my name is Farhan Izdiyad, but you can just call me Farhan. I was born on June 17, 2007, so I'm currently 18 years old. I'm originally from Bekasi; I went to elementary school at SDIT Nur Hikmah, continued my middle school at SMPIT Nur Hikmah, and spent my high school years at SMAN 5 Kota Bekasi. Currently, I'm an undergraduate student at Institut Teknologi Bandung (ITB), specifically majoring in Information Systems and Technology (STI) under the School of Electrical Engineering and Informatics (STEI).
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Outside of my regular studies, I'm pretty active in various activities. From my experience as a student council (OSIS) officer back in high school, to my campus life where I served as a Human Resources staff member for AMI 2026 evaluating the IT staff's performance, handling UI/UX design for the April Graduation Parade (WISPRIL) 2026 committee, interning at the KM ITB student cabinet, and now I'm busy being part of the IMPACT 6.0 organizing committee.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When it comes to tech, I really enjoy exploring software development using C, Python, or TypeScript, as well as building IoT prototypes using Arduino and ESP32. But don't worry, I'm not always glued to my laptop! In my free time, I love hanging out at coffee shops, playing PC/mobile games like Valorant and Genshin Impact, going to live music concerts, editing videos on CapCut, or just playing cards and grabbing local warteg food with my friends. Nice to meet you all, I hope we can get to know each other quickly and have a great time working together!
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Tech Arsenal Categories Card (Sekarang berada di bawah) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="saas-card p-8 bg-slate-50 border-transparent flex flex-col gap-6"
        >
          <div>
            <h3 className="text-xl font-bold mb-1 text-[#0F172A]">Skill Experience</h3>
            <p className="text-sm text-slate-500">My Skill, Based On My Experience.</p>
          </div>
          
          <div className="flex flex-col gap-6">
            {techArsenal.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-bold text-[#135CC5] uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">
                  {section.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {section.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm hover:border-[#135CC5] hover:text-[#135CC5] transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}