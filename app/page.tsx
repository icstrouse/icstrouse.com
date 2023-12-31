import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-zinc-100 text-slate-800 dark:bg-zinc-900 dark:text-slate-300">
      <div className="container max-w-8xl lg:h-screen">
        <div className="flex flex-col lg:flex-row-reverse lg:h-screen items-center justify-center">

          {/* TOP / RIGHT */}
          <div className="basis-1/2 flex flex-col items-center justify-center mt-20 lg:mt-0">
            <h1>Ian Strouse</h1>
            <h2 className="mt-5">Software Engineer</h2>

            <Image
              className="mt-10 shadow-md shadow-black/30 dark:shadow-black"
              src="/profilePic2019.jpg"
              alt="Profile Pic"
              width={400}
              height={400}
              priority
            />

            <h4 className="mt-10">CONNECT WITH ME</h4>

            <div className="flex flex-row">
              <a className="m-2" href="https://github.com/icstrouse" target="_blank">
                <FontAwesomeIcon className="text-2xl transition-colors ease-in-out hover:text-slate-400 hover:dark:text-slate-500" icon={faGithub} />
              </a>
              <a className="m-2" href="https://www.linkedin.com/in/ian-strouse/" target="_blank">
                <FontAwesomeIcon className="text-2xl transition-colors ease-in-out hover:text-slate-400 hover:dark:text-slate-500" icon={faLinkedin} />
              </a>
              <a className="m-2" href="https://medium.com/@icstrouse" target="_blank">
                <FontAwesomeIcon className="text-2xl transition-colors ease-in-out hover:text-slate-400 hover:dark:text-slate-500" icon={faMedium} />
              </a>
            </div>
          </div>

          {/* BOTTOM / LEFT SIDE */}
          <div className="basis-1/2 py-20 px-10 lg:p-20 items-center">
            <div className="flex justify-center">
              <h3>ABOUT ME</h3>
            </div>

            <p className="mt-10 text-lg text-justify">I’m a software engineer with 7 years of experience, primarily in backend engineering. Coming from a liberal arts background, I began my journey with a focus on people, but quickly developed my technical chops, learning IT and software development. I am now an experienced engineer specializing in the design and development of APIs, SQL databases, and systems architecture. My passion has always been bridging the divide between people and tech.</p>
            
            <div className="flex justify-center mt-16 ">
              <a
                className="flex justify-center pt-1 h-10 w-28 text-lg font-bold rounded-sm shadow-md shadow-black/30 dark:shadow-black bg-slate-800 text-zinc-100 dark:bg-slate-200 dark:text-zinc-900 transition-colors ease-in-out hover:bg-slate-400 hover:dark:bg-slate-500"
                href="/Ian Strouse Resume.pdf"
                target="_blank"
              >Resume</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
