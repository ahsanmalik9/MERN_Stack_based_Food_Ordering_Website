import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
export default function Card(props) {
    //Note React me default value ko pehly define krna prta hai
    let dispatch = useDispatchCart();
    let data = useCart() // state ki values
    const priceRef = useRef();
    let options = props.options;
    let PriceOptions = Object.keys(options);//Object.keys is builtin function jis sy kisi b object ko bhej skty

    //Items ki defaultt value btani pry gi using use state or ye as a data pass ho ga db me for particular user
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(""); // ye dono onchange py call krwaye gy Array.from and  PriceOption sy uper 

    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }


        // for Update (Agr quantity change krty hain to update ho ga or agr size change kryn gy "half,full" to update ni ho ga simply Add to cart ho jaye ga)
        console.log(food)
        console.log(new Date())
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
       // await console.log(data)

    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    {/* images on the web page of food 
                    <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"120px", objectfit: "fill"}} /> */}
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectfit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title"> {props.foodItem.name} </h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {//in curly braces me jo likhty wo javascript consider hota hai|| this is card dropdown options
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}> {i + 1}</option>
                                        )
                                    })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {/* Yaha py option wala tab insert krwaya hai jis sy sb apny apny option display hon gy like half full, regular, medium etc */}
                                {PriceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}

                                {/* <option value="half"> Half</option>
                                <option value="full"> Full</option> */}
                            </select>

                            <div className='d-inline h-100 f2-5'>
                                Rs{finalPrice}/-
                            </div>

                        </div>
                        {/* Use Context helps to deal with props drilling problem mtlab add to cart home page py perform ho ga lekin us ka reflection
MY Cart me b dekhana hai example k agr multiple pages ho app k or kahin 4th page py My cart hai or us
me data Cart ka bhejna hai to parent to child send krna pry ga prop ko which is a wastage of time is 
liye conetext api use krty to hm puri applciation ko wrap kr dety hain context provider k sth or aik state
gloally define kr dein gy to is sy puri application me aik sth change a jaye ga*/}

                        {/* Use Reducer is liye use kryn gy qk ADD TO CART button boht sary hai is liye sb k liye alg alg functinality
k liye state bnany ki bajaye aik he global bnaye gy. Is liye state ko use krny ki bajye hook Use reducer
ko use kryn gy */}
                        {/* hr means horizontal line and MAKE ADD TO CART BUTTON*/}
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>AddToCart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
