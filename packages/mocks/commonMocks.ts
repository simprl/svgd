import { join } from "path";
import { readFileSync } from "fs";
import { getESMPath } from "codools";

export const inputDir = getESMPath(import.meta, './inputIcons');
export const outputDir = getESMPath(import.meta, './outputIcons');
export const outputDirColors = getESMPath(import.meta, './outputIconsColors');

export interface PathAttributes {
  d: string;
  opacity?: string;
  "fill-opacity"?: string;
  "stroke-opacity"?: string;
  stroke?: string;
  fill?: string;
  "stroke-width"?: string;
  "fill-rule"?: string;
}

export interface Mock {
  title: string;
  svgFile?: string;
  svgInput?: string;
  svgOutput?: string;
  pathD: string;
  attributes: PathAttributes[];
  isThrow?: boolean;
  pngBase64: string;
  config?: {
    colors: boolean;
  };
}

export const mocks: Mock[] = [
  {
    title: "Empty svg",
    svgInput: "",
    svgOutput: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"></svg>`,
    pathD: "",
    "attributes": [
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAIDODUBAAAENBzWNAAAAAElFTkSuQmCC",
  },
  {
    title: "Material UI icon with size 20",
    svgFile: "subdir1/icon1_20px.svg",
    pathD: "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z",
    attributes: [
      {
        "d": "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z"
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjklEQVR4nO2azUtUURTAfyakLaplZatKhDZuso9NHyS2j0ErErRaGkpQ0L9RVBBFtUgwgkTBsL1YQpna2ooyyjQjNxWNGhfOwOUw08y89+59z7g/uDC8eXO+3r3nnXPvQCAQCAQCgUDAGw3AEaAd6JbRLtd28B+yE+gDhoHvwFqZsQQMAb0SrHXLCWAUyFfgdKmRFxltrCMOARNlHPsFzALTMmbl2r9+8wI4QIbZBNwCVooYvwjcAc4Au4ANRX5vru2We8y934rIMbJviK5M0QTMFDH4pSS4jRFk1gEdwKsicqeARjLCfuCrMvADkEtQhwninNIxD7SQAeeXlWH9wGYHurYAA0rXcppBaFJPfhW45EHvZdFlzwTvy2GTWvPGoHMe9Z9XQTA5od6jfm6qqejjyWuuKBuu+1z3K5Zisy7T4qF6RR70oXRCZXsXCa+axPjRsmfcR3m7Zo04r7pO4LYM8zkqHcqmVhzyTBU5cbhtyTKfo1IDTFqynuKwq8tbikxxkoUA6FmQd9VW96naPkp56yoAddJGF+RdxAHDlgLTrJChABjuWfIGSZgaFWHTsWUtAGcteaaTTJQGlWlN25q1ADQqG7eTIMcswT9L9PNpB6BWbaqYPcbEyFmC3yYkM+kAGN5bMk+SIN2WYNMEZTUAbyyZXaQcgL3A5zL7fJUM03I3px2AXMQlYAxfiOH8QhXOO10CR2MkwahBqNZ5nQQPk6HXYHOVQajWeeevQRIohCoNQhTnkY7SLtUTZ8hScDeijHJBiOq84b4l5wkO6E2oGSoVhDjO62aoBwc0qHbYtKAkFIQ4zhtOWbL+uFj/BUYtRa+kSYobhLjOGxteW3aN4JA2NW3jboo0x3TecFrZdBzHPLeUzcnGZFpsBT5Z9oz5UNqitsUfkR79lh0rPo/Pb6hpZ46rfHNV2XDN99HYtKV8VY6rfHFBHY1N+j4aK5Se8yoI5rjKx5O3nf8C7CElWoocjw84Sowm4T1Wun4A+0iZFjUTCm+H9ph1QoEaedXZ2b7w5FN33l4OU0XK20mpGE2pWi11UuG9LiE3tWlfino5oi72J6klaVY6xXDTu2tq5TtzzwNV2xdGXrK994RX7fH5eJmW95fsLM3IeAf8LvObsSxN+UpolYPKuH+UHPFR3rpkh5zVDZb4758ei3Jvj8uuLk22yX5dTnZuu+TzYfkuEAgEAoFAIIAH/gJh6BsMxvEViwAAAABJRU5ErkJggg==",
  },
  {
    title: "Material UI icon with size 24",
    svgFile: "subdir1/icon1_24px.svg",
    pathD: "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z",
    "attributes": [
      {
        "d": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEL0lEQVR4nO2aSWsVQRDHfyQH9WJEEwOiXjVePZicXOKHcD2Kcbm44skNEY16UEiIZxUxCK4nNepncAVRUOMGLpBEcEGMlNSD8OiaeTPdPW8C84eCMEn+VV3dXV1V3VChQoUKFQpBJ9ALbAdOAueBSyry8wlgm/6N/O20RwuwFhgEngGTGUX+Z0AdIlzTBu3AUWA0x6AteQscVu7SYg5wGvgecOD1MgGcAtooGTYDnyIOvF4+ApsoyaxfzWj8D+AxcBe4rnJXv/3MyDXczNWwDHjVgJG/gGvAVmBJSkCT3y3V0+C6/m8a/0ugi4LRDXxNMewdsBuY66FnHrAHeJ+i64vaVAh6UgLdGLALmBFQp3Dt1SBo6RWbVlDAsv+aYMQdYEFE/QuBkZSV0BUz4L0yFP8FjhSUsLQCx1JiwuwYiq8aCv8AWygeW1W3y6YrMc75SWPmmzH4qU6wVsKGkEv/k6FEln2zcSwhWQqSI5xJCHhlKFIkJtw3bOz3JW83jryxyNE+KxYZR+SE5hK5cdTwrJzzPtitaexUkW8+2G/YeigvYYuWofWEowGSnGEHr3zzwUwjY3yTd6uujTT7sRyAZosum1fnIRt0EP3y3VORHSAx67eD+1wesucOIqnqKLEDBLcc3E+yknQaS0kSj7I7YIeRsM3PQtJrOEDq+bI7YFmIOLDD6ORI0lF2B7SqrfX8fVlI+h0EjwiHmA5A93w9v9xFNIwhB8G9aeSABw5+OdUaxkUHgfToposDbjj4LxTpgOXANyMY5ZGxjD0/bwcMBdgCoZyQdfBBtkB/oCDYowPwGbxwhAiCcvnaMLYHPAbzroQ8M4/a+NM3ies1jJJLCwpYCXlnPlgi1Knpo1cykdMJPoMX7HRwylg6shI98zwJ8jjBd/CC2w5euXfMjAGjHG6P5IQQg+8wyuGzech6jVmSuzoCOyHE4AX7DJtXhmyJfdT2ky9qp0PeaN9oS+y1T/f6iOFRaT2FQE+gmRccCN0URdtfrnbzuF5UlgWLjfb9uOf1/H+cMjw7ErA/4AOx4aFhY6bsz0Kb7nuXArmWajZOGLZ9CHlLvDHh7A7VJ8yDvgS71oVWNmwo+tMkJ/QlXI9fjqGwTR8fTCZshyJiQmvCshd5EeuBBPr85EuC8vt6URkz2lsBT+RzwM61ie6UR1ITelEZIlmqYZae82l6oz+SqmFFykqoReG9nrVDh6a31ik0deYLG/zU7ZAUE2oixclNvWvoSokTrVrP79SqzlXYuPZ89GVvYbY+SJrMINKteaqJ1A2VEf3WyMvQ+mgfLeBlzRPSlmlIkaJnPSVDmzZTk15z+sq4HoGlmPWkAuqQvswINXApaQ+GKGyKRAuwSh8nuNrUSfJX21hntZlRhtdo3pAjbY2msMf18uWiypB+69PubeYGZoUKFSpUIDv+AUsrytQsHiz+AAAAAElFTkSuQmCC",
  },
  {
    title: "Transparent Material UI icon",
    svgFile: "subdir1/subdir2/icon5_24px.svg",
    pathD: "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z",
    "attributes": [
      {
        "opacity": ".3",
        "d": "M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z",
      },
      {
        "opacity": "1",
        "d": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z",
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELUlEQVR4nO1b3UpUURT+8AGcKMtHCHsB7aofvTyDXSRlpd5Emr1D5oiho10YKXadEYlX3mjdZFpPkClEQn+WoAZqkIY4sWENyGGvfc7+OzMHzgcLZJhZe621115/ewtkyJAhQ4ZEUA+gGUAvgGEATwE8JxJ/DwG4S98R3009agC0AJgAsAKgpEniN+NkEMErNagDUADw3UBpjr4BeEC8qxYnAIwC+ONQ8TDtARgBkEOVoQPAhkfFw/QLwC1Uya7PaAr/F8BHAAsA5ogW6LN9TV7TlfSGcwDWYgh5QEoWyFOCCOoEMEC/OYjB/zOAhqSVbwKwHSHYOqW7qzGU5kj8tgjgZ8RaWyRTIjgfEeh2KKe3WigeplYyxJ5iXSFTYxJuv60QQpzlaw4VD1M7gMUIT2jwGfDWmIWPADzxqPhxylNxpYoJtT4MMMMseAigPyHlj1OB1pbJ9NK18h2Kna+E8seNwHnCDZeuv8EskpTbq2hCUSw5qREeMQu8qQLlyzFhiZFRZA4r1DEpb8dztNel60yKFJ+dsjFAgbHskKXAokCaDdGwJc9RRtY+U+VrqA0NM/zhoMiZlfCdteR5hakYv5rOE1o87b4vAwR05mUyXzIxwISE0YFlbe/bAG0A/kl4PzYxwKqE0ZwDIX0aQNBrCe9lXeXrGVcqpMAAg0zBdkbHAM2MATpSYIAuF3HgHjPJyafAAHmSNcy/R8cAReYcBSkwQMCM4UWdERuTEgZvU2SAdxL+IqvFxpTHDJCEAeYl/J8laYDbAH4zwciERO9xJ0kDTDo4Aq6MoKu8kyNQdBQEu0kBG+W7HQVBUcLHRq/DNGjqCSY7H5CMsgsWYUjrQqjTMCjpeoLpzjsrhOqpfAwzGTAUKqBCZMez8qpS+DQ0sWKZCUw8wVZ5rhn6AAOMM+1wm6WAnCe4UJ5rh8dMDNDM7FLRUkiZJ7hQPqC3AzKZL7gciW3Q+MlW2HJ2MI32cUdiX2ye2PR79IKyJ7jY+UAxvjceioJGyrJx8y5dVAZVQu3M+F7IeRKWGGEsu+hwPmBDQob3jIxa1R+HHF0zlZj6utIGkPUtJYoHzm6JbypydyUvRwcUconbIqeYZhY6dDgs1VWeux5/AQ/I0eODkuI4JBET8gq3F/TJ1wMJ0POTLcXiS+R6PqM9F/AEbQI4C89oingktUcXlS6KpTK1Up6PWtf7I6kyGiM8oUSZo2jZO7RRGo56hbqZpPLHj4MqJpRJNCevqE3tiogTefrOIHV1ssZGdua9uz2HWnqQVNKgfbp3XKTh5Tz9vRrzZWg42nsLeLp1Alcs+aB1CohVhVyM15y2tEvlbVXsuqqB6qOXGa4UFy3tfReNTZKoAXCRHicsayp8RGOsMRpmpOpfZjiIoeRlGok9pGpuimiSPuuh6a32ADNDhgwZMkAf/wEgejYxrLkGogAAAABJRU5ErkJggg==",
  },
  {
    title: "Additional attributes (remove colors)",
    svgFile: "test_icon.svg",
    pathD: "o.8 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 fc w.24 M2.4 2.4h7.2v7.2H2.4z fc w.48 M2.4 19.2h19.2 o1 m12 2.4 9.6 19.2H2.4z o1 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304",
    "attributes": [
      {
        "opacity": ".8",
        "d": "M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2",
      },
      {
        "d": "M2.4 2.4h7.2v7.2H2.4z",
        "fill-opacity": ".5",
        "opacity": ".8",
        "stroke": "currentColor",
        "stroke-opacity": ".3",
        "stroke-width": ".24",
      },
      {
        "stroke": "currentColor",
        "stroke-width": ".48",
        "d": "M2.4 19.2h19.2",
      },
      {
        "d": "m12 2.4 9.6 19.2H2.4z",
        "opacity": "1",
      },
      {
        "d": "M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304",
        "opacity": "1",
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbElEQVR4nO2ay2vUQADGfz7oxT+gRetJ6V/hxbbrg549BEHqxZViQZG2B0FR8WSRio9i7cVbcXsQFEGUorKthS3C6kH0UBQ97KWiBxGVWhmYQIzJZjIzSaY1H3yw7IbdfI/MzE4CJUqUKPEvtgF7gMPAAWAn/wk2AWeAz8BagKvAPaCLDY6LIeFhfgKOAF5KDgAdQA9Qkd8xDFyQHJbvVeQx4thC8DHBAMHLwDFFjgF3gCfAArAUYksy/P48MAkcBXbkacCjBPG/gNEE0VVgAqgD7yWXI0Q25aW1Kl8vxbABTAP9wOasDegCXsWI/wncTBAvhL8MCG9nQCvw3VEtiOKsNCJTbAEOAY+B18Ci/OHTCVV/GiE8zgA//eAg264FYV4DurM2wlO8zq8Ab9uIjzIgmH7aFvh8Duwv0oAqUEsQHmVAOH3dFvg8KafvXA04DjxUFB82ICp93Rb4FNP31rwMqAL3U4gPGhCXvmkLBC/ZniW8GANUax9lQLv0TVvgXw6ZGjChId43ICl9Gy0QPJiVAWPAOwMDVNK30YJntqZIL2TAnKZ4wQ+K6dtqwXXbBkwYiBf8kkK8jRYI9toyoBqzvFWl+IP1W8MA0xbMms4KnqX0v2qIt9WCPhsG1AtI31YLpkwNGC0wfRstaJjsJ3hyM6Oo9G21YFDXgAG5k7OsSZ2RP4sW3NA1oCNmG0uFqqu+PFowr7vH2GPgeppVXx4t2K1jwD5H0rfRAq3pcNCh9E1bILbcU+OEQ+mbtmBIx4BRx9I3acFIHgY0M07fpAUjeVwCrRzE67ZgKOtBsJlT+rot0BoEK46mr9OC3iwXQs2c09dpwS4dAzrkMtLF9NO0oG5yu33S0fTTtED7zxDy/ryr6au2QGsA9LFdbiq4mL5KCxpSgxGmHU4/qQVGW2LtpkNX0k9qgfHWOHJr+a7D6ce1oGbzZmm/w+nHtWAvlnHV4fTDLRCP0FhHN/DC0fSDLViwMfLHoeaAyCSKW2KZoBP45oDAJH7PqgHjDohTpThXY/QBpyTPAj8cEKZK8UTrucD5a+0KnwfeSK44ICotVwLnL7Rs+Gt/LauxYNwBMYWNBZ3rNH1rLRh3QERhLehc5+kbt6AC3LLI28AM8EA+cleXj+Ivytdz8rMZeazN3xZaSpQoUaJECf7GH/czc/vKaIZfAAAAAElFTkSuQmCC",
  },
  {
    title: "Additional attributes (with colors)",
    svgFile: "test_icon.svg",
    config: { colors: true },
    pathD: "o.8 F#0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 f#f0f F#00f w.24 M2.4 2.4h7.2v7.2H2.4z f#f0f w.48 M2.4 19.2h19.2 F#ff0 m12 2.4 9.6 19.2H2.4z F#f90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304",
    "attributes": [
      {
        "opacity": ".8",
        "fill": "#0f0",
        "d": "M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2",
      },
      {
        "d": "M2.4 2.4h7.2v7.2H2.4z",
        "fill": "#00f",
        "fill-opacity": ".5",
        "opacity": ".8",
        "stroke": "#f0f",
        "stroke-opacity": ".3",
        "stroke-width": ".24",
      },
      {
        "stroke": "#f0f",
        "stroke-width": ".48",
        "d": "M2.4 19.2h19.2",
      },
      {
        "fill": "#ff0",
        "d": "m12 2.4 9.6 19.2H2.4z",
      },
      {
        "fill": "#f90",
        "d": "M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304",
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAET0lEQVR4nO2aT2gUVxzHv66LF5Ee658VUUMPoqLgwYMXk0bbePLQg4jBXrJBlFXUbNGg1VQjrVrFGDMqSPRQMSkUGiqiiH8SFf8mVVBjKUo86MGiB7XdbPqVt8nUdTo7vnnzZvdF5wdfWDYLme/3+5k3s28WiCaaaKJxDI9iNC3M40EsZQu+4H5MxMcwJEbQwkZa+IsWmKcBWviFTRiLD3loocFh/B29+vGTx/VjnlanwCV+dARcBGIUiM9AVIKoBrFqBrFVSLweeq9y6DOjShNAC/q8AhBaU7HrB4A1UirrTWNZa+uc7d+cAXEJxPV8WcQTIef7ILpAHADxNYgJxQvAwikv89kDsf65Uy7VeZqOZZOo6tiDDd914vt1D4Wmt9T86TSZIHpeEQN/EwOTiB6XEGxdA3EYxOcgYuEG0ISxtPC7m/lMczyzY3G62dO8MP7tppu2ca8ARPMkKFSAAje154IINYQTGEkLX/XVzz79oGHq7Z76GVd+Ti5un5noXuuJerrxnNN4oQDs9u0AJChwah+IRKhBpMAlUuf5wpO70Zi+X8i8WwD57StQYOsCiIWlCyCWTaKmpc3LuFsAzvYDUGBrNYgRxQ0gnqnF6t2/yZh3BuDWfgAKbDWAiBcngFg2iVV7f5U1nx9AofY1UCC0TetVIlUoAEns3QLwal8DBYOnQ6gBVHXs8WveDuB97WuiQOjLcAIo602jMd2rGoBM+5ooOK/lEplyBlC346yKeaH5x5Y+kmlfIwVNegOoUkPf1k93pj2XNa+JAqFyPQHEskm321tZjWuu7XudGfmv3wA0UNAe6KqQsgMI2H7TzVkv/JrXSEFF8AA2vP1Wp9L+y0zcd/saKTgYLIApf9SVqn1NFFxT3k9IiQCWtbaWqn2NFCxXCuAIuEjs5IhruIpUVv6QKNivFAAG9/D+t40lI9m7viJR0KW2x8jc5qRS6n7u+opEQZlKAAtMaF8TBQqXQ2K5Ke1roKBaJYCVprSvgYIVKgHUmdR+QArWhx5AIuT2A1KwPvRTwCpC+wEoWBHqIpgoUvsBKFBaBCtNbF+RgvLQboQSRW5fkYKpqrfCXSa275OCTvXH7cw9ojaufZ8UKH4ZEjP4fN7I9n1QoLAA2kOMH9pUMK59SQrEsY9HoGHuxwlGti9BgfqWmNfl0JT2JSgo1xFADMQJU9v3oKBN38NS5n6fY2T7HhTM12PeHmKvqe27ULAP2odITCQum9h+PgWTB/cxA678BaabaCu1yffplngkFsaQ+JTEy1IblNBrhkEAiZ0GmJPVzuCGwQqCa3Ka2b2Jmfg/BhiTUybezzlXN/93/KD/XWGCWwjezam59lnJTfmVOGb7+MEtH8O5z1DWAg6vc1/vWsDh274eCji82w9GAYd/+8EoIFFJwtKlfuLQE+L4PaLjBnH2MtF5kbgiJF6L98TfxGfEZ3X+b+FFiYJoookmmmjwYc8b8pS8jlER8GoAAAAASUVORK5CYII=",
  },
  {
    title: "Fill None (remove colors)",
    svgFile: "fill-none.svg",
    pathD: "M12 20.5a8.5 8.5 0 0 1 0-17Z fc Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z",
    "attributes": [
      {
        "d": "M12 20.5a8.5 8.5 0 0 1 0-17Z",
      },
      {
        "d": "M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z",
        "fill": "none",
        "stroke": "currentColor",
        "stroke-width": ".5",
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2az0uUQRjHP7WRnbIuJUW36lIqWV5jITINkf6JKAz78QdU14hOleStyMpMvFZegqg0UkgrtcxfFxMqM6FMPbgx8BVEVNbdmfd9B+cDyy7L7LMz33fmmWeeZyAQCAQCgUDALSmgHKgD6oFnQBfwWa8ufVevNkf0G69JAVXAI+A3kNH7F6AHeK/3y8A14C7wCviptpPAQ6DSNzG2ALXACDAPDAB9wLQGtvS1lA3AAeAC8Fo2hoGzQAEJ5xQwCszo6a406NUEWMpeLY1/ErWGBLIdaNXT+gjMZTHwbAVYYBfwQP/RAhSSEA7pyXwHvq1h4GsVYIFjwBgwBJQSM2lgSp58NofB5yKAYQfwQk7V9CEW0lqXPTkOPB8BkEN8oj6k45j2U0BvnoPPRwDDRolgZkIJETq8EU37TMwCLMwEsxwGo3KMrXJ4swkRwLBTDriZCPb5+Ry9vUsBDMdlrxqHEd6o9vlMAgVAYfewq4ixVhHeXIIF2K0+nrFsl01yfPluea4FMNxRkGT1AFWltT/tgQD71NcK22vrq4PBuxDA0A402jKWUqDR55EAF4FfCpTyplwd/euRAMWyXWbD2HllZzIeCWCSKhPAORvG6pXG8kkAwxvgpg1DbUC3hwKYHONzG4Y6PRXgBvDWhqF+RwGQawGuaufKm/71LkDnel8CbR47QVNtsrINDngoQLutbbBuUWlrXQZC5eroH48EKLEZCqcUCvd6JMAlzQArhyFUpfXpONwB3LdpsNKjhMh+2TVJUmukPEqJNbhIiaH6/IzFeoALAfaoj6dxlBYfSXhavFlPfzOOqJEvGEugACdk7ySOaUlgaawIGAeaiIBtmmZJKo6+1Da9lYgoVXichPJ4iwI1kwiN5YLEh5gEKNDgTWxylJhIL7r7F+UVmSJN+8k4B7/44GEuJ/zIcXfIxduPa80fJCEUag/OKE6YcSCACXIe6zdNUTq8tVCt+vyswuZsqknZxPYNEnUwin0+XwpUnx/WAM1U/bRKPmG5ZEaxjrQdajOk8NZZhOeClErUjSpUZnSzbEA5xm7NkivAdeCeqjkLbSd0pK3w7bL0Svv1YaWobgNPgXdKuffrs/nultqU2UxmBAKBQCAQCLAM/wHmwNLJpQ3dxwAAAABJRU5ErkJggg==",
  },
  {
    title: "Fill None (with colors)",
    svgFile: "fill-none.svg",
    config: { colors: true },
    pathD: "M12 20.5a8.5 8.5 0 0 1 0-17Z f#000 Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z",
    "attributes": [
      {
        "d": "M12 20.5a8.5 8.5 0 0 1 0-17Z",
      },
      {
        "d": "M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z",
        "fill": "none",
        "stroke": "#000",
        "stroke-width": ".5",
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2az0uUQRjHP7WRnbIuJUW36lIqWV5jITINkf6JKAz78QdU14hOleStyMpMvFZegqg0UkgrtcxfFxMqM6FMPbgx8BVEVNbdmfd9B+cDyy7L7LMz33fmmWeeZyAQCAQCgUDALSmgHKgD6oFnQBfwWa8ufVevNkf0G69JAVXAI+A3kNH7F6AHeK/3y8A14C7wCviptpPAQ6DSNzG2ALXACDAPDAB9wLQGtvS1lA3AAeAC8Fo2hoGzQAEJ5xQwCszo6a406NUEWMpeLY1/ErWGBLIdaNXT+gjMZTHwbAVYYBfwQP/RAhSSEA7pyXwHvq1h4GsVYIFjwBgwBJQSM2lgSp58NofB5yKAYQfwQk7V9CEW0lqXPTkOPB8BkEN8oj6k45j2U0BvnoPPRwDDRolgZkIJETq8EU37TMwCLMwEsxwGo3KMrXJ4swkRwLBTDriZCPb5+Ry9vUsBDMdlrxqHEd6o9vlMAgVAYfewq4ixVhHeXIIF2K0+nrFsl01yfPluea4FMNxRkGT1AFWltT/tgQD71NcK22vrq4PBuxDA0A402jKWUqDR55EAF4FfCpTyplwd/euRAMWyXWbD2HllZzIeCWCSKhPAORvG6pXG8kkAwxvgpg1DbUC3hwKYHONzG4Y6PRXgBvDWhqF+RwGQawGuaufKm/71LkDnel8CbR47QVNtsrINDngoQLutbbBuUWlrXQZC5eroH48EKLEZCqcUCvd6JMAlzQArhyFUpfXpONwB3LdpsNKjhMh+2TVJUmukPEqJNbhIiaH6/IzFeoALAfaoj6dxlBYfSXhavFlPfzOOqJEvGEugACdk7ySOaUlgaawIGAeaiIBtmmZJKo6+1Da9lYgoVXichPJ4iwI1kwiN5YLEh5gEKNDgTWxylJhIL7r7F+UVmSJN+8k4B7/44GEuJ/zIcXfIxduPa80fJCEUag/OKE6YcSCACXIe6zdNUTq8tVCt+vyswuZsqknZxPYNEnUwin0+XwpUnx/WAM1U/bRKPmG5ZEaxjrQdajOk8NZZhOeClErUjSpUZnSzbEA5xm7NkivAdeCeqjkLbSd0pK3w7bL0Svv1YaWobgNPgXdKuffrs/nultqU2UxmBAKBQCAQCLAM/wHmwNLJpQ3dxwAAAABJRU5ErkJggg==",
  },
  {
    title: "Fill Rule Even Odd (remove colors)",
    svgFile: "rule-even-odd.svg",
    pathD: "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94",
    "attributes": [
      {
        "d": "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2",
      },
      {
        "d": "M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94",
        "fill-rule": "evenodd",
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD00lEQVR4nO2aR2gWQRSAP2Psjdh7BUWI4MF6UVSwK3qwk4M38aASokHFBioKehEPSiKC7Wb3IjbUiNgOEURQRFQ0KnbBlsTIwFsYht3Nv9nZ9YedDx6BzMxr2WlvAg6Hw+FwOBwOh8ORPr1FMkd/oApoELkJ9CNDVGnBe3KDjNDHJ3hPepEBemY9AcicN4O/ToboJ3NeD74vGWQtUEZGaQ48AZ4BhWSQpdoUWELGaAY81BLwCCggz5gNbASGJqB7rs8uMCcBO8MkhllRB5Zojn0Gult27JZPAu5YttED+KLpXxZl8CHDuWkWHZsSchCabNHOdEO3iiln5gF/ZWANUGTRscshCbhk0U5n4K3o/SsxRWIcsAJYZNGpMSHBe6L62GKRxDA+jpISYJclh87kkIDTlmyVi++xaQG8AvbH3KqGA/U5JEB9rsUxt9i9wBugJZbYIM4diXFqO5ZD8J4cjXG6rBAdavuzRjfgjyg+IV9FFAYDtRESUCtjotBCfGsQX21v3ZzTHLwAtIkw9mCE4D05EEG/+tRPamPPkwALDAevAR1yLID8bEICfkn1qDHaAheNsYtJgNZyKtQN3ZX9Noy9TQjekz2N6O7kU1/8JklJhEofJx8AXQP6dwG+x0jAd9HhR1exbY5RC3VizA9w9HHA57otRvCebA2YVvptUpeFSSagvcxNP8PPgSFa33bABwsJ+GisNQOApwF963KYkrG5EuLsG+0Qs85C8J6o0pl3vX0Z0k/dMhOnrBFn1QVkrFyibCWgRnR6l5sg2ZRGAsbm4HCdxeCj6JyYRgJahawD/1PqczyXWOFOHgRsitoVUmNfHgTcEKfiE5dVeRCwKaVpJmB1wBw8n0KgVwNOl8qn1Fjj48AOWSCrjd//BlYCU+UWqd4EZ0q15qvR97gUYHcHBP9OrrkrfNqUT6lRahivkEoMciR+rrUd1sYVGtfoHcYhqiCkeFqn1feb+ZTXUp0CZZrhkz6lsiHazfFsiB6veqPkhRxzFR2B21plWv1cboxtI1dyb3yqj6zrNMODAvps15z3e5kZLdND9VkfoGOO9nSmplfYG4PyKTW2aoYHap+lNw3Mz/sHMElrGymXHK896PmtQCumnJKan0exoWMLKXJQM1wtC9ABeXzYLH99swqkVu4R8s8R7422SlncRsnr0Ay575cHFEiKpFLd1BKa1fpgg8hO+au8C9nCqht5GfoiBdjHAe1qq50gVWOzLWytsc69hPb4T8B92RGC+gTVGFR5LjVeJ5SAOKKmRCoURKzxpyW1+fhPFg6Hw+FwOMhb/gG+OGYZB8DSVwAAAABJRU5ErkJggg==",
  },
  {
    title: "Fill Rule Even Odd (with colors)",
    svgFile: "rule-even-odd.svg",
    config: { colors: true },
    pathD: "F#f4f6f8 M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 F#f4f6f8 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94",
    "attributes": [
      {
        "d": "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2",
        "fill": "#f4f6f8",
      },
      {
        "d": "M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94",
        "fill": "#f4f6f8",
        "fill-rule": "evenodd",
      }
    ],
    pngBase64: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBElEQVR4nO1aSahcRRStOMVZnMc4giJEcKFRN4oKzoounMnCnbjQEJKIBjWCioJuxIWSBCEOuzhvxAk1QeKw+AERFBEVv/kav919x+6f/Cv3d7/u193v9fi687HfgaKh+9Wte8+runXrVIeQI0eOHDly5MiRI0eOHGMGEZ3iLUwamPl0JN2GrLbQSL9k5mVhUoDx4BskfBEmAUR0alvwUUM8OfzfgYgnTTQBDl/zCUvg8zApYOZlvubjwRPRaWHSgMhrEXlNmESY2f5I8iOQ/mxmB4RJA3D5nmgJAJfvDpMEM1uCLDsbOUC+N7P9wmICot6ErOuLqudmbZtIb2ndBYj05qzHKaqe5zEg6o19dUTmlQ3n5F8AOCFLx4B0eysBwLIj0zEATkSWQsM+39uPg5ubCxS5NjPHRK5OK4RA5KqsxkGU65psk27uuTOR3gok81Xm9M9CwY7OzDHSj1MrQdKPshqnULBjkHVXNXiZ95j6MkBElxLJ/cB8Z1ZOEVVWpAZfzwWVFVmN5757DMx82cBGkHklkDybjUPyTjcCgOXtLMZC1ofd96ENmdmBwPo7sr40zFZVUj0fSPZ2JYBkHqC8fAh/lyDJC8A6bWYHhSyArI/WEsmWQas2JHm9W/CxXPDaoNUlsG6s2VkfskKpVDoeSCq1ouVNnxX99BeRs4FkrlcC/Fnv088Y7pP7VutfyXrrDsDyXmydfmBmh/TeV1/p+e3Xx9CXe7XvUx1Ztsb8e3/gQNMAXL69ZZp+9rfZEaEHAQRIpG8CSNTVo272zexQIP2wmbzyXSFrmNnBXhW2ZOyvfb/t1M8TUr/BN0iW5zvZnp21o9r0RZKSkxJGASDdlLBtfVcqlY5Ler5YLB6LJDAEAeA2kmz7mD52+8zRLWFUINLbUhz9IWm6AsmTAwffWAobknXF2GmyefrfMTICZswO97WZ7Kj+UhA5J3rWzA5D1t3DEoAs/8RzDTOfgaQ/pZC1p9uSHBpI+kmHzD0dFTHIum744OttbXS8BdLf0meLbh9p8A5kXdPF2V1EdIkforIiwG25zehw06E9FkYNqjrSbd3uyfDt92yzxHzFyAkws6VpeWBfNj9n9FKXZAJg2bGvA25vsjOMC8j64uKbAX0oPsMCSB9cdASwrh4nAQ8lrUE/hIw8WNJPk6pL92mcBKxKIOBpT5DIMtXyfblE8gCKXOOnyIU7QdQbFpRnkmJzcPKGC7BA8lwKATN+zHWZK4GAVeMjgHV1y/Tb6EqM/+YlsVeFMcdejfq5mBI/RjtpMRvTccWpVTxd2AZr+r6P1SqvjXUJYFMxJFtbpTIviaOTI7C8m2Ynpt44Ub96mevf7zY7Eli/qivT/ilyX7yvE+lH8hgJ47tkxViZKyJnJT0DJE/VnU+4mSGqXOzLo2bnkSQbflsUuzpb2uWOYV0YF4BkQ4yAM6NpGS2DtulNwiByZfQbYvlCP+REv6ddv/nMisQUYHnLNb+6fSgvj9tA1idGH3mixCVTnoBcwvLLB2R93N9+mwpEAgDlCxb+HMH6V0sC21RNbpWL/HYIUa/3835V2m4XSPyipqZUDyShZaoPYuMtP1N9KzqTvo3JVMebIZaCC7CuLyTu9SR7S8yXu2rcXgek55pREPDNaPZ5mQWWb31H6PBcosbg8twYCdA/RkPA4M2XxFiCt2pimlt0BJDMLbo/WeTIkSNHjhw5wmLGf26RJBRR+0nMAAAAAElFTkSuQmCC",
  },
];

export const commonMocks = mocks.map((mock) => ({
  ...mock,
  svgInput: mock.svgInput ?? (mock.svgFile ? readFileSync(join(inputDir, mock.svgFile), 'utf-8').trim() : ""),
  svgOutput: mock.svgOutput ?? (mock.svgFile ? readFileSync(join(mock.config?.colors ? outputDirColors: outputDir, mock.svgFile), 'utf-8').trim() : "")
}))
