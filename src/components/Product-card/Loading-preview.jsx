import React from "react"
import ContentLoader from "react-content-loader"

function LoadingPreview() {
  return (
    <ContentLoader
      className="product-preview"
      speed={2}
      width={300}
      height={495}
      viewBox="0 0 300 495"
      backgroundColor="#d6d6d6"
      foregroundColor="#c0bfbf"
    >
      <rect x="0" y="0" rx="10" ry="10" width="300" height="320" />
      <rect x="10" y="341" rx="8" ry="8" width="280" height="50" />
      <rect x="111" y="480" rx="0" ry="0" width="1" height="1" />
      <rect x="50" y="412" rx="7" ry="7" width="200" height="14" />
      <rect x="75" y="448" rx="5" ry="5" width="150" height="6" />
    </ContentLoader>
  )
}

export default LoadingPreview
