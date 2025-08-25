
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import { TbBrandCSharp } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { BsFillCSquareFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaMapMarkerAlt,
  FaJs,
} from "react-icons/fa";
import { Typed } from "react-typed";

const NAV_LINKS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  // { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [navbarSolid, setNavbarSolid] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const text = "Frontend Developer || Passionate about Full-Stack Development";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error | null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    emailjs.init("sgLfQ-UXwttGCY1Lh"); // Initialize with your public key
  }, []);
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        "service_dmeg6yo", // Replace with your EmailJS Service ID
        "template_egbhpcm", // Replace with your EmailJS Template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message
        },
        form,
        "sgLfQ-UXwttGCY1Lh" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("error");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          setIndex(index + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (index > 0) {
          setDisplayText(text.slice(0, index - 1));
          setIndex(index - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text]);
  // scroll for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      setNavbarSolid(window.scrollY > 50);

      // Update active section on scroll
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = "home";
      NAV_LINKS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPos) current = id;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll and close mobile nav on link click
  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => {
        setNavOpen(false);
      }, 300);
    } else {
      setNavOpen(false);
    }
  };

  const skills = [
    { icon: <BsFillCSquareFill className="text-blue-400" />, name: "C" },
    { icon: <SiCplusplus className="text-blue-600" />, name: "C++" },
    { icon: <FaJava className="text-red-500" />, name: "Java" },
    { icon: <TbBrandCSharp className="text-green-400" />, name: "C#" },
    { icon: <FaHtml5 className="text-orange-500" />, name: "HTML5" },
    { icon: <FaCss3Alt className="text-blue-500" />, name: "CSS3" },
    { icon: <SiExpress className="text-gray-300" />, name: "Express.js" },
    { icon: <FaDatabase className="text-purple-500" />, name: "MongoDB" },
    { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
    { icon: <FaJs className="text-yellow-400" />, name: "JavaScript" },
    { icon: <FaReact className="text-cyan-400" />, name: "React" },
  ];
  const repeatedSkills = [...skills, ...skills, ...skills, ...skills];
  const techIcons = {
    "C": <BsFillCSquareFill className="text-blue-400" />,
    "C++": <SiCplusplus className="text-blue-600" />,
    "Java": <FaJava className="text-red-500" />,
    "C#": <TbBrandCSharp className="text-green-400" />,
    "HTML5": <FaHtml5 className="text-orange-500" />,
    "CSS3": <FaCss3Alt className="text-blue-500" />,
    "Express.js": <SiExpress className="text-gray-300" />,
    "MongoDB": <FaDatabase className="text-purple-500" />,
    "Node.js": <FaNodeJs className="text-green-500" />,
    "JavaScript": <FaJs className="text-yellow-400" />,
    "React": <FaReact className="text-cyan-400" />,
    "TailwindCSS": <RiTailwindCssFill className="text-cyan-400" />,
  };

  const projects = [
    {
      title: "Tutor Solution",
      description: "Tutor Solution connects students and tutors with easy registration, login, search, and booking. It features Firebase auth, MongoDB storage, and a clean, responsive UI with light/dark mode.",
      details:
        "Built with React, Tailwind, and Framer Motion. Fully responsive and animated.",
      liveLink: "https://fir-auth-5fe90.web.app/",
      githubLink: "https://github.com/Shorifuzzaman2020/Tutor-solution-client-side",
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS", "HTML5"],
      challenges:
        "Learning Framer Motion for animations was challenging but rewarding.",
      improvements:
        "Plan to add a blog and multi-language support in future.",
      image: "/screencapture-fir-auth-5fe90-web-app-2025-08-11-23_13_28.png",
    },
    {
      title: "GlobalScholarHub",
      description: "A full-stack web application built with MongoDB, Express.js, React.js, and Node.js to streamline scholarship application, review, and approval processes. It allows students to apply for scholarships online, enables admins to manage applications efficiently, and provides a transparent system for status tracking.",
      details:
        "Uses MERN stack with secure authentication and Stripe integration.",
      liveLink: "https://scholarship-handle.web.app/",
      githubLink: "https://github.com/Shorifuzzaman2020/Scholarship-management-system-client-side",
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS", "HTML5"],
      challenges: "Handling payments and authentication securely.",
      improvements: "Add recommendation engine.",
      image: "/screencapture-scholarship-handle-web-app-2025-08-11-23_15_02.png",
    },
    {
      title: "Recipe Book",
      description: "A Recipe Sharing Application where users can discover, share, and save recipes, featuring user authentication, search and filter options, and an intuitive, responsive design for seamless cooking inspiration.",
      details:
        "Built using React, Chart.js, and MQTT for real-time IoT updates.",
      liveLink: "https://event-discovery-7571a.web.app/",
      githubLink: "https://github.com/Shorifuzzaman2020/Recipe-sharing-client-side",
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS", "HTML5"],
      challenges: "Real-time data syncing.",
      improvements: "Add mobile app companion.",
      image: "/screencapture-event-discovery-7571a-web-app-2025-08-11-23_12_07.png",
    },
    {
      title: "Event Explorer",
      description: "Event Explorer is a responsive React app that allows users to browse and manage tech events. It includes Firebase authentication (email/password and Google), user profiles, and interactive event sliders powered by Swiper.js. The app uses React Context for global user state and React Router for smooth navigation.",
      details:
        "Built using React, Chart.js, and MQTT for real-time IoT updates.",
      liveLink: "https://event-discovery-project.web.app/",
      githubLink: "https://github.com/Shorifuzzaman2020/Event-Explorer",
      techStack: ["React", "Javascript", "TailwindCSS", "HTML5"],
      challenges: "Real-time data syncing.",
      improvements: "Add mobile app companion.",
      image: "/screencapture-event-discovery-project-web-app-2025-08-11-23_10_04.png",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen scroll-smooth">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navbarSolid ? "bg-gray-900 shadow-lg" : "bg-transparent"
          }`}
      >
        <nav className="w-full flex justify-between items-center p-4 md:px-8">
          <div className="text-xl font-bold cursor-pointer select-none" onClick={() => handleNavClick("home")}>
            Md. Shorifuzzaman
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8">
            {NAV_LINKS.map(({ name, id }) => (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id)}
                  className={`hover:text-green-400 transition-colors ${activeSection === id ? "text-green-400 font-semibold" : ""
                    }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Toggle Menu"
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col bg-gray-800 overflow-hidden md:hidden"
            >
              {NAV_LINKS.map(({ name, id }) => (
                <li key={id} className="border-b border-gray-700 last:border-none">
                  <button
                    onClick={() => handleNavClick(id)}
                    className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors ${activeSection === id ? "bg-gray-700 font-semibold text-green-400" : ""
                      }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-4 md:h-20"></div>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-12"
      >
        <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
          {/* Left Content */}
          <div className="text-center sm:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Hi, I'm{" "}
              <p className="text-green-400 mt-8"> <span className="mt-2">Md. Shorifuzzaman</span></p>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl max-w-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {displayText}
              <span className="text-green-400">|</span>
            </motion.p>

            <motion.div
              className="flex justify-center sm:justify-start gap-6 mt-6 text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href="https://github.com/Shorifuzzaman2020" target="_blank" aria-label="GitHub" className="hover:text-green-400 transition-colors duration-300">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/mdshorifuzzaman2020/" target="_blank" aria-label="LinkedIn" className="hover:text-green-400 transition-colors duration-300">
                <FaLinkedin />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shorifuzzamansoil2020@gmail.com" target="_blank" aria-label="Email" className="hover:text-green-400 transition-colors duration-300">
                <FaEnvelope />
              </a>
            </motion.div>
            {/* <motion.div className="mt-8">
              <a href="https://drive.google.com/file/d/1rh3Kz3_C71ahbqlkqTCWE_wSz3AXcc3g/view?usp=sharing" target="_blank" className="bg-green-400 px-2 py-2 text-2xl rounded-lg font-bold">Resume</a>
            </motion.div> */}
            <motion.div className="mt-8">
              <button
                onClick={() => {
                  // Open preview in a new tab
                  window.open(
                    "https://drive.google.com/file/d/1Kj40NaTJtAUzqVi-H_2kFslO3D8AmAY8/view?usp=sharing",
                    "_blank"
                  );

                  // Trigger direct download
                  const link = document.createElement("a");
                  link.href = "https://drive.google.com/uc?export=download&id=1Kj40NaTJtAUzqVi-H_2kFslO3D8AmAY8";
                  link.setAttribute("download", "MD_SHORIFUZZAMAN_RESUME.pdf");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-green-400 px-4 py-2 text-2xl rounded-lg font-bold inline-flex items-center gap-2 hover:cursor-pointer"
              >
                <FaDownload /> Resume
              </button>

            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex-shrink-0"
          >
            <div className="overflow-hidden rounded-full shadow-lg border-4 border-green-400 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72">
              <img
                src="/portfolio image.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

      </section>

      {/* About Section */}
      <section
        id="about"
        className="pb-20 pt-10 px-6 max-w-4xl mx-auto text-center md:text-left"
      >
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-gray-300 text-lg leading-relaxed max-w-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          I'm a passionate developer with hands-on experience creating dynamic and responsive websites through personal projects and learning. Skilled in both front-end and back-end technologies, I enjoy turning ideas into functional applications. Outside of coding, I love traveling, watching movies, Playing chess, and exploring the latest tech trends.
        </motion.p>
      </section>
      <section id="skills" className="bg-gray-800 py-10 overflow-hidden relative">
        {/* Local animation style */}
        <style>
          {`
          @keyframes scrollX {
            0% { transform: translateX(-400%); }
            400% { transform: translateX(0%); }
          }
          .scroll-animation {
            animation: scrollX 60s linear infinite;
          }
        `}
        </style>

        <h2 className="text-4xl font-bold text-center mb-16 mt-10 text-white">Skills</h2>

        <div className="overflow-hidden w-full">
          <div className="flex gap-16 mb-16 whitespace-nowrap scroll-animation">
            {repeatedSkills.map(({ icon, name }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center min-w-[120px]"
              >
                <div className="text-5xl mb-2">{icon}</div>
                <p className="text-lg text-white">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Projects section*/}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="bg-[#1a1a2e] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center md:items-stretch"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Project Image */}
              <div className="bg-gray-900 flex-shrink-0 w-full md:w-1/2 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover lg:object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                <div>
                  <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <h1 className="text-2xl font-bold mb-4">Technology Used</h1>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {project.techStack.map((tech, index) => (
                      <div key={index} className="flex items-center md:text-2xl lg:text-sm gap-4">
                        {techIcons[tech] && <span>{techIcons[tech]}</span>} {/* Show icon if exists */}
                        <span>{tech}</span>
                      </div>
                    ))}

                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded-lg transition-colors duration-300"
                  >
                    🔗Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <FaGithub className="text-xl" />
                    Github
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-20 px-6 max-w-4xl mx-auto text-center md:text-left"
      >
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>
        <div className="space-y-6 text-gray-300 text-lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-2xl">B.Sc. in Computer Science and Engineering</h3>
            <p>International University of Business Agriculture and Technology, 2022 - 2026</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-2xl">HSC</h3>
            <p>Agricultural University College, Mymensingh , 2018 - 2020</p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section id="experience" className="bg-gray-800 py-20 px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>
        <div className="max-w-4xl mx-auto space-y-8 text-gray-300 text-lg">
          <motion.div
            className="bg-gray-700 rounded-lg p-6 cursor-default"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold">Frontend Developer</h3>
            <p className="italic mb-2">TechCorp, 2023 - Present</p>
            <p>Building responsive UI components and integrating APIs.</p>
          </motion.div>
          <motion.div
            className="bg-gray-700 rounded-lg p-6 cursor-default"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold">Software Intern</h3>
            <p className="italic mb-2">WebSolutions, 2022 - 2023</p>
            <p>Worked on backend API development and database design.</p>
          </motion.div>
        </div>
      </section> */}


      {/* Contact Section */}
      <section id="contact" className="bg-gray-800 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-12">

          {/* Contact Info */}
          <motion.div
            className="flex-1 text-center sm:text-left"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
            <div className="space-y-6 text-lg text-gray-300">

              <p>
                <FaEnvelope className="inline mr-2 text-green-400" />
                shorifuzzamansoil2020@gmail.com
              </p>
              <p>
                <FaWhatsapp className="inline mr-2 text-green-400" />
                +880 1996386373
              </p>
              <a
                href="https://www.google.com/maps/place/Dhaka,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start "
              >
                <FaMapMarkerAlt className="inline mr-2 text-green-400" />
                Dhaka, Bangladesh
              </a>
              <h2 className="text-xl font-bold mb-8">Connect with Me</h2>
              <div className="text-4xl flex justify-center md:justify-start gap-3">
                <a href="https://github.com/Shorifuzzaman2020" target="_blank" aria-label="GitHub" className="hover:text-green-400 transition-colors duration-300">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/mdshorifuzzaman2020/" target="_blank" aria-label="LinkedIn" className="hover:text-green-400 transition-colors duration-300">
                  <FaLinkedin />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shorifuzzamansoil2020@gmail.com" target="_blank" aria-label="Email" className="hover:text-green-400 transition-colors duration-300">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="flex-1 bg-gray-900 rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-center mb-8">Send me a message</h3>
            <form onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded font-semibold transition-colors duration-300 ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-green-400 text-center">✅ Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-center">❌ Failed to send message. Try again later.</p>
              )}
            </form>
          </motion.div>

        </div>
      </section>


      {/* Footer */}
      <footer className="py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Md. Shorifuzzaman. All rights reserved.
      </footer>
    </div>
  );
}
