import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";
import { CLIOptions } from "@svgd/cli";
import { inputDir } from "@svgd/mocks";
import { join } from "path";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const jsContent = `/**
 * @filepath test_icon.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAET0lEQVR4nO2aXWgUVxzFz+qaF5FWqTRNV4pYm4JYEC2C+KCxMeqLviiRBqtvRqpoQR9UFJW+SamYTZ21UPwKflFLNVgfElpNjBhj/UCjFJVW/Dbqi18J21PuZEfW7exm5t47szc6fziwbBYy55zf3Jm9s0A00UQTTc5wJwbTwmSm8CW3YQaTGIG3YUjEaGENLTyiBWYpTQu/sA6leJOHFjblGH9Nj75799bwIfcWAazxqYkgSkB8AqISxAIQS8cSG4XE68x7lZnPlBQngG24WSgAoerPG361o/KioV27Mb79d2xc2wTiJIgz2bKIu0K574NoBfEDiEUgPgwvAAvHCpnvro+nP/3g8q6CpmPpFMo7GzGzsRPVDfdR3fAAydrruSYTxPlnRPoFkf6IOO8SgqN2ED+C+ALEgGADqEMpLVxwM/+yflDPsorvjxU0L4zP+fmGbTpbLgGI5klQKA8FbjpoBxFoCPsxkBbmtq8e39Sxetw/zd9M+Ss5v/bUyPeu7chrfNjDPag6eul/xvME4LTvBOCBglxtBZEINAj0Ll59n+ejrx7G3H2385p3CSC7fQkKHB0HUVW8AGLpFCa1tBU07hJAbvsKFDhaDiIWbgADe7ZjatNZT+ZzAnBrX4ECR5tAxMMLYEpzh2fzWQHka18DBULfar5K0D0Ar9i7BFCofQ0U9J4OgQZQ3tno23wmgL7a10SB0MxgAhj2cA/m7b0jG4CX9jVR8IemSyRfD2D6bxelzFc3PCj76au/vbSvkYI6vQGUS6KfUd3FMU+8mtdEgVCFngBi6RRmH7oua760Ntn1tDv+r98ANFBwUPGqwBod7W85WvXMr3mNFExTD2DWkStK7b8o8d2+RgpSagG883jXq6+0IbeviYJ2hf0E1tibGUVqXyMFC2UDmGjv5Ii7OAnJrPwBUZCU9I8St20sL/J61xcSBa1ye4y0NyelUvdz1xcSBR/LBDDdhPY1USBxOSQWmtK+BgoWyATwtSnta6BgiUwAq0xqX5GClYEHkAi4fUUKVgZ+ClghtK9AwZJAF8FESO0rUCC1CFaa2L4kBRWB3QglQm5fkoJRsrfCrSa275OCFvnH7bQfURvXvk8KJL8Miel9Pm9k+z4okFgAnSHKMpsKxrXvkQJx7GVQGto/TjCyfQ8UqGyJ5b8cmtK+BwoqdAQwAMR+U9svQMEBfQ9Laf8+x8j2C1AwVY95Z4gtprbvQsFWaB8iMYJoM7H9bApG9u5jKq78eeYccaDYJvvSn+KRWBBD4n0ST4tt0IOeMwgCSGw2wJxXbVY3DE4juMLWZ+fWsTv+0gBj3tQd7+GE0+tfHT/of1eY4AaCnbbqF3cV3ZRfiWN2jh/c8Dac+wxkLWD/Ovf1rgXsv+3roYD9u301Ctj/21ejgEQlCUuXeojtd4m9V4gjHURzG9FygjglJF6L98TfxGfEZ3X+b+FFioJoookmmmjwZs9/dbjGv+sJMQoAAAAASUVORK5CYII=)
 */
export const testIcon = "o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";

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
`;

const jsContent2 = `export const TEST_ICON = 'o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304';

export const SUBDIR1_ICON1_20PX = 'M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z';

export const SUBDIR1_ICON1_24PX = 'M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z';

export const SUBDIR1_SUBDIR2_ICON5_24PX = 'o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z';
`

