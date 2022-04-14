import { useState, useCallback } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>
}

function upsert(array, element) {
  const i = array.findIndex(_element => _element.id === element.id);
  if (i > -1) {
    array[i] = element;
  } else {
    array.push(element);
  }

  return array;
}

export default function HomePage() {
  const [mediaItems, setMediaItems] = useState([]);

  function save(e) {
    e.preventDefault();

    const toUpdate = {
      id: document.querySelector('#id').value,
      format: document.querySelector('#format').value,
      title: document.querySelector('#title').value,
      location: document.querySelector('#location').value,
    };
    toUpdate.id = isNaN(toUpdate.id) ? undefined : Number(toUpdate.id);

    const updatedMediaItems = upsert(mediaItems, toUpdate);

    setMediaItems([...updatedMediaItems]);
  }

  function create(e) {
    e.preventDefault();

    const toCreate = {
      id: Date.now(),
      format: document.querySelector('#format').value,
      title: document.querySelector('#title').value,
      location: document.querySelector('#location').value,
    };

    const updatedMediaItems = upsert(mediaItems, toCreate);

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

  const deleteMediaItem = useCallback(
    (mediaItem) => () => {
      const updatedMediaItems = mediaItems.filter(item => item.id !== mediaItem.id);
      setMediaItems([...updatedMediaItems]);
    },
    [],
  );
  
  return (
    <div>
      <Header title="📚 Book 💿 CD 📀 DVD 🎧 Audio 🎬 Video" />
      <form onSubmit={save} action="/aws-endpoint" method="POST">
        <input type="hidden" id="id" />
        <select id="format">
          <option>book</option>
          <option>cd</option>
          <option>dvd</option>
          <option>audio</option>
          <option>video</option>
        </select><br /><br />
        <input type="text" id="title" /><br /><br />
        <textarea id="location"></textarea><br /><br />
        <button type="submit" onClick={save}>Save</button><br />
        <button type="button" onClick={create}>New</button>
      </form><br /><br />

      {mediaItems.map(item => (
        <section key={item.id} css={{ mw: "400px", marginBottom: "20px" }}>
          <h2>
            {item.format === 'book' ? '📚' : ''}
            {item.format === 'cd' ? '💿' : ''}
            {item.format === 'dvd' ? '📀' : ''}
            {item.format === 'audio' ? '🎧' : ''}
            {item.format === 'video' ? '🎬' : ''}
            {item.title}
          </h2>
          <p>
            {item.location}
          </p>
          <p>
            <button onClick={editMediaItem(item)}>Edit</button>
            <button onClick={deleteMediaItem(item)}>Delete</button>
          </p>
        </section>
      ))}
    </div>
  )
}
