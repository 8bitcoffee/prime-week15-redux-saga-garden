import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({
        id: 4,
        name: '',
        kingdom: "",
        clade: "",
        order: "",
        family: "",
        subfamily: "",
        genus: ""
    });

    const handleNameChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, name: event.target.value})
    }
    const handleKingdomChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, kingdom: event.target.value})
    }
    const handleCladeChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, clade: event.target.value})
    }
    const handleOrderChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, order: event.target.value})
    }
    const handleFamilyChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, family: event.target.value})
    }
    const handleSubfamilyChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, subfamily: event.target.value})
    }
    const handleGenusChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, genus: event.target.value})
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({
            id:newPlant.id + 1,
            name: '',
            kingdom: "",
            clade: "",
            order: "",
            family: "",
            subfamily: "",
            genus: ""
        });
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input type='text' value={newPlant.name} onChange={handleNameChange} placeholder='Name'/><br></br>
                <input type='text' value={newPlant.kingdom} onChange={handleKingdomChange} placeholder='Kingdom'/><br></br>
                <input type='text' value={newPlant.clade} onChange={handleCladeChange} placeholder='Clade'/><br></br>
                <input type='text' value={newPlant.order} onChange={handleOrderChange} placeholder='Order'/><br></br>
                <input type='text' value={newPlant.family} onChange={handleFamilyChange} placeholder='Family'/><br></br>
                <input type='text' value={newPlant.subfamily} onChange={handleSubfamilyChange} placeholder='Subfamily'/><br></br>
                <input type='text' value={newPlant.genus} onChange={handleGenusChange} placeholder='Genus'/><br></br>
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;
