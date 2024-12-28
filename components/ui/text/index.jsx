import {Text as TextUILib } from 'react-native-ui-lib'

export  const Text = (props) => (
    <TextUILib {...props}>
        { props.children }
    </TextUILib>
)