import { useState, useCallback } from 'react'

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>
}

function upsert(array, element) { // (1)
  const i = array.findIndex(_element => _element.id === element.id);
  if (i > -1) {
    array[i] = element; // (2)
  }
  else { array.push(element);
  }

  return array;
}

export default function HomePage() {
  const [mediaItems, setMediaItems] = useState([]);

  function handleClick(e) {
    e.preventDefault();

    const toUpsert = {
      id: document.querySelector('#id').value || Date.now(),
      format: document.querySelector('#format').value,
      title: document.querySelector('#title').value,
      location: document.querySelector('#location').value,
    };
    toUpsert.id = isNaN(toUpsert.id) ? undefined : Number(toUpsert.id);

    const updatedMediaItems = upsert(mediaItems, toUpsert);

    setMediaItems([...updatedMediaItems]);
  }

  const editMediaItem = useCallback(
    (mediaItem) => () => {
      document.querySelector('#id').value = mediaItem.id;
      document.querySelector('#format').value = mediaItem.format;
      document.querySelector('#title').value = mediaItem.title;
      document.querySelector('#location').value = mediaItem.location;
    },
    [],
  );
  
  return (
    <div>
      <Header title="📚 Book 💿 CD 📀 DVD 🎧 Audio 🎬 Video" />
      <ul>
        {mediaItems.map(item => (
          <li key={item.id}>
            {item.format === 'book' ? '📚' : ''}
            {item.format === 'cd' ? '💿' : ''}
            {item.format === 'dvd' ? '📀' : ''}
            {item.format === 'audio' ? '🎧' : ''}
            {item.format === 'video' ? '🎬' : ''}
            {item.title}<br />
            {item.location}
            <button onClick={editMediaItem(item)} >Edit</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleClick} action="/aws-endpoint" method="POST">
        <fieldset>
          <legend>New Media Item</legend>
          <input type="hidden" id="id" />
          <label>
            Format
            <select id="format">
              <option>book</option>
              <option>cd</option>
              <option>dvd</option>
              <option>audio</option>
              <option>video</option>
            </select>
          </label>
          <label>
            Main title
            <input type="text" id="title" />
          </label>
          <label>
            Location
            <textarea id="location"></textarea>
          </label>
        </fieldset>
        <button onClick={handleClick}>💾 Save</button>
      </form>
    </div>
  )
}
