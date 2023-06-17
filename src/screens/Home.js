import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
//import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


// Note Search bar is in Carousel and carousel is the child of home page to home page sy carousel ko data
//ni bhej skty. Qk search bar me jo search kry gy wo whi result de ga or ye tb ho ga jb carousel ko 
//home page me direct code add kryn, sirf carousel ko home page py call krny sy ni ho ga

// .Map function k through Card ko 1 bar call krwaye gy but front end wo repeatedly call ho jaye ga lekin data sb ka different ho ga
// Map function javascript ka built in function hai
//Use Callback, Use Memo important hai read it once
//Map function curly braces me ni use ho skta hai or map function k liye Array hona chahiye
export default function Home() {

  const [search, setSearch] = useState(' '); // Making state for search operation  

  const [foodCat, setFoodCat] = useState([]);  // state bnaya hai jis k card ko sirf 1 bar call krwae gy
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => { // Fetch by default asynchronous hai to is async likhty hain sth
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);

    // console.log(response[0], response[1]); // link with display data ki array [0]food item and [1]food category

  }

  useEffect(() => {
    loadData()

  }, []) // here we add Dependency in square braket


  return (

    <div>
      <div><Navbar /></div>
      {/* calling carousel */}
      {/* <div><Carousel /></div>  */}

      <div>  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'> 
  <div className='carousel-caption' style={{zIndex:"10"}}> 
  <div className="d-flex">
      <input className="form-control me-2 text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
</div>

    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?barbeque"className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div>
  </div>
      <div className='container'>
        {
          // Ternary Operator
          foodCat !== [] // if this is true then question mark k bad wala part chaly ga
            ? foodCat.map((data) => {
              // Category Name inspect sy uthaya hai inspect kr k  
              // key = { } it is 
              // Setting grid row and coloumn on the web page (next line to md-6 tk)
              return ( <div className='row mb-3'> 
                <div key = {data._id} className = "fs-3 m-3">{data.CategoryName}</div>  
                <hr /> 
                {foodItem !== []
                ? 
                foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())) ) // Match and Search the name of food 
                .map(filterItems=> { // yaha data value ko compare kr rhy hain or filter ki help sy proper data sb me jaye ga like pizza me pizza ka biryani me biryani ka etc

                  return(
                    // card k andr "props" bnaye HAIN jis ki help sy sb categories ka data bhejy gy fornt end py
                    //filterItems.name,options,img Props hain or wo value hai jo db me save ki hai isi name sy hai
                    <div key={filterItems._id} className = "col-12 col-md-6 col-lg-4"> 
                    
                    {/* option k andr 0 diya hai ye db me hai jis sy sb k individual option show hon gy 
                    <Card foodName = {filterItems.name}
                    options = {filterItems.options[0]}
                    imgSrc = {filterItems.img}
                    
                    ></Card> */}

                    <Card Card foodItem= {filterItems} //yaha ab sary options ko aik he bar bhej rhy hai option tab k elawa
                    options = {filterItems.options[0]}                    
                    ></Card> 


                    </div>
                  )
                } 
               
                ) : <div>No such Data Found</div> }

                </div>
                
                )
            })
            : " "
        }
      </div>
      <div><Footer /></div>

    </div>
  )
}

