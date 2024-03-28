'use client';

import { useState, useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout' >
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
         />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [postToDisplay, setPostToDisplay] = useState([]);


  const handleTagClick = (tagName) => {
    filterSearch(tagName.toLowerCase());
    setSearchText(tagName);
  }

  const handleSearchChange = (e) => {
    const searchInput = e.target.value.toLowerCase();
    if(searchInput.length > 0){
      filterSearch(searchInput)
    } else {
      setPostToDisplay(posts);
    }
    setSearchText(e.target.value);
  }

  const filterSearch = (searchInput) => {
    const filtered = posts.filter((post) => {
        return post.creator.username.toLowerCase().includes(searchInput.toLowerCase()) || 
          post.tag.toLowerCase().includes(searchInput.toLowerCase()) ||
          post.prompt.toLowerCase().includes(searchInput.toLowerCase());
      });

    if(filtered.length >0 ){
      setPostToDisplay(filtered);
    } else{
      setPostToDisplay([]);
    }
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setPostToDisplay(data);
    }

    fetchPosts();
  }, []);

 return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='search for a username or tag'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={postToDisplay} handleTagClick={handleTagClick} />
    </section>
  );
}

export default Feed
