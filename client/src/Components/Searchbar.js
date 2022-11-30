import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../Context";

const Searchbar = () => {

    const { setSubmitted, setDiscogsSearchResults, formData, setFormData, artistSearchResults } = useContext(Context);
    
    const handleChange = (value) => {
        setFormData(value);
      };
      
      const handleSubmit = (e, formData) => {
        e.preventDefault();
        
        fetch(`/searchDiscogs/`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({formData}),
          }) 
            .then((res) => res.json())
            .then((data) => {
              
              setSubmitted(formData)
              setDiscogsSearchResults(data.data.results)
              
             })
             .catch((err) => console.log(err));
        
        
        // fetch(`/searchArtist/${formData}`) 
        // .then((res) => res.json())
        // .then((data) => {
        //     setSubmitted(true)
        //     setSearchResults(data.data.body.artists.items)
        //  })
        //  .catch((err) => console.log(err));
      }

    return (<>
        <form onSubmit={(e) => handleSubmit(e, formData)}>
        <SearchBar 
          type="search" 
          placeholder={"Search For A Musician"}
          onChange={(e) => handleChange(e.target.value)}/>
        </form>
      </>
    )
}

export default Searchbar;

const SearchBar = styled.input`
border: 1px solid black;
border-radius: 15px;
width: 500px;
height: 75px;
font-size: 30px;
margin: 100px 100px 100px 300px;
`