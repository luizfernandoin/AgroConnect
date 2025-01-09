import { TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const NavigationButton = ({iconName, ...rest}) => {
    return(
        <TouchableOpacity>
            <AntDesign name={iconName} size={24} color="black" {...rest}/>
        </TouchableOpacity>
    );
};

export default NavigationButton;
