## Parse svg to path d

### Use Case 1. Material UI icon with size 20

#### Code:
```ts
import { parseSvg } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 20 20\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\"><g><rect fill=\"none\" height=\"20\" width=\"20\"/><path d=\"M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16 M10,17c3.87,0,7-3.13,7-7c0-3.87-3.13-7-7-7 c-3.87,0-7,3.13-7,7C3,13.87,6.13,17,10,17L10,17z M10.5,10V7h-1v3H7l3,3l3-3H10.5z\"/></g></svg>";
export const pathD = parseSvg(svgInput);

```

#### Result:
```json
{
  "pathD": "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z"
}
```

### Use Case 2. Material UI icon with size 24

#### Code:
```ts
import { parseSvg } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
export const pathD = parseSvg(svgInput);

```

#### Result:
```json
{
  "pathD": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
}
```

### Use Case 3. Transparent Material UI icon

#### Code:
```ts
import { parseSvg } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4z M12,16l-4-4h3l0-4h2l0,4h3L12,16z\" opacity=\".3\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
export const pathD = parseSvg(svgInput);

```

#### Result:
```json
{
  "pathD": "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
}
```

### Use Case 4. Additional attributes

#### Code:
```ts
import { parseSvg } from "@svgd/utils";
const svgInput = "<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\r\n    <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#00ff00\" opacity=\"0.8\"/>\r\n    <rect x=\"10\" y=\"10\" width=\"30\" height=\"30\" fill=\"#0000ff\" opacity=\"0.6\"/>\r\n    <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#ff00ff\" stroke-width=\"2\"/>\r\n    <polygon points=\"50,10 90,90 10,90\" fill=\"#ffff00\"/>\r\n    <ellipse transform=\"scale(.24)\" cx=\"50\" cy=\"50\" rx=\"30\" ry=\"20\" fill=\"#ff9900\"/>\r\n</svg>";
export const pathD = parseSvg(svgInput);

```

#### Result:
```json
{
  "pathD": "o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
}
```

### Use Case 5. Empty svg

#### Code:
```ts
import { parseSvg } from "@svgd/utils";
const svgInput = "";
export const pathD = parseSvg(svgInput);

```

#### Result:
```json
{
  "pathD": ""
}
```

### Use Case 6. Throw if incorrect svg

#### Code:
```ts
import { parseSvg } from "@svgd/utils";
const svgInput = "ss";
export const pathD = parseSvg(svgInput);

```

#### Result:
`Throw Error`
---

## get base64 png from path d

