import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PetRegister from '../components/PetRegister';
import PetFound from '../components/PetFound';
import Mascotas from '../components/Mascotas';
import MascotasPerdidas from './MascotasPerdidas';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PetsIcon from '@mui/icons-material/Pets';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import '../assets/BottomNavigation.css'

export default function LabelBottomNavigation({status}) {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };
 
 React.useEffect(()=>{
  
 })

  return (

    <div className='fatherDivPetRegister'>
      {value === 'addNewPet' ? <PetRegister /> : <p></p>}
      {value === 'mascotaEncontrada' ? <PetFound /> : <p></p>}
      {value === 'misMascotas' ? <Mascotas /> : <p></p>}
      {value === 'mascotasPerdidas' ? <MascotasPerdidas /> : <p></p>}

      <BottomNavigation className='bottomNavigation' sx={{ width: 350 }} value={value} onChange={handleChange}>

        <BottomNavigationAction
          label="Mis mascotas"
          value="misMascotas"
          icon={<PetsIcon />}
        />
        <BottomNavigationAction
          label="Mascota encontrada"
          value="mascotaEncontrada"
          icon={<CrisisAlertIcon />}
          className='petFounded'
        />
        <BottomNavigationAction
          label="Mascotas perdidas"
          value="mascotasPerdidas"
          className='missPets'
          icon={<CatchingPokemonIcon />} />
        <BottomNavigationAction
          label="Nueva mascota"
          value="addNewPet"
          icon={<AddCircleIcon />}
        />
      </BottomNavigation>
    </div>



  );

}
