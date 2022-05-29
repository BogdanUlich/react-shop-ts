import React from "react"
import ContentLoader from "react-content-loader"

function LoadingPreview() {
  return (
    <ContentLoader
      className="category-preview"
      speed={2}
      width={300}
      height={495}
      viewBox="0 0 300 495"
      backgroundColor="#d6d6d6"
      foregroundColor="#c0bfbf"
    >
      <rect x="0" y="0" rx="10" ry="10" width="300" height="405" />
      <rect x="111" y="480" rx="0" ry="0" width="1" height="1" />
    </ContentLoader>
  )
}

export default LoadingPreview
