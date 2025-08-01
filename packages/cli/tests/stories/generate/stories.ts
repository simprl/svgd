import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";
import { CLIOptions } from "@svgd/cli";
import { inputDir } from "@svgd/mocks";
import { join } from "path";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const jsContent = `/**
 * @filepath fill-none.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2az0uUQRjHP7WRnbIuJUW36lIqWV5jITINkf6JKAz78QdU14hOleStyMpMvFZegqg0UkgrtcxfFxMqM6FMPbgx8BVEVNbdmfd9B+cDyy7L7LMz33fmmWeeZyAQCAQCgUDALSmgHKgD6oFnQBfwWa8ufVevNkf0G69JAVXAI+A3kNH7F6AHeK/3y8A14C7wCviptpPAQ6DSNzG2ALXACDAPDAB9wLQGtvS1lA3AAeAC8Fo2hoGzQAEJ5xQwCszo6a406NUEWMpeLY1/ErWGBLIdaNXT+gjMZTHwbAVYYBfwQP/RAhSSEA7pyXwHvq1h4GsVYIFjwBgwBJQSM2lgSp58NofB5yKAYQfwQk7V9CEW0lqXPTkOPB8BkEN8oj6k45j2U0BvnoPPRwDDRolgZkIJETq8EU37TMwCLMwEsxwGo3KMrXJ4swkRwLBTDriZCPb5+Ry9vUsBDMdlrxqHEd6o9vlMAgVAYfewq4ixVhHeXIIF2K0+nrFsl01yfPluea4FMNxRkGT1AFWltT/tgQD71NcK22vrq4PBuxDA0A402jKWUqDR55EAF4FfCpTyplwd/euRAMWyXWbD2HllZzIeCWCSKhPAORvG6pXG8kkAwxvgpg1DbUC3hwKYHONzG4Y6PRXgBvDWhqF+RwGQawGuaufKm/71LkDnel8CbR47QVNtsrINDngoQLutbbBuUWlrXQZC5eroH48EKLEZCqcUCvd6JMAlzQArhyFUpfXpONwB3LdpsNKjhMh+2TVJUmukPEqJNbhIiaH6/IzFeoALAfaoj6dxlBYfSXhavFlPfzOOqJEvGEugACdk7ySOaUlgaawIGAeaiIBtmmZJKo6+1Da9lYgoVXichPJ4iwI1kwiN5YLEh5gEKNDgTWxylJhIL7r7F+UVmSJN+8k4B7/44GEuJ/zIcXfIxduPa80fJCEUag/OKE6YcSCACXIe6zdNUTq8tVCt+vyswuZsqknZxPYNEnUwin0+XwpUnx/WAM1U/bRKPmG5ZEaxjrQdajOk8NZZhOeClErUjSpUZnSzbEA5xm7NkivAdeCeqjkLbSd0pK3w7bL0Svv1YaWobgNPgXdKuffrs/nultqU2UxmBAKBQCAQCLAM/wHmwNLJpQ3dxwAAAABJRU5ErkJggg==)
 */
export const fillNone = "M12 20.5a8.5 8.5 0 0 1 0-17Z f#000 Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z";

/**
 * @filepath rule-even-odd.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBElEQVR4nO1aSahcRRStOMVZnMc4giJEcKFRN4oKzoounMnCnbjQEJKIBjWCioJuxIWSBCEOuzhvxAk1QeKw+AERFBEVv/kav919x+6f/Cv3d7/u193v9fi687HfgaKh+9Wte8+runXrVIeQI0eOHDly5MiRI0eOHGMGEZ3iLUwamPl0JN2GrLbQSL9k5mVhUoDx4BskfBEmAUR0alvwUUM8OfzfgYgnTTQBDl/zCUvg8zApYOZlvubjwRPRaWHSgMhrEXlNmESY2f5I8iOQ/mxmB4RJA3D5nmgJAJfvDpMEM1uCLDsbOUC+N7P9wmICot6ErOuLqudmbZtIb2ndBYj05qzHKaqe5zEg6o19dUTmlQ3n5F8AOCFLx4B0eysBwLIj0zEATkSWQsM+39uPg5ubCxS5NjPHRK5OK4RA5KqsxkGU65psk27uuTOR3gok81Xm9M9CwY7OzDHSj1MrQdKPshqnULBjkHVXNXiZ95j6MkBElxLJ/cB8Z1ZOEVVWpAZfzwWVFVmN5757DMx82cBGkHklkDybjUPyTjcCgOXtLMZC1ofd96ENmdmBwPo7sr40zFZVUj0fSPZ2JYBkHqC8fAh/lyDJC8A6bWYHhSyArI/WEsmWQas2JHm9W/CxXPDaoNUlsG6s2VkfskKpVDoeSCq1ouVNnxX99BeRs4FkrlcC/Fnv088Y7pP7VutfyXrrDsDyXmydfmBmh/TeV1/p+e3Xx9CXe7XvUx1Ztsb8e3/gQNMAXL69ZZp+9rfZEaEHAQRIpG8CSNTVo272zexQIP2wmbzyXSFrmNnBXhW2ZOyvfb/t1M8TUr/BN0iW5zvZnp21o9r0RZKSkxJGASDdlLBtfVcqlY5Ler5YLB6LJDAEAeA2kmz7mD52+8zRLWFUINLbUhz9IWm6AsmTAwffWAobknXF2GmyefrfMTICZswO97WZ7Kj+UhA5J3rWzA5D1t3DEoAs/8RzDTOfgaQ/pZC1p9uSHBpI+kmHzD0dFTHIum744OttbXS8BdLf0meLbh9p8A5kXdPF2V1EdIkforIiwG25zehw06E9FkYNqjrSbd3uyfDt92yzxHzFyAkws6VpeWBfNj9n9FKXZAJg2bGvA25vsjOMC8j64uKbAX0oPsMCSB9cdASwrh4nAQ8lrUE/hIw8WNJPk6pL92mcBKxKIOBpT5DIMtXyfblE8gCKXOOnyIU7QdQbFpRnkmJzcPKGC7BA8lwKATN+zHWZK4GAVeMjgHV1y/Tb6EqM/+YlsVeFMcdejfq5mBI/RjtpMRvTccWpVTxd2AZr+r6P1SqvjXUJYFMxJFtbpTIviaOTI7C8m2Ynpt44Ub96mevf7zY7Eli/qivT/ilyX7yvE+lH8hgJ47tkxViZKyJnJT0DJE/VnU+4mSGqXOzLo2bnkSQbflsUuzpb2uWOYV0YF4BkQ4yAM6NpGS2DtulNwiByZfQbYvlCP+REv6ddv/nMisQUYHnLNb+6fSgvj9tA1idGH3mixCVTnoBcwvLLB2R93N9+mwpEAgDlCxb+HMH6V0sC21RNbpWL/HYIUa/3835V2m4XSPyipqZUDyShZaoPYuMtP1N9KzqTvo3JVMebIZaCC7CuLyTu9SR7S8yXu2rcXgek55pREPDNaPZ5mQWWb31H6PBcosbg8twYCdA/RkPA4M2XxFiCt2pimlt0BJDMLbo/WeTIkSNHjhw5wmLGf26RJBRR+0nMAAAAAElFTkSuQmCC)
 */
export const ruleEvenOdd = "F#f4f6f8 M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 F#f4f6f8 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94";

/**
 * @filepath subdir1/icon1_20px.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjklEQVR4nO2azUtUURTAfyakLaplZatKhDZuso9NHyS2j0ErErRaGkpQ0L9RVBBFtUgwgkTBsL1YQpna2ooyyjQjNxWNGhfOwOUw08y89+59z7g/uDC8eXO+3r3nnXPvQCAQCAQCgUDAGw3AEaAd6JbRLtd28B+yE+gDhoHvwFqZsQQMAb0SrHXLCWAUyFfgdKmRFxltrCMOARNlHPsFzALTMmbl2r9+8wI4QIbZBNwCVooYvwjcAc4Au4ANRX5vru2We8y934rIMbJviK5M0QTMFDH4pSS4jRFk1gEdwKsicqeARjLCfuCrMvADkEtQhwninNIxD7SQAeeXlWH9wGYHurYAA0rXcppBaFJPfhW45EHvZdFlzwTvy2GTWvPGoHMe9Z9XQTA5od6jfm6qqejjyWuuKBuu+1z3K5Zisy7T4qF6RR70oXRCZXsXCa+axPjRsmfcR3m7Zo04r7pO4LYM8zkqHcqmVhzyTBU5cbhtyTKfo1IDTFqynuKwq8tbikxxkoUA6FmQd9VW96naPkp56yoAddJGF+RdxAHDlgLTrJChABjuWfIGSZgaFWHTsWUtAGcteaaTTJQGlWlN25q1ADQqG7eTIMcswT9L9PNpB6BWbaqYPcbEyFmC3yYkM+kAGN5bMk+SIN2WYNMEZTUAbyyZXaQcgL3A5zL7fJUM03I3px2AXMQlYAxfiOH8QhXOO10CR2MkwahBqNZ5nQQPk6HXYHOVQajWeeevQRIohCoNQhTnkY7SLtUTZ8hScDeijHJBiOq84b4l5wkO6E2oGSoVhDjO62aoBwc0qHbYtKAkFIQ4zhtOWbL+uFj/BUYtRa+kSYobhLjOGxteW3aN4JA2NW3jboo0x3TecFrZdBzHPLeUzcnGZFpsBT5Z9oz5UNqitsUfkR79lh0rPo/Pb6hpZ46rfHNV2XDN99HYtKV8VY6rfHFBHY1N+j4aK5Se8yoI5rjKx5O3nf8C7CElWoocjw84Sowm4T1Wun4A+0iZFjUTCm+H9ph1QoEaedXZ2b7w5FN33l4OU0XK20mpGE2pWi11UuG9LiE3tWlfino5oi72J6klaVY6xXDTu2tq5TtzzwNV2xdGXrK994RX7fH5eJmW95fsLM3IeAf8LvObsSxN+UpolYPKuH+UHPFR3rpkh5zVDZb4758ei3Jvj8uuLk22yX5dTnZuu+TzYfkuEAgEAoFAIIAH/gJh6BsMxvEViwAAAABJRU5ErkJggg==)
 */
export const subdir1Icon120px = "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z";

/**
 * @filepath subdir1/icon1_24px.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEL0lEQVR4nO2aSWsVQRDHfyQH9WJEEwOiXjVePZicXOKHcD2Kcbm44skNEY16UEiIZxUxCK4nNepncAVRUOMGLpBEcEGMlNSD8OiaeTPdPW8C84eCMEn+VV3dXV1V3VChQoUKFQpBJ9ALbAdOAueBSyry8wlgm/6N/O20RwuwFhgEngGTGUX+Z0AdIlzTBu3AUWA0x6AteQscVu7SYg5wGvgecOD1MgGcAtooGTYDnyIOvF4+ApsoyaxfzWj8D+AxcBe4rnJXv/3MyDXczNWwDHjVgJG/gGvAVmBJSkCT3y3V0+C6/m8a/0ugi4LRDXxNMewdsBuY66FnHrAHeJ+i64vaVAh6UgLdGLALmBFQp3Dt1SBo6RWbVlDAsv+aYMQdYEFE/QuBkZSV0BUz4L0yFP8FjhSUsLQCx1JiwuwYiq8aCv8AWygeW1W3y6YrMc75SWPmmzH4qU6wVsKGkEv/k6FEln2zcSwhWQqSI5xJCHhlKFIkJtw3bOz3JW83jryxyNE+KxYZR+SE5hK5cdTwrJzzPtitaexUkW8+2G/YeigvYYuWofWEowGSnGEHr3zzwUwjY3yTd6uujTT7sRyAZosum1fnIRt0EP3y3VORHSAx67eD+1wesucOIqnqKLEDBLcc3E+yknQaS0kSj7I7YIeRsM3PQtJrOEDq+bI7YFmIOLDD6ORI0lF2B7SqrfX8fVlI+h0EjwiHmA5A93w9v9xFNIwhB8G9aeSABw5+OdUaxkUHgfToposDbjj4LxTpgOXANyMY5ZGxjD0/bwcMBdgCoZyQdfBBtkB/oCDYowPwGbxwhAiCcvnaMLYHPAbzroQ8M4/a+NM3ies1jJJLCwpYCXlnPlgi1Knpo1cykdMJPoMX7HRwylg6shI98zwJ8jjBd/CC2w5euXfMjAGjHG6P5IQQg+8wyuGzech6jVmSuzoCOyHE4AX7DJtXhmyJfdT2ky9qp0PeaN9oS+y1T/f6iOFRaT2FQE+gmRccCN0URdtfrnbzuF5UlgWLjfb9uOf1/H+cMjw7ErA/4AOx4aFhY6bsz0Kb7nuXArmWajZOGLZ9CHlLvDHh7A7VJ8yDvgS71oVWNmwo+tMkJ/QlXI9fjqGwTR8fTCZshyJiQmvCshd5EeuBBPr85EuC8vt6URkz2lsBT+RzwM61ie6UR1ITelEZIlmqYZae82l6oz+SqmFFykqoReG9nrVDh6a31ik0deYLG/zU7ZAUE2oixclNvWvoSokTrVrP79SqzlXYuPZ89GVvYbY+SJrMINKteaqJ1A2VEf3WyMvQ+mgfLeBlzRPSlmlIkaJnPSVDmzZTk15z+sq4HoGlmPWkAuqQvswINXApaQ+GKGyKRAuwSh8nuNrUSfJX21hntZlRhtdo3pAjbY2msMf18uWiypB+69PubeYGZoUKFSpUIDv+AUsrytQsHiz+AAAAAElFTkSuQmCC)
 */
export const subdir1Icon124px = "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z";

/**
 * @filepath subdir1/subdir2/icon5_24px.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELUlEQVR4nO1b3UpUURT+8AGcKMtHCHsB7aofvTyDXSRlpd5Emr1D5oiho10YKXadEYlX3mjdZFpPkClEQn+WoAZqkIY4sWENyGGvfc7+OzMHzgcLZJhZe621115/ewtkyJAhQ4ZEUA+gGUAvgGEATwE8JxJ/DwG4S98R3009agC0AJgAsAKgpEniN+NkEMErNagDUADw3UBpjr4BeEC8qxYnAIwC+ONQ8TDtARgBkEOVoQPAhkfFw/QLwC1Uya7PaAr/F8BHAAsA5ogW6LN9TV7TlfSGcwDWYgh5QEoWyFOCCOoEMEC/OYjB/zOAhqSVbwKwHSHYOqW7qzGU5kj8tgjgZ8RaWyRTIjgfEeh2KKe3WigeplYyxJ5iXSFTYxJuv60QQpzlaw4VD1M7gMUIT2jwGfDWmIWPADzxqPhxylNxpYoJtT4MMMMseAigPyHlj1OB1pbJ9NK18h2Kna+E8seNwHnCDZeuv8EskpTbq2hCUSw5qREeMQu8qQLlyzFhiZFRZA4r1DEpb8dztNel60yKFJ+dsjFAgbHskKXAokCaDdGwJc9RRtY+U+VrqA0NM/zhoMiZlfCdteR5hakYv5rOE1o87b4vAwR05mUyXzIxwISE0YFlbe/bAG0A/kl4PzYxwKqE0ZwDIX0aQNBrCe9lXeXrGVcqpMAAg0zBdkbHAM2MATpSYIAuF3HgHjPJyafAAHmSNcy/R8cAReYcBSkwQMCM4UWdERuTEgZvU2SAdxL+IqvFxpTHDJCEAeYl/J8laYDbAH4zwciERO9xJ0kDTDo4Aq6MoKu8kyNQdBQEu0kBG+W7HQVBUcLHRq/DNGjqCSY7H5CMsgsWYUjrQqjTMCjpeoLpzjsrhOqpfAwzGTAUKqBCZMez8qpS+DQ0sWKZCUw8wVZ5rhn6AAOMM+1wm6WAnCe4UJ5rh8dMDNDM7FLRUkiZJ7hQPqC3AzKZL7gciW3Q+MlW2HJ2MI32cUdiX2ye2PR79IKyJ7jY+UAxvjceioJGyrJx8y5dVAZVQu3M+F7IeRKWGGEsu+hwPmBDQob3jIxa1R+HHF0zlZj6utIGkPUtJYoHzm6JbypydyUvRwcUconbIqeYZhY6dDgs1VWeux5/AQ/I0eODkuI4JBET8gq3F/TJ1wMJ0POTLcXiS+R6PqM9F/AEbQI4C89oingktUcXlS6KpTK1Up6PWtf7I6kyGiM8oUSZo2jZO7RRGo56hbqZpPLHj4MqJpRJNCevqE3tiogTefrOIHV1ssZGdua9uz2HWnqQVNKgfbp3XKTh5Tz9vRrzZWg42nsLeLp1Alcs+aB1CohVhVyM15y2tEvlbVXsuqqB6qOXGa4UFy3tfReNTZKoAXCRHicsayp8RGOsMRpmpOpfZjiIoeRlGok9pGpuimiSPuuh6a32ADNDhgwZMkAf/wEgejYxrLkGogAAAABJRU5ErkJggg==)
 */
export const subdir1Subdir2Icon524px = "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z";

/**
 * @filepath test_icon.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVUlEQVR4nO1aXWgURwD+crk+ldIXtVKuKUQoPrRC0RjbCnkIghIEfYglFEX60NOiHDEhqXi2qGijRoRiEtcYhahBNI36VMSHgEIbRCEqrYhQRKVQaPum1cvJV+YuW851b52dmb2b6H7wwd3ewu33MzO7cwfEiBEjhgccxpt0sJRH8AUPYzn78B5eB5CooYNtdPAPHbCEz+jgPA9hLl5l0MEuj/Dn+Pjg2w+zb/25LgO2heFxsAXEGyDeB9EIQrz/vIHYLCheTx9rnD4nWR0DDuNBkAGC7c0H9gP8Soqp+x1YNdb3Wff3p0EcA3GilCPEb4Le4yCGQGwFsRLEnMoZ4OBikPj8QGJqSf3PXYGiE/k0msZ7sOmHC8ju/AXZnRML93Ve8YqsJ84+IaaeEvkPiFEfE1wOg9gOYjGImmgNOIS5dHDTT3yuP5nrWd3dHyheCN/Se1GILqWfASJ5EhQs0wI/7i0YEakJZ1BLB60Psh9furtr3q0b2Y8mfkyvHl2QmuwoK7zuXic29o15hZczwE3fNUCiBV52RT40MmCb1DhfenkPvtlzuZx4PwNK01dogctBEJ9Uz4BEPo22U0NBwv0M8Kav0QKXbZHMDZkgA5K5Dfjy6IiMeK8BfulrtMDlRhC1lTEgkU9j/bGTsuJLDSiXvoEWCH5ttAmZcgZI1t7PgKD0DbSgOBwiNaBpvCeseNeAl6VvqAWCn0ZjQN29TmzdfUXVAJn0DbXgiJElMuM1ID0wqiJecMVAekImfYMt6DJrQJNa9V2ev/nhQ1nxhlog2GDGgEQ+7Xd7K8vU/o7rT3K1z8IaYKAFe7VWhYxrgGb6g9cW/hFWvMEWLNY3YFPhqU45/ce5ZOj0DbZgm54Bqfsd7iNtpdM31IJh5RUhIwxYNdZXrfQNtmClkgHHwRaxkyPWcBWqzPwRtaBbyQAU9/Be2MaSoexdX4VaMKS2x8jC5qSS62Hu+irUAoVtfWKJDekbaoHCcsjCjqwV6RtoQYuKAWtsSd9AC1pVDFhnU/qaLVgbuQH1Eaev2YK1kQ+BkQqkr9GC1kgnwfoKpa/RAqVJsNHG9BVboLA3QNTZmL5iC1Kqt8JDNqYfsgWKt8ICxZ+orUs/ZAsUH4YkJsJqph+iBQoToAti1vSmgnXpS7ZAXPtsaIGFPydYmb5EC9S3xIKWQ1vSl2hBgwkDakD02Jp+QAv0tsWfQ/H/OVamH9CCRTAKotPW9H1aoP/T2Asg5swjTtiYfmkL5hcN0Jz5y+AOcbLaIl/G28QIogCJd0g8qrZACf5L4t0oDOi1QJwse/UFg80E2wtcMPktc8mnFgiTYy45xUVXv/v/+sFmFQN2FIcUb7N/w99VFxWW4prd6wd3vA5jn5HMBZxZY9/sXMCZm76ZFnBmp6/XAs789PVaQGIZCccUp4jBv4hTvxPnfiV+miQuXSPGBcVrcUx8Js4R55r8bqFFqQUxYsSIEQOvNv4DXOM7cqEN1K0AAAAASUVORK5CYII=)
 */
export const testIcon = "o.64 F#0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 f#f0f F#00f w.24 M2.4 2.4h7.2v7.2H2.4z f#f0f w.48 M2.4 19.2h19.2 F#ff0 m12 2.4 9.6 19.2H2.4z F#f90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";
`;

