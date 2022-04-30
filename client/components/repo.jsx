import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'

import Head from './head'
import Headers from './headers'

const Repo = () => {
  const { userName, repositoryName } = useParams()
  const [text, setText] = useState('')

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/${userName}/${repositoryName}/master/README.md`)
      .then((result) => result.text())
      .then((md) => {
        setText(md)
      })
    return () => {}
  }, [userName, repositoryName])

  return (
    <div>
      <Head title="Readme" />
      <Headers user={userName} />
      <div className="flex items-center justify-center h-full">
        <div id="description" className="bg-indigo-800 text-white rounded-lg border shadow-lg p-10">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}

Repo.propTypes = {}

export default React.memo(Repo)