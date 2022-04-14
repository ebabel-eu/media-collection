import { useState } from 'react'
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>
}

export default function HomePage() {
  const mediaItems = [
    {
      format: 'book',
      mainTitle: 'La balle du néant',
      subTitle: 'Les futurs mystères de Paris',
      standardGeneralLocation: 'Thomas bedroom',
      standardDetailedLocation: 'Sci-fi shelf next to bed',
      currentLocation: 'On the table in the living room',
    }
  ]

  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <div>
      <Header title="📚 Books 💿 CDs 📀 DVDs 🎧 Audio 🎬 Video" />
      <ul>
        {mediaItems.map(item => (
          <li key={item}>
            {item.format === 'book' ? '📚' : ''}
            {item.format === 'cd' ? '💿' : ''}
            {item.format === 'dvd' ? '📀' : ''}
            {item.format === 'audio' ? '🎧' : ''}
            {item.format === 'video' ? '🎬' : ''}
            {item.mainTitle}
            {item.subTitle ? ` (${item.subTitle})` : '' }<br />
            {item.currentLocation}
          </li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  )
}
