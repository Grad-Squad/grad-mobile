import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Lato_300Light, Lato_400Regular } from '@expo-google-fonts/lato';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { RobotoMono_300Light } from '@expo-google-fonts/roboto-mono';

const initFonts = () => {
  const [fontsLoaded, error] = useFonts({
    Poppins_700Bold,

    Lato_300Light,
    Lato_400Regular,

    Roboto_400Regular,

    RobotoMono_300Light,
  });

  return fontsLoaded;
};
export default initFonts;
