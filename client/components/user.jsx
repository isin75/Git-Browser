import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Head from './head'
import Headers from './headers'


const User = () => {
    const { userName } = useParams()
    const [repos, setRepos] = useState([])

    useEffect(() => {
        fetch(`https://api.github.com/users/${userName}/repos`)
        .then((result) => result.json())
        .then((list) => {
            setRepos(list)
        })
        return () => {}
    }, [userName])
    

  return (
    <div>
      <Head title="Repos" />
      <Headers user={userName} />
      <div className="flex items-center justify-center h-full">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
            <ol className="list-decima list-inside">
                {repos.map((repo) => {
                return(
                <li key={repo.id}>
                    <Link to={`/${userName}/${repo.name}`}>{repo.name}</Link>
                </li>
                )
                })}
            </ol>
        </div>
      </div>
    </div>
  )
}

User.propTypes = {}

export default React.memo(User)