### Use Case 1. Material UI icon with size 20

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 20 20\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\"><g><rect fill=\"none\" height=\"20\" width=\"20\"/><path d=\"M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16 M10,17c3.87,0,7-3.13,7-7c0-3.87-3.13-7-7-7 c-3.87,0-7,3.13-7,7C3,13.87,6.13,17,10,17L10,17z M10.5,10V7h-1v3H7l3,3l3-3H10.5z\"/></g></svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjklEQVR4nO2azUtUURTAfyakLaplZatKhDZuso9NHyS2j0ErErRaGkpQ0L9RVBBFtUgwgkTBsL1YQpna2ooyyjQjNxWNGhfOwOUw08y89+59z7g/uDC8eXO+3r3nnXPvQCAQCAQCgUDAGw3AEaAd6JbRLtd28B+yE+gDhoHvwFqZsQQMAb0SrHXLCWAUyFfgdKmRFxltrCMOARNlHPsFzALTMmbl2r9+8wI4QIbZBNwCVooYvwjcAc4Au4ANRX5vru2We8y934rIMbJviK5M0QTMFDH4pSS4jRFk1gEdwKsicqeARjLCfuCrMvADkEtQhwninNIxD7SQAeeXlWH9wGYHurYAA0rXcppBaFJPfhW45EHvZdFlzwTvy2GTWvPGoHMe9Z9XQTA5od6jfm6qqejjyWuuKBuu+1z3K5Zisy7T4qF6RR70oXRCZXsXCa+axPjRsmfcR3m7Zo04r7pO4LYM8zkqHcqmVhzyTBU5cbhtyTKfo1IDTFqynuKwq8tbikxxkoUA6FmQd9VW96naPkp56yoAddJGF+RdxAHDlgLTrJChABjuWfIGSZgaFWHTsWUtAGcteaaTTJQGlWlN25q1ADQqG7eTIMcswT9L9PNpB6BWbaqYPcbEyFmC3yYkM+kAGN5bMk+SIN2WYNMEZTUAbyyZXaQcgL3A5zL7fJUM03I3px2AXMQlYAxfiOH8QhXOO10CR2MkwahBqNZ5nQQPk6HXYHOVQajWeeevQRIohCoNQhTnkY7SLtUTZ8hScDeijHJBiOq84b4l5wkO6E2oGSoVhDjO62aoBwc0qHbYtKAkFIQ4zhtOWbL+uFj/BUYtRa+kSYobhLjOGxteW3aN4JA2NW3jboo0x3TecFrZdBzHPLeUzcnGZFpsBT5Z9oz5UNqitsUfkR79lh0rPo/Pb6hpZ46rfHNV2XDN99HYtKV8VY6rfHFBHY1N+j4aK5Se8yoI5rjKx5O3nf8C7CElWoocjw84Sowm4T1Wun4A+0iZFjUTCm+H9ph1QoEaedXZ2b7w5FN33l4OU0XK20mpGE2pWi11UuG9LiE3tWlfino5oi72J6klaVY6xXDTu2tq5TtzzwNV2xdGXrK994RX7fH5eJmW95fsLM3IeAf8LvObsSxN+UpolYPKuH+UHPFR3rpkh5zVDZb4758ei3Jvj8uuLk22yX5dTnZuu+TzYfkuEAgEAoFAIIAH/gJh6BsMxvEViwAAAABJRU5ErkJggg=="
}
```

### Use Case 2. Material UI icon with size 24

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEL0lEQVR4nO2aSWsVQRDHfyQH9WJEEwOiXjVePZicXOKHcD2Kcbm44skNEY16UEiIZxUxCK4nNepncAVRUOMGLpBEcEGMlNSD8OiaeTPdPW8C84eCMEn+VV3dXV1V3VChQoUKFQpBJ9ALbAdOAueBSyry8wlgm/6N/O20RwuwFhgEngGTGUX+Z0AdIlzTBu3AUWA0x6AteQscVu7SYg5wGvgecOD1MgGcAtooGTYDnyIOvF4+ApsoyaxfzWj8D+AxcBe4rnJXv/3MyDXczNWwDHjVgJG/gGvAVmBJSkCT3y3V0+C6/m8a/0ugi4LRDXxNMewdsBuY66FnHrAHeJ+i64vaVAh6UgLdGLALmBFQp3Dt1SBo6RWbVlDAsv+aYMQdYEFE/QuBkZSV0BUz4L0yFP8FjhSUsLQCx1JiwuwYiq8aCv8AWygeW1W3y6YrMc75SWPmmzH4qU6wVsKGkEv/k6FEln2zcSwhWQqSI5xJCHhlKFIkJtw3bOz3JW83jryxyNE+KxYZR+SE5hK5cdTwrJzzPtitaexUkW8+2G/YeigvYYuWofWEowGSnGEHr3zzwUwjY3yTd6uujTT7sRyAZosum1fnIRt0EP3y3VORHSAx67eD+1wesucOIqnqKLEDBLcc3E+yknQaS0kSj7I7YIeRsM3PQtJrOEDq+bI7YFmIOLDD6ORI0lF2B7SqrfX8fVlI+h0EjwiHmA5A93w9v9xFNIwhB8G9aeSABw5+OdUaxkUHgfToposDbjj4LxTpgOXANyMY5ZGxjD0/bwcMBdgCoZyQdfBBtkB/oCDYowPwGbxwhAiCcvnaMLYHPAbzroQ8M4/a+NM3ies1jJJLCwpYCXlnPlgi1Knpo1cykdMJPoMX7HRwylg6shI98zwJ8jjBd/CC2w5euXfMjAGjHG6P5IQQg+8wyuGzech6jVmSuzoCOyHE4AX7DJtXhmyJfdT2ky9qp0PeaN9oS+y1T/f6iOFRaT2FQE+gmRccCN0URdtfrnbzuF5UlgWLjfb9uOf1/H+cMjw7ErA/4AOx4aFhY6bsz0Kb7nuXArmWajZOGLZ9CHlLvDHh7A7VJ8yDvgS71oVWNmwo+tMkJ/QlXI9fjqGwTR8fTCZshyJiQmvCshd5EeuBBPr85EuC8vt6URkz2lsBT+RzwM61ie6UR1ITelEZIlmqYZae82l6oz+SqmFFykqoReG9nrVDh6a31ik0deYLG/zU7ZAUE2oixclNvWvoSokTrVrP79SqzlXYuPZ89GVvYbY+SJrMINKteaqJ1A2VEf3WyMvQ+mgfLeBlzRPSlmlIkaJnPSVDmzZTk15z+sq4HoGlmPWkAuqQvswINXApaQ+GKGyKRAuwSh8nuNrUSfJX21hntZlRhtdo3pAjbY2msMf18uWiypB+69PubeYGZoUKFSpUIDv+AUsrytQsHiz+AAAAAElFTkSuQmCC"
}
```