const jsContent2 = `export const FILL_NONE = 'M12 20.5a8.5 8.5 0 0 1 0-17Z f#000 Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z';

export const RULE_EVEN_ODD = 'F#f4f6f8 M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 F#f4f6f8 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94';

export const SUBDIR1_ICON1_20PX = 'M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z';

export const SUBDIR1_ICON1_24PX = 'M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z';

export const SUBDIR1_SUBDIR2_ICON5_24PX = 'o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z';

export const TEST_ICON = 'o.64 F#0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 f#f0f F#00f w.24 M2.4 2.4h7.2v7.2H2.4z f#f0f w.48 M2.4 19.2h19.2 F#ff0 m12 2.4 9.6 19.2H2.4z F#f90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304';
`

const mdContent = `# List of icons
| Source | Name | Path |
|---|---|---|
|  ![](../mocks/inputIcons/fill-none.svg) | FILL_NONE | fill-none.svg |
|  ![](../mocks/inputIcons/rule-even-odd.svg) | RULE_EVEN_ODD | rule-even-odd.svg |
|  ![](../mocks/inputIcons/subdir1/icon1_20px.svg) | SUBDIR1_ICON1_20PX | subdir1/icon1_20px.svg |
|  ![](../mocks/inputIcons/subdir1/icon1_24px.svg) | SUBDIR1_ICON1_24PX | subdir1/icon1_24px.svg |
|  ![](../mocks/inputIcons/subdir1/subdir2/icon5_24px.svg) | SUBDIR1_SUBDIR2_ICON5_24PX | subdir1/subdir2/icon5_24px.svg |
|  ![](../mocks/inputIcons/test_icon.svg) | TEST_ICON | test_icon.svg |
`;

