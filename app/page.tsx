import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  return (
    <main>
      <div className="container max-w-full h-screen bg-zinc-900 text-slate-300">
        <div className="flex flex-row h-screen items-center justify-center">

          {/* LEFT SIDE */}
          <div className="basis-1/2 p-20 items-center">
            <div className="flex justify-center">
              <h3>ABOUT ME</h3>
            </div>

            <p className="mt-10 text-lg text-justify">I’m a web developer with 7 years of experience, primarily in backend engineering. Coming from a liberal arts background, I began my journey with a focus on people, but quickly developed my technical chops, learning IT and software development. I am now an experienced engineer specializing in the design and development of APIs, SQL databases, and systems architecture.</p>
            
            <div className="flex justify-center mt-16 ">
              <a
                className="flex justify-center pt-1 h-10 w-28 text-lg font-bold rounded-sm bg-slate-200 text-zinc-900 hover:bg-slate-500"
                href="/resume.pdf"
                target="_blank"
              >Resume</a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="basis-1/2 flex flex-col items-center justify-center">
            <h1>Ian Strouse</h1>
            <h2 className="mt-5">Full-Stack Web Developer</h2>

            <Image
              className="mt-10"
              src="/profile3.jpg"
              alt="Profile Pic"
              width={400}
              height={400}
              priority
            />

            <h4 className="mt-10">CONNECT WITH ME</h4>

            <div className="flex flex-row">
              <a className="m-2" href="https://github.com/icstrouse" target="_blank">
                <FontAwesomeIcon className="text-2xl hover:text-slate-500" icon={faGithub} />
              </a>
              <a className="m-2" href="https://www.linkedin.com/in/ian-strouse/" target="_blank">
                <FontAwesomeIcon className="text-2xl hover:text-slate-500" icon={faLinkedin} />
              </a>
              <a className="m-2" href="https://medium.com/@icstrouse" target="_blank">
                <FontAwesomeIcon className="text-2xl hover:text-slate-500" icon={faMedium} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
