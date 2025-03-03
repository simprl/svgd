import { getPaths } from "@svgd/core"
import * as icons from "./icons/icons"

function App() {

  return (
    <>
      <Svg pathd={icons.ARROW_CIRCLE_DOWN_MATERIALICONSOUTLINED_20PX} />
      <Svg pathd={icons.ARROW_CIRCLE_DOWN_MATERIALICONSTWOTONE_20PX} />
    </>
  )
}

const Svg = ({ pathd }: { pathd: string }) => <svg width={24} height={24}>
    {getPaths(pathd).map((attributes, i) => <path key={i} {...attributes} />)}
</svg>;

export default App