const htmlContent = `<!DOCTYPE html>
<html lang="">
    <head>
        <style>
            table {
                border-collapse: collapse;
            }
            th {
                text-align: center;
                border: 1px solid darkgray;
                padding: 4px 8px;
            }
            td {
                text-align: left;
                border: 1px solid darkgray;
                padding: 4px 8px;
            }
        </style>
    </head>
    <body>
        <table>
            <tr><th>Icon</th><th>Name</th><th>Path</th></tr>

<tr><td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 20.5a8.5 8.5 0 0 1 0-17Z" />
  <path stroke="#000" fill="none" stroke-width=".5" d="M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z" />
</svg></td><td>FILL_NONE</td><td>fill-none.svg</td></tr>
<tr><td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#f4f6f8" d="M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2" />
  <path fill="#f4f6f8" fill-rule="evenodd" d="M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94" />
</svg></td><td>RULE_EVEN_ODD</td><td>rule-even-odd.svg</td></tr>
<tr><td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z" />
</svg></td><td>SUBDIR1_ICON1_20PX</td><td>subdir1/icon1_20px.svg</td></tr>
<tr><td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z" />
</svg></td><td>SUBDIR1_ICON1_24PX</td><td>subdir1/icon1_24px.svg</td></tr>
<tr><td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path opacity=".3" d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z" />
  <path opacity="1" d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z" />
</svg></td><td>SUBDIR1_SUBDIR2_ICON5_24PX</td><td>subdir1/subdir2/icon5_24px.svg</td></tr>
<tr><td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path opacity=".64" fill="#0f0" d="M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2" />
  <path opacity=".8" fill-opacity=".5" stroke-opacity=".3" stroke="#f0f" fill="#00f" stroke-width=".24" d="M2.4 2.4h7.2v7.2H2.4z" />
  <path stroke="#f0f" stroke-width=".48" d="M2.4 19.2h19.2" />
  <path fill="#ff0" d="m12 2.4 9.6 19.2H2.4z" />
  <path fill="#f90" d="M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304" />
</svg></td><td>TEST_ICON</td><td>test_icon.svg</td></tr>

        </table>
    </body>
</html>
`;

