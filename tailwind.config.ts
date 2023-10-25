import type { Config } from 'tailwindcss';
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons"
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ef4444', // テーマカラー
      },
      animation: {
        "slide-in-bottom": "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.25s  both",
        "slide-out-bottom": "slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "slide-in-fwd-center": "slide-in-fwd-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-in-fwd-center-reverse": "slide-in-fwd-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   reverse both",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",//投稿入力画面
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",//投稿入力画面
        "fade-in": "fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-out": "fade-out 1s ease   both"
      },
      keyframes: {
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(1000px)",
            opacity: "0"
          },
          to: {
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "slide-out-bottom": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1"
          },
          to: {
            transform: "translateY(1000px)",
            opacity: "0"
          }
        },
        "slide-in-fwd-center": {
          "0%": {
            transform: "translateZ(-1400px)",
            opacity: "0"
          },
          to: {
            transform: "translateZ(0)",
            opacity: "1"
          }
        },
        "slide-in-fwd-reverse": {
          "0%": {
            transform: "translateZ(-1400px)",
            opacity: "0"
          },
          to: {
            transform: "translateZ(0)",
            opacity: "1"
          }
        },
        "slide-in-left": {
          "0%": {
              transform: "translateX(-1000px)",
              opacity: "0"
          },
          to: {
              transform: "translateX(0)",
              opacity: "1"
          }
        },
        "slide-in-right": {
          "0%": {
              transform: "translateX(1000px)",
              opacity: "0"
          },
          to: {
              transform: "translateX(0)",
              opacity: "1"
          }
      },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          to: {
            opacity: "1"
          }
        },
        "fade-out": {
          "0%": {
            opacity: "1"
          },
          to: {
            opacity: "0"
          }
        }

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["mdi", "lucide"]),
    }),
  ],
}
export default config