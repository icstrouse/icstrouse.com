import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code2, Database, Globe, Server } from "lucide-react"

export default function Home() {
  const skills = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Backend Development",
      description: "Ruby on Rails, Node.js, API Design, Microservices",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Design",
      description: "PostgreSQL, MongoDB, Redis, Data Modeling",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cloud & DevOps",
      description: "AWS, Docker, CI/CD, Infrastructure as Code",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ian Strouse
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 mb-8">
                Full Stack Engineer with 9 years of experience building scalable, modern web applications that solve
                real-world problems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-colors"
                >
                  Read My Blog
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
                <Image
                  src="/images/profile.jpg"
                  alt="Ian Strouse"
                  width={320}
                  height={320}
                  className="relative z-10 rounded-full object-cover border-4 border-slate-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              I specialize in building end-to-end web applications using modern technologies and best practices to
              deliver exceptional user experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="text-blue-400 mb-4">{skill.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                <p className="text-slate-400 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">About Me</h2>
          </div>
          <div className="prose prose-lg prose-invert mx-auto">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              With 9 years of experience in full stack development, I've had the privilege of working on diverse
              projects ranging from startup MVPs to enterprise-scale applications. My journey has taken me through the
              evolution of web technologies, from the early days of jQuery and PHP to the modern React and Node.js
              ecosystem.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I'm passionate about writing clean, maintainable code and building applications that not only function
              well but also provide exceptional user experiences. I believe in the power of continuous learning and
              staying up-to-date with the latest industry trends and best practices.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or
              sharing my knowledge through blog posts and mentoring other developers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-slate-300 mb-8">
            I'm always interested in new opportunities and exciting projects.
          </p>
          <a
            href="mailto:ian.strouse@gmail.com"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-lg"
          >
            Get In Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
