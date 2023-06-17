import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart() // state ki values
    const priceRef = useRef();
    let options = props.options;
    let PriceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(""); 

    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
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
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>AddToCart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
