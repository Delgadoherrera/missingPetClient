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


export default function LabelBottomNavigation({ status, datos }) {
  const [value, setValue] = React.useState('mascotasPerdidas');



  const handleChange = (event, newValue) => {
    setValue(newValue);
    /*  console.log('evento de entrada:', event) */

  };



  return (

    <div className='fatherDivPetRegister'>
      {value === 'misMascotas' ? <p className='tituloMisMascotas'> Mis mascotas</p> : <p></p>}
      {value === 'mascotasPerdidas' ? <p className='tituloMisMascotas'> Mascotas perdidas en tu zona</p> : <p></p>}
      {value === 'mascotaEncontrada' ? <p className='tituloMisMascotas'>  Mascota encontrada</p> : <p></p>}
      {value === 'addNewPet' ? <p className='tituloMisMascotas'> Agregar a mi mascota</p> : <p></p>}
      {value === 'addNewPet' ? <PetRegister /> : <p></p>}
      {value === 'mascotaEncontrada' ? <PetFound /> : <p></p>}
      {value === 'misMascotas' ? <Mascotas /> : <p></p>}
      {value === 'mascotasPerdidas' ? <MascotasPerdidas setChat={handleChange} /> : <p></p>}
      {value === null ? <MascotasPerdidas setChat={handleChange} /> : <p></p>}




      <BottomNavigation className='bottomNavigation' sx={{ width: '100vw' }} value={value} onChange={handleChange}>

        <BottomNavigationAction
          label="Mis mascotas"
          value="misMascotas"
          icon={<PetsIcon />}
        />
        <BottomNavigationAction
          label="Mascotas perdidas"
          value="mascotasPerdidas"
          className='missPets'
          icon={<CatchingPokemonIcon />} />
        <BottomNavigationAction
          label="Mascota encontrada"
          value="mascotaEncontrada"
          icon={<CrisisAlertIcon />}
          className='petFounded'
        />
        <BottomNavigationAction
          label="Nueva mascota"
          value="addNewPet"
          icon={<AddCircleIcon />}
        />
      </BottomNavigation>
    </div>



  );

}
