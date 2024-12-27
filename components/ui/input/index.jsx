import { View, TextField } from 'react-native-ui-lib';


export const Input = (props) => (
    <View {...props}>
        { props.children }
    </View>
)

export const InputField = (props) => (
    <TextField {...props}>
        { props.children }
    </TextField>
)