const dtsContent = `/**
 * @filepath fill-none.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2az0uUQRjHP7WRnbIuJUW36lIqWV5jITINkf6JKAz78QdU14hOleStyMpMvFZegqg0UkgrtcxfFxMqM6FMPbgx8BVEVNbdmfd9B+cDyy7L7LMz33fmmWeeZyAQCAQCgUDALSmgHKgD6oFnQBfwWa8ufVevNkf0G69JAVXAI+A3kNH7F6AHeK/3y8A14C7wCviptpPAQ6DSNzG2ALXACDAPDAB9wLQGtvS1lA3AAeAC8Fo2hoGzQAEJ5xQwCszo6a406NUEWMpeLY1/ErWGBLIdaNXT+gjMZTHwbAVYYBfwQP/RAhSSEA7pyXwHvq1h4GsVYIFjwBgwBJQSM2lgSp58NofB5yKAYQfwQk7V9CEW0lqXPTkOPB8BkEN8oj6k45j2U0BvnoPPRwDDRolgZkIJETq8EU37TMwCLMwEsxwGo3KMrXJ4swkRwLBTDriZCPb5+Ry9vUsBDMdlrxqHEd6o9vlMAgVAYfewq4ixVhHeXIIF2K0+nrFsl01yfPluea4FMNxRkGT1AFWltT/tgQD71NcK22vrq4PBuxDA0A402jKWUqDR55EAF4FfCpTyplwd/euRAMWyXWbD2HllZzIeCWCSKhPAORvG6pXG8kkAwxvgpg1DbUC3hwKYHONzG4Y6PRXgBvDWhqF+RwGQawGuaufKm/71LkDnel8CbR47QVNtsrINDngoQLutbbBuUWlrXQZC5eroH48EKLEZCqcUCvd6JMAlzQArhyFUpfXpONwB3LdpsNKjhMh+2TVJUmukPEqJNbhIiaH6/IzFeoALAfaoj6dxlBYfSXhavFlPfzOOqJEvGEugACdk7ySOaUlgaawIGAeaiIBtmmZJKo6+1Da9lYgoVXichPJ4iwI1kwiN5YLEh5gEKNDgTWxylJhIL7r7F+UVmSJN+8k4B7/44GEuJ/zIcXfIxduPa80fJCEUag/OKE6YcSCACXIe6zdNUTq8tVCt+vyswuZsqknZxPYNEnUwin0+XwpUnx/WAM1U/bRKPmG5ZEaxjrQdajOk8NZZhOeClErUjSpUZnSzbEA5xm7NkivAdeCeqjkLbSd0pK3w7bL0Svv1YaWobgNPgXdKuffrs/nultqU2UxmBAKBQCAQCLAM/wHmwNLJpQ3dxwAAAABJRU5ErkJggg==)
 */
export const FILL_NONE: string;

/**
 * @filepath rule-even-odd.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBElEQVR4nO1aSahcRRStOMVZnMc4giJEcKFRN4oKzoounMnCnbjQEJKIBjWCioJuxIWSBCEOuzhvxAk1QeKw+AERFBEVv/kav919x+6f/Cv3d7/u193v9fi687HfgaKh+9Wte8+runXrVIeQI0eOHDly5MiRI0eOHGMGEZ3iLUwamPl0JN2GrLbQSL9k5mVhUoDx4BskfBEmAUR0alvwUUM8OfzfgYgnTTQBDl/zCUvg8zApYOZlvubjwRPRaWHSgMhrEXlNmESY2f5I8iOQ/mxmB4RJA3D5nmgJAJfvDpMEM1uCLDsbOUC+N7P9wmICot6ErOuLqudmbZtIb2ndBYj05qzHKaqe5zEg6o19dUTmlQ3n5F8AOCFLx4B0eysBwLIj0zEATkSWQsM+39uPg5ubCxS5NjPHRK5OK4RA5KqsxkGU65psk27uuTOR3gok81Xm9M9CwY7OzDHSj1MrQdKPshqnULBjkHVXNXiZ95j6MkBElxLJ/cB8Z1ZOEVVWpAZfzwWVFVmN5757DMx82cBGkHklkDybjUPyTjcCgOXtLMZC1ofd96ENmdmBwPo7sr40zFZVUj0fSPZ2JYBkHqC8fAh/lyDJC8A6bWYHhSyArI/WEsmWQas2JHm9W/CxXPDaoNUlsG6s2VkfskKpVDoeSCq1ouVNnxX99BeRs4FkrlcC/Fnv088Y7pP7VutfyXrrDsDyXmydfmBmh/TeV1/p+e3Xx9CXe7XvUx1Ztsb8e3/gQNMAXL69ZZp+9rfZEaEHAQRIpG8CSNTVo272zexQIP2wmbzyXSFrmNnBXhW2ZOyvfb/t1M8TUr/BN0iW5zvZnp21o9r0RZKSkxJGASDdlLBtfVcqlY5Ler5YLB6LJDAEAeA2kmz7mD52+8zRLWFUINLbUhz9IWm6AsmTAwffWAobknXF2GmyefrfMTICZswO97WZ7Kj+UhA5J3rWzA5D1t3DEoAs/8RzDTOfgaQ/pZC1p9uSHBpI+kmHzD0dFTHIum744OttbXS8BdLf0meLbh9p8A5kXdPF2V1EdIkforIiwG25zehw06E9FkYNqjrSbd3uyfDt92yzxHzFyAkws6VpeWBfNj9n9FKXZAJg2bGvA25vsjOMC8j64uKbAX0oPsMCSB9cdASwrh4nAQ8lrUE/hIw8WNJPk6pL92mcBKxKIOBpT5DIMtXyfblE8gCKXOOnyIU7QdQbFpRnkmJzcPKGC7BA8lwKATN+zHWZK4GAVeMjgHV1y/Tb6EqM/+YlsVeFMcdejfq5mBI/RjtpMRvTccWpVTxd2AZr+r6P1SqvjXUJYFMxJFtbpTIviaOTI7C8m2Ynpt44Ub96mevf7zY7Eli/qivT/ilyX7yvE+lH8hgJ47tkxViZKyJnJT0DJE/VnU+4mSGqXOzLo2bnkSQbflsUuzpb2uWOYV0YF4BkQ4yAM6NpGS2DtulNwiByZfQbYvlCP+REv6ddv/nMisQUYHnLNb+6fSgvj9tA1idGH3mixCVTnoBcwvLLB2R93N9+mwpEAgDlCxb+HMH6V0sC21RNbpWL/HYIUa/3835V2m4XSPyipqZUDyShZaoPYuMtP1N9KzqTvo3JVMebIZaCC7CuLyTu9SR7S8yXu2rcXgek55pREPDNaPZ5mQWWb31H6PBcosbg8twYCdA/RkPA4M2XxFiCt2pimlt0BJDMLbo/WeTIkSNHjhw5wmLGf26RJBRR+0nMAAAAAElFTkSuQmCC)
 */
export const RULE_EVEN_ODD: string;

/**
 * @filepath subdir1/icon1_20px.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjklEQVR4nO2azUtUURTAfyakLaplZatKhDZuso9NHyS2j0ErErRaGkpQ0L9RVBBFtUgwgkTBsL1YQpna2ooyyjQjNxWNGhfOwOUw08y89+59z7g/uDC8eXO+3r3nnXPvQCAQCAQCgUDAGw3AEaAd6JbRLtd28B+yE+gDhoHvwFqZsQQMAb0SrHXLCWAUyFfgdKmRFxltrCMOARNlHPsFzALTMmbl2r9+8wI4QIbZBNwCVooYvwjcAc4Au4ANRX5vru2We8y934rIMbJviK5M0QTMFDH4pSS4jRFk1gEdwKsicqeARjLCfuCrMvADkEtQhwninNIxD7SQAeeXlWH9wGYHurYAA0rXcppBaFJPfhW45EHvZdFlzwTvy2GTWvPGoHMe9Z9XQTA5od6jfm6qqejjyWuuKBuu+1z3K5Zisy7T4qF6RR70oXRCZXsXCa+axPjRsmfcR3m7Zo04r7pO4LYM8zkqHcqmVhzyTBU5cbhtyTKfo1IDTFqynuKwq8tbikxxkoUA6FmQd9VW96naPkp56yoAddJGF+RdxAHDlgLTrJChABjuWfIGSZgaFWHTsWUtAGcteaaTTJQGlWlN25q1ADQqG7eTIMcswT9L9PNpB6BWbaqYPcbEyFmC3yYkM+kAGN5bMk+SIN2WYNMEZTUAbyyZXaQcgL3A5zL7fJUM03I3px2AXMQlYAxfiOH8QhXOO10CR2MkwahBqNZ5nQQPk6HXYHOVQajWeeevQRIohCoNQhTnkY7SLtUTZ8hScDeijHJBiOq84b4l5wkO6E2oGSoVhDjO62aoBwc0qHbYtKAkFIQ4zhtOWbL+uFj/BUYtRa+kSYobhLjOGxteW3aN4JA2NW3jboo0x3TecFrZdBzHPLeUzcnGZFpsBT5Z9oz5UNqitsUfkR79lh0rPo/Pb6hpZ46rfHNV2XDN99HYtKV8VY6rfHFBHY1N+j4aK5Se8yoI5rjKx5O3nf8C7CElWoocjw84Sowm4T1Wun4A+0iZFjUTCm+H9ph1QoEaedXZ2b7w5FN33l4OU0XK20mpGE2pWi11UuG9LiE3tWlfino5oi72J6klaVY6xXDTu2tq5TtzzwNV2xdGXrK994RX7fH5eJmW95fsLM3IeAf8LvObsSxN+UpolYPKuH+UHPFR3rpkh5zVDZb4758ei3Jvj8uuLk22yX5dTnZuu+TzYfkuEAgEAoFAIIAH/gJh6BsMxvEViwAAAABJRU5ErkJggg==)
 */
export const SUBDIR1_ICON1_20PX: string;

/**
 * @filepath subdir1/icon1_24px.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEL0lEQVR4nO2aSWsVQRDHfyQH9WJEEwOiXjVePZicXOKHcD2Kcbm44skNEY16UEiIZxUxCK4nNepncAVRUOMGLpBEcEGMlNSD8OiaeTPdPW8C84eCMEn+VV3dXV1V3VChQoUKFQpBJ9ALbAdOAueBSyry8wlgm/6N/O20RwuwFhgEngGTGUX+Z0AdIlzTBu3AUWA0x6AteQscVu7SYg5wGvgecOD1MgGcAtooGTYDnyIOvF4+ApsoyaxfzWj8D+AxcBe4rnJXv/3MyDXczNWwDHjVgJG/gGvAVmBJSkCT3y3V0+C6/m8a/0ugi4LRDXxNMewdsBuY66FnHrAHeJ+i64vaVAh6UgLdGLALmBFQp3Dt1SBo6RWbVlDAsv+aYMQdYEFE/QuBkZSV0BUz4L0yFP8FjhSUsLQCx1JiwuwYiq8aCv8AWygeW1W3y6YrMc75SWPmmzH4qU6wVsKGkEv/k6FEln2zcSwhWQqSI5xJCHhlKFIkJtw3bOz3JW83jryxyNE+KxYZR+SE5hK5cdTwrJzzPtitaexUkW8+2G/YeigvYYuWofWEowGSnGEHr3zzwUwjY3yTd6uujTT7sRyAZosum1fnIRt0EP3y3VORHSAx67eD+1wesucOIqnqKLEDBLcc3E+yknQaS0kSj7I7YIeRsM3PQtJrOEDq+bI7YFmIOLDD6ORI0lF2B7SqrfX8fVlI+h0EjwiHmA5A93w9v9xFNIwhB8G9aeSABw5+OdUaxkUHgfToposDbjj4LxTpgOXANyMY5ZGxjD0/bwcMBdgCoZyQdfBBtkB/oCDYowPwGbxwhAiCcvnaMLYHPAbzroQ8M4/a+NM3ies1jJJLCwpYCXlnPlgi1Knpo1cykdMJPoMX7HRwylg6shI98zwJ8jjBd/CC2w5euXfMjAGjHG6P5IQQg+8wyuGzech6jVmSuzoCOyHE4AX7DJtXhmyJfdT2ky9qp0PeaN9oS+y1T/f6iOFRaT2FQE+gmRccCN0URdtfrnbzuF5UlgWLjfb9uOf1/H+cMjw7ErA/4AOx4aFhY6bsz0Kb7nuXArmWajZOGLZ9CHlLvDHh7A7VJ8yDvgS71oVWNmwo+tMkJ/QlXI9fjqGwTR8fTCZshyJiQmvCshd5EeuBBPr85EuC8vt6URkz2lsBT+RzwM61ie6UR1ITelEZIlmqYZae82l6oz+SqmFFykqoReG9nrVDh6a31ik0deYLG/zU7ZAUE2oixclNvWvoSokTrVrP79SqzlXYuPZ89GVvYbY+SJrMINKteaqJ1A2VEf3WyMvQ+mgfLeBlzRPSlmlIkaJnPSVDmzZTk15z+sq4HoGlmPWkAuqQvswINXApaQ+GKGyKRAuwSh8nuNrUSfJX21hntZlRhtdo3pAjbY2msMf18uWiypB+69PubeYGZoUKFSpUIDv+AUsrytQsHiz+AAAAAElFTkSuQmCC)
 */
export const SUBDIR1_ICON1_24PX: string;

/**
 * @filepath subdir1/subdir2/icon5_24px.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELUlEQVR4nO1b3UpUURT+8AGcKMtHCHsB7aofvTyDXSRlpd5Emr1D5oiho10YKXadEYlX3mjdZFpPkClEQn+WoAZqkIY4sWENyGGvfc7+OzMHzgcLZJhZe621115/ewtkyJAhQ4ZEUA+gGUAvgGEATwE8JxJ/DwG4S98R3009agC0AJgAsAKgpEniN+NkEMErNagDUADw3UBpjr4BeEC8qxYnAIwC+ONQ8TDtARgBkEOVoQPAhkfFw/QLwC1Uya7PaAr/F8BHAAsA5ogW6LN9TV7TlfSGcwDWYgh5QEoWyFOCCOoEMEC/OYjB/zOAhqSVbwKwHSHYOqW7qzGU5kj8tgjgZ8RaWyRTIjgfEeh2KKe3WigeplYyxJ5iXSFTYxJuv60QQpzlaw4VD1M7gMUIT2jwGfDWmIWPADzxqPhxylNxpYoJtT4MMMMseAigPyHlj1OB1pbJ9NK18h2Kna+E8seNwHnCDZeuv8EskpTbq2hCUSw5qREeMQu8qQLlyzFhiZFRZA4r1DEpb8dztNel60yKFJ+dsjFAgbHskKXAokCaDdGwJc9RRtY+U+VrqA0NM/zhoMiZlfCdteR5hakYv5rOE1o87b4vAwR05mUyXzIxwISE0YFlbe/bAG0A/kl4PzYxwKqE0ZwDIX0aQNBrCe9lXeXrGVcqpMAAg0zBdkbHAM2MATpSYIAuF3HgHjPJyafAAHmSNcy/R8cAReYcBSkwQMCM4UWdERuTEgZvU2SAdxL+IqvFxpTHDJCEAeYl/J8laYDbAH4zwciERO9xJ0kDTDo4Aq6MoKu8kyNQdBQEu0kBG+W7HQVBUcLHRq/DNGjqCSY7H5CMsgsWYUjrQqjTMCjpeoLpzjsrhOqpfAwzGTAUKqBCZMez8qpS+DQ0sWKZCUw8wVZ5rhn6AAOMM+1wm6WAnCe4UJ5rh8dMDNDM7FLRUkiZJ7hQPqC3AzKZL7gciW3Q+MlW2HJ2MI32cUdiX2ye2PR79IKyJ7jY+UAxvjceioJGyrJx8y5dVAZVQu3M+F7IeRKWGGEsu+hwPmBDQob3jIxa1R+HHF0zlZj6utIGkPUtJYoHzm6JbypydyUvRwcUconbIqeYZhY6dDgs1VWeux5/AQ/I0eODkuI4JBET8gq3F/TJ1wMJ0POTLcXiS+R6PqM9F/AEbQI4C89oingktUcXlS6KpTK1Up6PWtf7I6kyGiM8oUSZo2jZO7RRGo56hbqZpPLHj4MqJpRJNCevqE3tiogTefrOIHV1ssZGdua9uz2HWnqQVNKgfbp3XKTh5Tz9vRrzZWg42nsLeLp1Alcs+aB1CohVhVyM15y2tEvlbVXsuqqB6qOXGa4UFy3tfReNTZKoAXCRHicsayp8RGOsMRpmpOpfZjiIoeRlGok9pGpuimiSPuuh6a32ADNDhgwZMkAf/wEgejYxrLkGogAAAABJRU5ErkJggg==)
 */
export const SUBDIR1_SUBDIR2_ICON5_24PX: string;

/**
 * @filepath test_icon.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVUlEQVR4nO1aXWgURwD+crk+ldIXtVKuKUQoPrRC0RjbCnkIghIEfYglFEX60NOiHDEhqXi2qGijRoRiEtcYhahBNI36VMSHgEIbRCEqrYhQRKVQaPum1cvJV+YuW851b52dmb2b6H7wwd3ewu33MzO7cwfEiBEjhgccxpt0sJRH8AUPYzn78B5eB5CooYNtdPAPHbCEz+jgPA9hLl5l0MEuj/Dn+Pjg2w+zb/25LgO2heFxsAXEGyDeB9EIQrz/vIHYLCheTx9rnD4nWR0DDuNBkAGC7c0H9gP8Soqp+x1YNdb3Wff3p0EcA3GilCPEb4Le4yCGQGwFsRLEnMoZ4OBikPj8QGJqSf3PXYGiE/k0msZ7sOmHC8ju/AXZnRML93Ve8YqsJ84+IaaeEvkPiFEfE1wOg9gOYjGImmgNOIS5dHDTT3yuP5nrWd3dHyheCN/Se1GILqWfASJ5EhQs0wI/7i0YEakJZ1BLB60Psh9furtr3q0b2Y8mfkyvHl2QmuwoK7zuXic29o15hZczwE3fNUCiBV52RT40MmCb1DhfenkPvtlzuZx4PwNK01dogctBEJ9Uz4BEPo22U0NBwv0M8Kav0QKXbZHMDZkgA5K5Dfjy6IiMeK8BfulrtMDlRhC1lTEgkU9j/bGTsuJLDSiXvoEWCH5ttAmZcgZI1t7PgKD0DbSgOBwiNaBpvCeseNeAl6VvqAWCn0ZjQN29TmzdfUXVAJn0DbXgiJElMuM1ID0wqiJecMVAekImfYMt6DJrQJNa9V2ev/nhQ1nxhlog2GDGgEQ+7Xd7K8vU/o7rT3K1z8IaYKAFe7VWhYxrgGb6g9cW/hFWvMEWLNY3YFPhqU45/ce5ZOj0DbZgm54Bqfsd7iNtpdM31IJh5RUhIwxYNdZXrfQNtmClkgHHwRaxkyPWcBWqzPwRtaBbyQAU9/Be2MaSoexdX4VaMKS2x8jC5qSS62Hu+irUAoVtfWKJDekbaoHCcsjCjqwV6RtoQYuKAWtsSd9AC1pVDFhnU/qaLVgbuQH1Eaev2YK1kQ+BkQqkr9GC1kgnwfoKpa/RAqVJsNHG9BVboLA3QNTZmL5iC1Kqt8JDNqYfsgWKt8ICxZ+orUs/ZAsUH4YkJsJqph+iBQoToAti1vSmgnXpS7ZAXPtsaIGFPydYmb5EC9S3xIKWQ1vSl2hBgwkDakD02Jp+QAv0tsWfQ/H/OVamH9CCRTAKotPW9H1aoP/T2Asg5swjTtiYfmkL5hcN0Jz5y+AOcbLaIl/G28QIogCJd0g8qrZACf5L4t0oDOi1QJwse/UFg80E2wtcMPktc8mnFgiTYy45xUVXv/v/+sFmFQN2FIcUb7N/w99VFxWW4prd6wd3vA5jn5HMBZxZY9/sXMCZm76ZFnBmp6/XAs789PVaQGIZCccUp4jBv4hTvxPnfiV+miQuXSPGBcVrcUx8Js4R55r8bqFFqQUxYsSIEQOvNv4DXOM7cqEN1K0AAAAASUVORK5CYII=)
 */
export const TEST_ICON: string;
`

