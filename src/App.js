import "./styles.css";

// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
//import Navbar from "./Navbar";

const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "BINI",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Alam mo ba girl?",
    artist: "Hev Abi",
    genre: "Hip Hop",
  },
  {
    id: 3,
    title: "Silos",
    artist: "Shaira",
    genre: "Ballad",
  },
  {
    id: 4,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "Rock",
  },
  {
    id: 5,
    title: "Billie Jean",
    artist: "Michael Jackson",
    genre: "Pop",
  },
  {
    id: 6,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    genre: "Grunge/Rock",
  },
  {
    id: 7,
    title: "Like a Prayer",
    artist: "Madonna",
    genre: "Pop",
  },
  {
    id: 8,
    title: "I Will Always Love You",
    artist: "Whitney Houston",
    genre: "R&B/Soul",
  },
  {
    id: 9,
    title: "Hey Jude",
    artist: "The Beatles",
    genre: "Rock",
  },
  {
    id: 10,
    title: "Rolling in the Deep",
    artist: "Adele",
    genre: "Pop/Soul",
  },
  {
    id: 11,
    title: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    genre: "Rock",
  },
  {
    id: 12,
    title: "I Want to Hold Your Hand",
    artist: "The Beatles",
    genre: "Rock",
  },
  {
    id: 13,
    title: "Thriller",
    artist: "Michael Jackson",
    genre: "Pop/R&B",
  },
  {
    id: 14,
    title: "Hotline Bling",
    artist: "Drake",
    genre: "Hip-hop/R&B",
  },
  {
    id: 15,
    title: "Boogie Wonderland",
    artist: "Earth, Wind & Fire",
    genre: "Disco/Funk",
  },
  {
    id: 16,
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "Pop",
  },
  {
    id: 17,
    title: "Another One Bites the Dust",
    artist: "Queen",
    genre: "Rock/Funk",
  },
  {
    id: 18,
    title: "Girls Just Want to Have Fun",
    artist: "Cyndi Lauper",
    genre: "Pop",
  },
  {
    id: 19,
    title: "Crazy in Love",
    artist: "Beyoncé feat. Jay-Z",
    genre: "R&B/Pop",
  },
  {
    id: 20,
    title: "Uptown Funk",
    artist: "Mark Ronson feat. Bruno Mars",
    genre: "Funk/Pop",
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Neneng B",
    artist: "Nik Makino",
    genre: "Rap",
    userRating: 5,
  },
  {
    id: 2,
    title: "Babaero",
    artist: "Hev Abi",
    genre: "Hip Hop",
    userRating: 4,
  },
];

function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText.length !== 0) {
      const musicResults = tempMusicData.filter(
        (item) =>
          item.title.toLowerCase().startsWith(searchText) ||
          item.artist.toLowerCase().startsWith(searchText)
      );
      const playlistResults = tempPlaylist.filter(
        (item) =>
          item.title.toLowerCase().startsWith(searchText) ||
          item.artist.toLowerCase().startsWith(searchText)
      );
      setSearchResults([...musicResults, ...playlistResults]);
    } else {
      setSearchResults([]);
    }
    setQuery(searchText);
  };
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search for music..."
        value={query}
        onChange={handleSearch}
        //onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {searchResults.map((item) => (
          <li key={item.id}>
            {item.title} - {item.artist} ({item.genre})
          </li>
        ))}
      </ul>
    </div>
  );
}

function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}

function NumResult({ music, playlist }) {
  return (
    <div>
      <p>
        <strong>Total Songs:</strong> Found <strong>{music.length}</strong>{" "}
        results
      </p>
      <p>
        <strong>Songs in Playlist:</strong> Found{" "}
        <strong>{playlist.length}</strong> results
      </p>
    </div>
  );
}

function Navbar({ children, sortBy, onSort }) {
  return (
    <nav className="container" id="nav">
      <Logo />
      <Search />
      <div>
        <select
          value={sortBy}
          onChange={(e) => onSort(e.target.value)}
          className="selecto"
        >
          <option value="input">Sort by input</option>
          <option value="title">Sort by title</option>
          <option value="artist">Sort by artist</option>
        </select>
      </div>
      {children}
    </nav>
  );
}

function Music({ music, playlistAdd, playlist }) {
  return (
    <ul>
      {music.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist} ({music.genre}){"  "}
          <button onClick={() => playlistAdd(music, playlist)}>♥️</button>
        </li>
      ))}
    </ul>
  );
}

function Playlists({ playlist }) {
  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <span>⭐</span>
        </li>
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

function Box({ children, title }) {
  return (
    <div className="container" id="box">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = music;
  if (sortBy === "title")
    sortedItems = music.slice().sort((a, b) => a.title.localeCompare(b.title));
  if (sortBy === "artist")
    sortedItems = music
      .slice()
      .sort((a, b) => a.artist.localeCompare(b.artist));

  function addToPlaylist(music, playlist) {
    const isInPlaylist = playlist.some((item) => item.title === music.title);

    if (isInPlaylist) {
      alert(
        "The track is already in the playlist. Please choose a different song."
      );
    } else {
      const playId = playlist.length + 1;
      setPlaylist([
        ...playlist,
        {
          id: playId,
          title: music.title,
          artist: music.artist,
          genre: music.genre,
        },
      ]);
    }
  }

  // const addToPlaylist = (music) => {
  //   setPlaylist([...playlist, music]);
  // };

  return (
    <div>
      {/* props draining solution example
       <Modal>
        <Success />
      </Modal>
      <Modal>
        <Error />
      </Modal> */}
      <Navbar sortBy={sortBy} onSort={setSortBy} sortedItems={sortedItems}>
        <NumResult music={music} playlist={playlist} />
      </Navbar>
      <Main>
        <Box title="Music List">
          <Music
            music={sortedItems}
            playlistAdd={addToPlaylist}
            playlist={playlist}
          />
        </Box>
        <Box title="Playlist">
          <Playlists playlist={playlist} />
        </Box>
      </Main>
    </div>
  );
}

export default App;

//stateless/presentational component
//stateful component
//structural component - purely meant to store components

// props draining solution example:
// function Modal({ children }) {
//   return <div>{children}</div>;
// }
// function Success() {
//   return <p>Congrats!</p>;
// }
// function Error() {
//   return <p>Sorry!</p>;
// }