### Use Case 3. Transparent Material UI icon

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4z M12,16l-4-4h3l0-4h2l0,4h3L12,16z\" opacity=\".3\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELUlEQVR4nO1b3UpUURT+8AGcKMtHCHsB7aofvTyDXSRlpd5Emr1D5oiho10YKXadEYlX3mjdZFpPkClEQn+WoAZqkIY4sWENyGGvfc7+OzMHzgcLZJhZe621115/ewtkyJAhQ4ZEUA+gGUAvgGEATwE8JxJ/DwG4S98R3009agC0AJgAsAKgpEniN+NkEMErNagDUADw3UBpjr4BeEC8qxYnAIwC+ONQ8TDtARgBkEOVoQPAhkfFw/QLwC1Uya7PaAr/F8BHAAsA5ogW6LN9TV7TlfSGcwDWYgh5QEoWyFOCCOoEMEC/OYjB/zOAhqSVbwKwHSHYOqW7qzGU5kj8tgjgZ8RaWyRTIjgfEeh2KKe3WigeplYyxJ5iXSFTYxJuv60QQpzlaw4VD1M7gMUIT2jwGfDWmIWPADzxqPhxylNxpYoJtT4MMMMseAigPyHlj1OB1pbJ9NK18h2Kna+E8seNwHnCDZeuv8EskpTbq2hCUSw5qREeMQu8qQLlyzFhiZFRZA4r1DEpb8dztNel60yKFJ+dsjFAgbHskKXAokCaDdGwJc9RRtY+U+VrqA0NM/zhoMiZlfCdteR5hakYv5rOE1o87b4vAwR05mUyXzIxwISE0YFlbe/bAG0A/kl4PzYxwKqE0ZwDIX0aQNBrCe9lXeXrGVcqpMAAg0zBdkbHAM2MATpSYIAuF3HgHjPJyafAAHmSNcy/R8cAReYcBSkwQMCM4UWdERuTEgZvU2SAdxL+IqvFxpTHDJCEAeYl/J8laYDbAH4zwciERO9xJ0kDTDo4Aq6MoKu8kyNQdBQEu0kBG+W7HQVBUcLHRq/DNGjqCSY7H5CMsgsWYUjrQqjTMCjpeoLpzjsrhOqpfAwzGTAUKqBCZMez8qpS+DQ0sWKZCUw8wVZ5rhn6AAOMM+1wm6WAnCe4UJ5rh8dMDNDM7FLRUkiZJ7hQPqC3AzKZL7gciW3Q+MlW2HJ2MI32cUdiX2ye2PR79IKyJ7jY+UAxvjceioJGyrJx8y5dVAZVQu3M+F7IeRKWGGEsu+hwPmBDQob3jIxa1R+HHF0zlZj6utIGkPUtJYoHzm6JbypydyUvRwcUconbIqeYZhY6dDgs1VWeux5/AQ/I0eODkuI4JBET8gq3F/TJ1wMJ0POTLcXiS+R6PqM9F/AEbQI4C89oingktUcXlS6KpTK1Up6PWtf7I6kyGiM8oUSZo2jZO7RRGo56hbqZpPLHj4MqJpRJNCevqE3tiogTefrOIHV1ssZGdua9uz2HWnqQVNKgfbp3XKTh5Tz9vRrzZWg42nsLeLp1Alcs+aB1CohVhVyM15y2tEvlbVXsuqqB6qOXGa4UFy3tfReNTZKoAXCRHicsayp8RGOsMRpmpOpfZjiIoeRlGok9pGpuimiSPuuh6a32ADNDhgwZMkAf/wEgejYxrLkGogAAAABJRU5ErkJggg=="
}
```

### Use Case 4. Additional attributes

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\r\n    <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#00ff00\" opacity=\"0.8\"/>\r\n    <rect x=\"10\" y=\"10\" width=\"30\" height=\"30\" fill=\"#0000ff\" opacity=\"0.6\"/>\r\n    <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#ff00ff\" stroke-width=\"2\"/>\r\n    <polygon points=\"50,10 90,90 10,90\" fill=\"#ffff00\"/>\r\n    <ellipse transform=\"scale(.24)\" cx=\"50\" cy=\"50\" rx=\"30\" ry=\"20\" fill=\"#ff9900\"/>\r\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAET0lEQVR4nO2aXWgUVxzFz+qaF5FWqTRNV4pYm4JYEC2C+KCxMeqLviiRBqtvRqpoQR9UFJW+SamYTZ21UPwKflFLNVgfElpNjBhj/UCjFJVW/Dbqi18J21PuZEfW7exm5t47szc6fziwbBYy55zf3Jm9s0A00UQTTc5wJwbTwmSm8CW3YQaTGIG3YUjEaGENLTyiBWYpTQu/sA6leJOHFjblGH9Nj75799bwIfcWAazxqYkgSkB8AqISxAIQS8cSG4XE68x7lZnPlBQngG24WSgAoerPG361o/KioV27Mb79d2xc2wTiJIgz2bKIu0K574NoBfEDiEUgPgwvAAvHCpnvro+nP/3g8q6CpmPpFMo7GzGzsRPVDfdR3fAAydrruSYTxPlnRPoFkf6IOO8SgqN2ED+C+ALEgGADqEMpLVxwM/+yflDPsorvjxU0L4zP+fmGbTpbLgGI5klQKA8FbjpoBxFoCPsxkBbmtq8e39Sxetw/zd9M+Ss5v/bUyPeu7chrfNjDPag6eul/xvME4LTvBOCBglxtBZEINAj0Ll59n+ejrx7G3H2385p3CSC7fQkKHB0HUVW8AGLpFCa1tBU07hJAbvsKFDhaDiIWbgADe7ZjatNZT+ZzAnBrX4ECR5tAxMMLYEpzh2fzWQHka18DBULfar5K0D0Ar9i7BFCofQ0U9J4OgQZQ3tno23wmgL7a10SB0MxgAhj2cA/m7b0jG4CX9jVR8IemSyRfD2D6bxelzFc3PCj76au/vbSvkYI6vQGUS6KfUd3FMU+8mtdEgVCFngBi6RRmH7oua760Ntn1tDv+r98ANFBwUPGqwBod7W85WvXMr3mNFExTD2DWkStK7b8o8d2+RgpSagG883jXq6+0IbeviYJ2hf0E1tibGUVqXyMFC2UDmGjv5Ii7OAnJrPwBUZCU9I8St20sL/J61xcSBa1ye4y0NyelUvdz1xcSBR/LBDDdhPY1USBxOSQWmtK+BgoWyATwtSnta6BgiUwAq0xqX5GClYEHkAi4fUUKVgZ+ClghtK9AwZJAF8FESO0rUCC1CFaa2L4kBRWB3QglQm5fkoJRsrfCrSa275OCFvnH7bQfURvXvk8KJL8Miel9Pm9k+z4okFgAnSHKMpsKxrXvkQJx7GVQGto/TjCyfQ8UqGyJ5b8cmtK+BwoqdAQwAMR+U9svQMEBfQ9Laf8+x8j2C1AwVY95Z4gtprbvQsFWaB8iMYJoM7H9bApG9u5jKq78eeYccaDYJvvSn+KRWBBD4n0ST4tt0IOeMwgCSGw2wJxXbVY3DE4juMLWZ+fWsTv+0gBj3tQd7+GE0+tfHT/of1eY4AaCnbbqF3cV3ZRfiWN2jh/c8Dac+wxkLWD/Ovf1rgXsv+3roYD9u301Ctj/21ejgEQlCUuXeojtd4m9V4gjHURzG9FygjglJF6L98TfxGfEZ3X+b+FFioJoookmmmjwZs9/dbjGv+sJMQoAAAAASUVORK5CYII="
}
```