const mocks = [
  {
    title: "JS Without options",
    cliOptions: {
      input: inputDir,
      colors: true,
    } as CLIOptions,
    file1: {
      content: jsContent,
      path: join(process.cwd(), "src/components/Icon/paths.js"),
    },
  },
  {
    title: "TS Without options",
    cliOptions: {
      input: inputDir,
      colors: true,
      output: "icons.ts",
    } as CLIOptions,
    file1: {
      content: jsContent.split('\n').map((item) => item.replace(/";/g, `" as "${ item.match(/const (.*?) /)?.[1] }";`)).join('\n'),
      path: join(process.cwd(), "icons.ts"),
    },
  },
  {
    title: "With options",
    cliOptions: {
      input: inputDir,
      output: "icons.ts",
      colors: true,
      quote: true,
      template: "",
      format: "SCREAMING_SNAKE_CASE",
      md: "icons.md",
      html: "icons.html",
      dts: true,
    } as CLIOptions,

    file1: {
      content: mdContent,
      path: join(process.cwd(), "icons.md"),
    },
    file2: {
      content: htmlContent,
      path: join(process.cwd(), "icons.html"),
    },
    file3: {
      content: jsContent2,
      path: join(process.cwd(), "icons.ts"),
    },
    file4: {
      content: dtsContent,
      path: join(process.cwd(), "icons.d.ts"),
    },
  }
];

export const stories = story.getStories({
  mocks,
  input: ({ cliOptions }) => ({ cliOptions }),
  output: ({ file1, file2, file3, file4 }) => ({ file1, file2, file3, file4 }),
});
