import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './PlantList.css';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store);
    const plantList = useSelector(store => store.plantList)

    const getPlants = () => {
        dispatch({type: "FETCH_PLANTS"})
    };

    const deletePlant = (id) => {
        dispatch({type: "DELETE_PLANT", payload: id})
    };

    useEffect(() => {
        console.log('component did mount');
        getPlants();
        // dispatch an action to request the plantList from the API
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(reduxState)}</pre>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {plantList.map((plant, index) => (
                        <tr key={index}>
                            <td>{plant.id}</td>
                            <td>{plant.name}</td>
                            <td><button onClick={()=>deletePlant(plant.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlantList;
