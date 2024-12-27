import { Button as ReactUIButton, TextField } from 'react-native-ui-lib';

export const Button = (props) => (
    <ReactUIButton {...props}>
        {props.children}
    </ReactUIButton>
)


export const ButtonText = (props) => (
    <TextField {...props}>
        {props.children}
    </TextField>
)