const mdContent = `# List of icons
| Source | Name | Path |
|---|---|---|
|  ![](../mocks/inputIcons/test_icon.svg) | TEST_ICON | test_icon.svg |
|  ![](../mocks/inputIcons/subdir1/icon1_20px.svg) | SUBDIR1_ICON1_20PX | subdir1/icon1_20px.svg |
|  ![](../mocks/inputIcons/subdir1/icon1_24px.svg) | SUBDIR1_ICON1_24PX | subdir1/icon1_24px.svg |
|  ![](../mocks/inputIcons/subdir1/subdir2/icon5_24px.svg) | SUBDIR1_SUBDIR2_ICON5_24PX | subdir1/subdir2/icon5_24px.svg |
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
  <path opacity=".8" fill="#0f0" d="M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2" />
  <path opacity=".6" fill="#00f" d="M2.4 2.4h7.2v7.2H2.4z" />
  <path stroke="#f0f" stroke-width=".48" d="M2.4 19.2h19.2" />
  <path fill="#ff0" d="m12 2.4 9.6 19.2H2.4z" />
  <path fill="#f90" d="M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304" />
</svg></td><td>TEST_ICON</td><td>test_icon.svg</td></tr>
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

        </table>
    </body>
</html>
`;

const dtsContent = `/**
 * @filepath test_icon.svg
 * @return ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAET0lEQVR4nO2aXWgUVxzFz+qaF5FWqTRNV4pYm4JYEC2C+KCxMeqLviiRBqtvRqpoQR9UFJW+SamYTZ21UPwKflFLNVgfElpNjBhj/UCjFJVW/Dbqi18J21PuZEfW7exm5t47szc6fziwbBYy55zf3Jm9s0A00UQTTc5wJwbTwmSm8CW3YQaTGIG3YUjEaGENLTyiBWYpTQu/sA6leJOHFjblGH9Nj75799bwIfcWAazxqYkgSkB8AqISxAIQS8cSG4XE68x7lZnPlBQngG24WSgAoerPG361o/KioV27Mb79d2xc2wTiJIgz2bKIu0K574NoBfEDiEUgPgwvAAvHCpnvro+nP/3g8q6CpmPpFMo7GzGzsRPVDfdR3fAAydrruSYTxPlnRPoFkf6IOO8SgqN2ED+C+ALEgGADqEMpLVxwM/+yflDPsorvjxU0L4zP+fmGbTpbLgGI5klQKA8FbjpoBxFoCPsxkBbmtq8e39Sxetw/zd9M+Ss5v/bUyPeu7chrfNjDPag6eul/xvME4LTvBOCBglxtBZEINAj0Ll59n+ejrx7G3H2385p3CSC7fQkKHB0HUVW8AGLpFCa1tBU07hJAbvsKFDhaDiIWbgADe7ZjatNZT+ZzAnBrX4ECR5tAxMMLYEpzh2fzWQHka18DBULfar5K0D0Ar9i7BFCofQ0U9J4OgQZQ3tno23wmgL7a10SB0MxgAhj2cA/m7b0jG4CX9jVR8IemSyRfD2D6bxelzFc3PCj76au/vbSvkYI6vQGUS6KfUd3FMU+8mtdEgVCFngBi6RRmH7oua760Ntn1tDv+r98ANFBwUPGqwBod7W85WvXMr3mNFExTD2DWkStK7b8o8d2+RgpSagG883jXq6+0IbeviYJ2hf0E1tibGUVqXyMFC2UDmGjv5Ii7OAnJrPwBUZCU9I8St20sL/J61xcSBa1ye4y0NyelUvdz1xcSBR/LBDDdhPY1USBxOSQWmtK+BgoWyATwtSnta6BgiUwAq0xqX5GClYEHkAi4fUUKVgZ+ClghtK9AwZJAF8FESO0rUCC1CFaa2L4kBRWB3QglQm5fkoJRsrfCrSa275OCFvnH7bQfURvXvk8KJL8Miel9Pm9k+z4okFgAnSHKMpsKxrXvkQJx7GVQGto/TjCyfQ8UqGyJ5b8cmtK+BwoqdAQwAMR+U9svQMEBfQ9Laf8+x8j2C1AwVY95Z4gtprbvQsFWaB8iMYJoM7H9bApG9u5jKq78eeYccaDYJvvSn+KRWBBD4n0ST4tt0IOeMwgCSGw2wJxXbVY3DE4juMLWZ+fWsTv+0gBj3tQd7+GE0+tfHT/of1eY4AaCnbbqF3cV3ZRfiWN2jh/c8Dac+wxkLWD/Ovf1rgXsv+3roYD9u301Ctj/21ejgEQlCUuXeojtd4m9V4gjHURzG9FygjglJF6L98TfxGfEZ3X+b+FFioJoookmmmjwZs9/dbjGv+sJMQoAAAAASUVORK5CYII=)
 */
export const TEST_ICON: string;

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
`

const mocks = [
  {
    title: "Without options",
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
