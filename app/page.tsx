'use client'

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-zinc-100 text-slate-800 dark:bg-zinc-900 dark:text-slate-300">
      <div className="container max-w-8xl lg:h-screen">
        <div className="flex flex-col lg:flex-row-reverse lg:h-screen items-center justify-center">

          {/* TOP / RIGHT */}
          <div className="basis-1/2 flex flex-col items-center justify-center mt-20 lg:mt-0">
            <h1>Ian Strouse</h1>
            <h2 className="mt-5">Full Stack Engineer</h2>

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
              <a className="m-2" href="https://www.linkedin.com/in/ian-strouse/" target="_blank">
                <FontAwesomeIcon className="text-2xl transition-colors ease-in-out hover:text-slate-400 hover:dark:text-slate-500" icon={faLinkedinIn} />
              </a>
              <a className="m-2" href="https://github.com/icstrouse" target="_blank">
                <FontAwesomeIcon className="text-2xl transition-colors ease-in-out hover:text-slate-400 hover:dark:text-slate-500" icon={faGithub} />
              </a>
              <a className="m-2" href="https://leetcode.com/u/icstrouse/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                  className="h-6 w-6 text-2xl transition-colors ease-in-out hover:text-slate-400 hover:dark:text-slate-500"
                  fill="currentColor"
                  strokeWidth="0.5"
                  stroke="currentColor"
                >
                  <path
                    d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z"
                    transform="scale(0.7)"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* BOTTOM / LEFT SIDE */}
          <div className="basis-1/2 py-20 px-10 lg:p-20 items-center">
            <div className="flex justify-center">
              <h3>ABOUT ME</h3>
            </div>

            <p className="mt-10 text-lg text-justify">I’m a software engineer with 9 years of experience, primarily in backend engineering. Coming from a liberal arts background, I began my journey with a focus on people, but quickly developed my technical chops, learning IT and software development. I am now an experienced engineer specializing in the design and development of APIs, SQL databases, and systems architecture. My passion has always been bridging the divide between people and tech.</p>
            
            <div className="flex justify-center mt-16 ">
              <a
                className="flex justify-center pt-1 h-10 w-28 text-lg font-bold rounded-sm shadow-md shadow-black/30 dark:shadow-black bg-slate-800 text-zinc-100 dark:bg-slate-200 dark:text-zinc-900 transition-colors ease-in-out hover:bg-slate-400 hover:dark:bg-slate-500"
                href="/Ian_Strouse_Resume.pdf"
                target="_blank"
              >Resume</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
