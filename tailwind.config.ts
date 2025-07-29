import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        background: "rgb(2 6 23)", // slate-950
        foreground: "rgb(248 250 252)", // slate-50
        border: "rgb(51 65 85)", // slate-600
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "rgb(203 213 225)", // slate-300
            "--tw-prose-headings": "rgb(248 250 252)", // slate-50
            "--tw-prose-lead": "rgb(148 163 184)", // slate-400
            "--tw-prose-links": "rgb(96 165 250)", // blue-400
            "--tw-prose-bold": "rgb(248 250 252)", // slate-50
            "--tw-prose-counters": "rgb(148 163 184)", // slate-400
            "--tw-prose-bullets": "rgb(100 116 139)", // slate-500
            "--tw-prose-hr": "rgb(51 65 85)", // slate-600
            "--tw-prose-quotes": "rgb(248 250 252)", // slate-50
            "--tw-prose-quote-borders": "rgb(51 65 85)", // slate-600
            "--tw-prose-captions": "rgb(148 163 184)", // slate-400
            "--tw-prose-code": "rgb(147 197 253)", // blue-300
            "--tw-prose-pre-code": "rgb(203 213 225)", // slate-300
            "--tw-prose-pre-bg": "rgb(30 41 59)", // slate-800
            "--tw-prose-th-borders": "rgb(51 65 85)", // slate-600
            "--tw-prose-td-borders": "rgb(71 85 105)", // slate-600
          },
        },
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("@tailwindcss/typography"), require("tailwindcss-animate")],
}

export default config
