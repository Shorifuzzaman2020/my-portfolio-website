


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa";

const NAV_LINKS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Education", id: "education" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [navbarSolid, setNavbarSolid] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

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
    { icon: <FaHtml5 className="text-orange-500" />, name: "HTML5" },
    { icon: <FaCss3Alt className="text-blue-500" />, name: "CSS3" },
    { icon: <FaJs className="text-yellow-400" />, name: "JavaScript" },
    { icon: <FaReact className="text-cyan-400" />, name: "React" },
    { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
    { icon: <FaDatabase className="text-purple-500" />, name: "MongoDB" },
  ];

  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio to showcase my work and skills.",
      details:
        "Built with React, Tailwind, and Framer Motion. Fully responsive and animated.",
      liveLink: "#",
      githubLink: "#",
      techStack: "React, Tailwind CSS, Framer Motion",
      challenges:
        "Learning Framer Motion for animations was challenging but rewarding.",
      improvements:
        "Plan to add a blog and multi-language support in future.",
      image: null,
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack MERN project with authentication and payment integration.",
      details:
        "Uses MERN stack with secure authentication and Stripe integration.",
      liveLink: "#",
      githubLink: "#",
      techStack: "MongoDB, Express, React, Node.js",
      challenges: "Handling payments and authentication securely.",
      improvements: "Add recommendation engine.",
      image: null,
    },
    {
      title: "IoT Dashboard",
      description: "Real-time device monitoring with data visualization.",
      details:
        "Built using React, Chart.js, and MQTT for real-time IoT updates.",
      liveLink: "#",
      githubLink: "#",
      techStack: "React, MQTT, Chart.js",
      challenges: "Real-time data syncing.",
      improvements: "Add mobile app companion.",
      image: null,
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen scroll-smooth">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navbarSolid ? "bg-gray-900 shadow-lg" : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto flex justify-between items-center p-4 md:px-8">
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
      <div className=" md:h-4"></div>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
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
              <span className="text-green-400">Md. Shorifuzzaman</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl max-w-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Frontend Developer <span className="text-green-400">||</span> Passionate about Full-Stack Development
            </motion.p>

            <motion.div
              className="flex justify-center sm:justify-start gap-6 mt-6 text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href="#" aria-label="GitHub" className="hover:text-green-400 transition-colors duration-300">
                <FaGithub />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-green-400 transition-colors duration-300">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Email" className="hover:text-green-400 transition-colors duration-300">
                <FaEnvelope />
              </a>
            </motion.div>
            <motion.div className="mt-8">
              <a href="" className="bg-green-400 px-2 py-2 text-2xl rounded-lg font-bold">Resume</a>
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
        className="py-20 px-6 max-w-4xl mx-auto text-center md:text-left"
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
          I'm a dedicated developer with experience in building dynamic and
          responsive websites. Skilled in both front-end and back-end
          technologies, I love turning ideas into reality. Outside of coding, I
          enjoy hiking, painting, and exploring new tech trends.
        </motion.p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-gray-800 py-20 px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-5xl mx-auto">
          {skills.map(({ icon, name }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center cursor-default"
              whileHover={{ scale: 1.15 }}
            >
              <div className="text-6xl mb-3">{icon}</div>
              <p className="text-lg">{name}</p>
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
            <h3 className="font-semibold text-2xl">B.Sc. in Computer Science</h3>
            <p>XYZ University, 2020 - 2024</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-2xl">HSC</h3>
            <p>ABC College, 2018 - 2020</p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="bg-gray-800 py-20 px-6">
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
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-lg p-6 cursor-pointer shadow-lg hover:shadow-green-500/50"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedProject(project)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelectedProject(project);
              }}
              aria-label={`Open details for ${project.title}`}
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                className="bg-gray-900 rounded-lg p-6 max-w-lg w-full relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="mb-4">{selectedProject.details}</p>
                <p><strong>Tech Stack:</strong> {selectedProject.techStack}</p>
                <p><strong>Challenges:</strong> {selectedProject.challenges}</p>
                <p><strong>Improvements:</strong> {selectedProject.improvements}</p>
                <div className="flex gap-4 mt-6 justify-end">
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                  >
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                  >
                    GitHub
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
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
                youremail@example.com
              </p>
              <p>
                <FaLinkedin className="inline mr-2 text-green-400" />
                <a href="#" className="hover:underline">
                  linkedin.com/in/yourname
                </a>
              </p>
              <p>
                <FaGithub className="inline mr-2 text-green-400" />
                <a href="#" className="hover:underline">
                  github.com/yourname
                </a>
              </p>
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
            <h3 className="text-3xl font-bold text-center mb-8">
              Send me a message
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-green-500 hover:bg-green-600 rounded font-semibold transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </section>


      {/* Footer */}
      <footer className="py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  );
}