### Use Case 5. Empty svg

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": ""
}
```

### Use Case 6. Throw on invalid SVG for PNG conversion

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "invalid_svg";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
`Throw Error`
---

## Generate Constant Name

### Use Case 1. Default file name for home icon

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "iconsGroup1Subgroup1Size24Home"
}
```

### Use Case 2. Format PascalCase

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "PascalCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "IconsGroup1Subgroup1Size24Home"
}
```

### Use Case 3. Format Snake_case

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "snake_case";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "icons_group1_subgroup1_size24_home"
}
```

### Use Case 4. Format SCREAMING_SNAKE_CASE

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "SCREAMING_SNAKE_CASE";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "ICONS_GROUP1_SUBGROUP1_SIZE24_HOME"
}
```

### Use Case 5. Template {-2}{1,-3}{-1}

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-2}{1,-3}{-1}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "size24Group1Subgroup1Home"
}
```

### Use Case 6. Template {1,2}

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{1,2}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "group1Subgroup1"
}
```

### Use Case 7. Template {0,0}

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{0,0}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "icons"
}
```

### Use Case 8. Template {-1} (Negative index)

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-1}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "home"
}
```


---

## Generate File Name

### Use Case 1. Default file name for home icon

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "icons/group1/subgroup1/size24/home"
}
```

### Use Case 2. Template {-2}{1,-3}{-1}

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-2}{1,-3}{-1}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "size24/group1/subgroup1/home"
}
```

### Use Case 3. Template {1,2}

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{1,2}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "group1/subgroup1"
}
```

### Use Case 4. Template {0,0} (picking first segment)

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{0,0}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "icons"
}
```

### Use Case 5. Template {-1} (Negative index)

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-1}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "home"
}
```


---

## Find svg files in a directory

### Use Case 1. Many levels svg folder

#### Code:
```ts
import { getSvgFileNames } from "@svgd/utils";
const filePath = "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons";
export const svgFileNames = getSvgFileNames(filePath);

```

#### Result:
```json
{
  "svgFileNames": [
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\test_icon.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\subdir1\\icon1_20px.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\subdir1\\icon1_24px.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\subdir1\\subdir2\\icon5_24px.svg"
  ]
}
```

